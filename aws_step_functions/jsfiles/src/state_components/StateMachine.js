"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
var StateMachine = /** @class */ (function () {
    function StateMachine(states, startState, comment, version, timeoutSeconds) {
        if (states === void 0) { states = []; }
        if (comment === void 0) { comment = ""; }
        if (version === void 0) { version = "1.0"; }
        this.states = [];
        if (states.length == 0)
            throw new Error("states must not be empty");
        this.states = states;
        this.startState = startState;
        this.comment = comment;
        this.version = version;
        this.timeoutSeconds = timeoutSeconds;
    }
    StateMachine.prototype.getStates = function () {
        return this.states;
    };
    StateMachine.prototype.addState = function (state) {
        if (!this.validateState(state)) {
            console.log("here!!!");
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
            console.log(element.getName() + " : " + stateName);
            return element.getName() == stateName;
        })) {
            console.log("statename not unique");
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
                    //the nextstate of the current state does not match any of the statenames in the machine
                    !(this_1.getStates().some(function matchesNextState(element) {
                        return (states[idx].getNextState() == element.getName());
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
        return this.comment;
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
    StateMachine.prototype.simulate = function () {
        var _this = this;
        var startState;
        this.getStates().find(function (element) {
            element.getName() == _this.getStartStateName();
        });
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;
