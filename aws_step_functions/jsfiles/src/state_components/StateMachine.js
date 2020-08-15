"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
var PassState_1 = require("./PassState");
var TaskState_1 = require("./TaskState");
var StateMachine = /** @class */ (function () {
    function StateMachine(states, startState, comment, version, timeoutSeconds) {
        if (version === void 0) { version = "1.0"; }
        this.states = [];
        if (states.length == 0)
            throw new Error("states must not be empty");
        this.states = states;
        this.startState = startState;
        this.setComment(comment);
        this.version = version;
        this.setTimeoutSeconds(timeoutSeconds);
    }
    StateMachine.prototype.getStates = function () {
        return this.states;
    };
    StateMachine.prototype.addState = function (state) {
        if (!this.stateNameIsUnique(state.getName())) {
            throw new Error("State names must be unique");
        }
        this.getStates().push(state);
        return this.validateNextStates();
    };
    StateMachine.prototype.isValid = function () {
        return this.validateNextStates() &&
            this.validateCatchNextStates() &&
            this.validateStartStateName() &&
            this.getStates().length > 0;
    };
    StateMachine.prototype.stateNameIsUnique = function (stateName) {
        if (this.getStates().some(function (element) {
            return element.getName() == stateName;
        })) {
            return false;
        }
        return true;
    };
    StateMachine.prototype.validateNextStates = function () {
        //check that each non-terminal state in the machine points to another state in the machine
        var states = this.getStates();
        var returnVal = true;
        var _loop_1 = function (idx) {
            if (
            //current state is not terminal
            !states[idx].isTerminal()
                &&
                    //the nextstate of the current state match a statename in the machine
                    !(this_1.getStates().some(function matchesNextState(element) {
                        if (states[idx] instanceof PassState_1.PassState)
                            return states[idx].getNextStateName() == element.getName();
                        if (states[idx] instanceof TaskState_1.TaskState)
                            return states[idx].getNextStateName() == element.getName();
                        return false;
                    }))) {
                returnVal = false;
            }
        };
        var this_1 = this;
        for (var idx in states) {
            _loop_1(idx);
        }
        return returnVal;
    };
    StateMachine.prototype.validateCatchNextStates = function () {
        //check that each task state w/ Catchers in the machine points to another state in the machine
        var states = this.getStates();
        var returnVal = true;
        var _loop_2 = function (idx) {
            if (states[idx] instanceof TaskState_1.TaskState) {
                var taskState_1 = states[idx];
                if (taskState_1.getCatchers().length > 0) {
                    if (!this_2.getStates().some(function matchesNextState(element) {
                        return taskState_1.getCatchers()[0].getNextStateName() == element.getName();
                    })) {
                        returnVal = false;
                    }
                }
            }
        };
        var this_2 = this;
        for (var idx in states) {
            _loop_2(idx);
        }
        return returnVal;
    };
    StateMachine.prototype.validateStartStateName = function () {
        var _this = this;
        return this.getStates().some(function (state) {
            return state.getName() == _this.getStartStateName();
        });
    };
    StateMachine.prototype.setStates = function (states) {
        var _this = this;
        if (states.length > 0) {
            this.states = [];
            states.forEach(function (s) { return _this.addState(s); });
            return this.validateNextStates();
        }
        else {
            throw new Error("can not set states to empty");
        }
    };
    StateMachine.prototype.getStartStateName = function () {
        return this.startState;
    };
    StateMachine.prototype.setStartStateName = function (startState) {
        this.startState = startState;
    };
    StateMachine.prototype.getComment = function () {
        return this.comment ? this.comment : "";
    };
    StateMachine.prototype.setComment = function (comment) {
        this.comment = comment;
    };
    StateMachine.prototype.getVersion = function () {
        return this.version;
    };
    StateMachine.prototype.setVersion = function (version) {
        this.version = version;
    };
    StateMachine.prototype.getTimeoutSeconds = function () {
        return this.timeoutSeconds;
    };
    StateMachine.prototype.setTimeoutSeconds = function (timeoutSeconds) {
        this.timeoutSeconds = timeoutSeconds;
    };
    StateMachine.prototype.execute = function (input) {
        var _this = this;
        if (typeof input === 'string')
            input = JSON.parse((input) ? input : "{}");
        if (typeof input === 'object')
            input = input;
        //only execute if stateMachine valid
        if (!this.isValid())
            throw Error("this stateMachine is invalid!");
        var currentState = this.getStates().find(function (element) {
            return element.getName() == _this.getStartStateName();
        });
        console.log("initial input: " + JSON.stringify(input));
        while (true) {
            try {
                if (currentState instanceof PassState_1.PassState || currentState instanceof TaskState_1.TaskState) {
                    console.log("running: " + currentState.getName());
                    console.log("input pre-state run: " + JSON.stringify(input));
                    input = currentState.execute(input);
                    console.log("input after-state run: " + JSON.stringify(input));
                }
            }
            catch (e) {
                console.log("exception thrown");
                if (currentState instanceof TaskState_1.TaskState && currentState.getCatchers().length > 0) {
                    console.log("in catcher handler");
                    //assume we only catch 1 error for now
                    currentState = this.getStates().find(function (element) {
                        return currentState.getCatchers()[0].getNextStateName() == element.getName();
                    });
                    continue;
                }
                else {
                    throw e;
                }
            }
            if (currentState == undefined || currentState.isTerminal())
                break;
            currentState = this.getStates().find(function (element) {
                //we should be checking for if state is implementing NextOrEnd but typescript makes that a pain
                if (currentState instanceof PassState_1.PassState)
                    return currentState.getNextStateName() == element.getName();
                if (currentState instanceof TaskState_1.TaskState)
                    return currentState.getNextStateName() == element.getName();
            });
        }
        return input;
    };
    StateMachine.prototype.toString = function () {
        var json = '{'
            + '"StartAt":"' + this.getStartStateName() + '"'
            + ', "Version":"' + this.getVersion() + '"'
            + ((this.getComment().trim()) ? ', "Comment":"' + this.getComment() + '"' : '')
            + ((this.getTimeoutSeconds()) ? ', "TimeoutSeconds":' + this.getTimeoutSeconds() : '');
        for (var _i = 0, _a = this.getStates(); _i < _a.length; _i++) {
            var state = _a[_i];
            json = json + ", " + state.toString();
        }
        json = json + "}";
        return json;
    };
    StateMachine.prototype.toJSON = function () {
        return JSON.parse(this.toString());
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;
