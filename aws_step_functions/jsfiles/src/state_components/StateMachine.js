"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
var PassState_1 = require("./PassState");
var TaskState_1 = require("./TaskState");
var StateMachine = /** @class */ (function () {
    function StateMachine(states, startState, comment, version, timeoutSeconds, input) {
        if (states === void 0) { states = []; }
        if (version === void 0) { version = "1.0"; }
        this.states = [];
        if (states.length == 0)
            throw new Error("states must not be empty");
        this.states = states;
        this.startState = startState;
        this.setComment(comment);
        this.version = version;
        this.setTimeoutSeconds(timeoutSeconds);
        this.setInput(input);
    }
    StateMachine.prototype.getStates = function () {
        return this.states;
    };
    StateMachine.prototype.addState = function (state) {
        if (!this.validateState(state)) {
            throw new Error("State names must be unique");
        }
        this.getStates().push(state);
        return this.validateNextStates();
    };
    StateMachine.prototype.validate = function () {
        return this.validateNextStates();
    };
    StateMachine.prototype.stateNameIsUnique = function (stateName) {
        if (this.getStates().some(function (element) {
            return element.getName() == stateName;
        })) {
            return false;
        }
        return true;
    };
    StateMachine.prototype.validateState = function (state) {
        return this.stateNameIsUnique(state.getName());
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
    StateMachine.prototype.getInput = function () {
        return (this.input) ? this.input : "";
    };
    StateMachine.prototype.setInput = function (input) {
        //if json invalid parse will throw SyntaxError
        if (input && JSON.parse(input))
            this.input = input;
    };
    StateMachine.prototype.execute = function () {
        var _this = this;
        var currentState;
        var results = [];
        currentState = this.getStates().find(function (element) {
            return element.getName() == _this.getStartStateName();
        });
        while (true) {
            if (currentState instanceof PassState_1.PassState || currentState instanceof TaskState_1.TaskState) {
                var output = currentState.execute(this.getInput());
                if (output)
                    this.setInput(JSON.stringify(output));
            }
            if (currentState == undefined || currentState.isTerminal())
                break;
            currentState = this.getStates().find(function (element) {
                if (currentState instanceof PassState_1.PassState)
                    return currentState ? element.getName() == currentState.getNextStateName() : false;
                if (currentState instanceof TaskState_1.TaskState)
                    return currentState ? element.getName() == currentState.getNextStateName() : false;
            });
        }
        return this.getInput();
    };
    StateMachine.prototype.toString = function () {
        var json = '{'
            + '"StartAt":"' + this.getStartStateName() + '"'
            + ', "Version":"' + this.getVersion() + '"'
            + ((this.getComment().trim()) ? ', "Comment":"' + this.getComment() + '"' : '')
            + ((this.getTimeoutSeconds()) ? ', "TimeoutSeconds":' + this.getTimeoutSeconds() : '');
        //+"}";
        for (var _i = 0, _a = this.getStates(); _i < _a.length; _i++) {
            var state = _a[_i];
            json = json + ", " + state.toString();
        }
        json = json + "}";
        return json;
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;
