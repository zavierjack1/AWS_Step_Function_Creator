"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
var StateMachine = /** @class */ (function () {
    function StateMachine(states, startIdx, comment, version, timeoutSeconds) {
        if (states === void 0) { states = []; }
        if (comment === void 0) { comment = ""; }
        if (version === void 0) { version = "1.0"; }
        this.states = [];
        if (states.length == 0)
            throw new Error("states must not be empty");
        if (startIdx < 0 || startIdx > states.length - 1)
            throw new Error("startIdx must be within array");
        this.states = states;
        this.startIdx = startIdx;
        this.comment = comment;
        this.version = version;
        this.timeoutSeconds = timeoutSeconds;
    }
    StateMachine.prototype.getStates = function () {
        return this.states;
    };
    StateMachine.prototype.addState = function (state) {
        this.getStates().push(state);
    };
    /*ADD ME TO STATE MACHINE COMPILATION
    public addState(state: State) {
        //check that the addState's nextState matches the name of a current state in the Machine
        //or that the state is terminal
        if (
            this.getStates().some(
                function containsNextState(element, index, array) {
                    return (element.getName() == state.getNextState());
                }
            )
            ||
            state.isTerminal()
        ) {
            this.getStates().push(state);
        }
        else{
            throw new Error("non-terminal states added to a StateMachine must have a nextState that already exists in the machine");
        }
    }
    */
    StateMachine.prototype.setStates = function (states) {
        var _this = this;
        if (states.length > 0) {
            this.states = [];
            states.forEach(function (s) { return _this.addState(s); });
        }
        else {
            throw new Error("can not set states to empty");
        }
    };
    StateMachine.prototype.getStartIdx = function () {
        return this.startIdx;
    };
    StateMachine.prototype.setStartIdx = function (startIdx) {
        if (startIdx < 0 || startIdx > this.getStates().length - 1) {
            throw new Error("startIdx must be within array of states");
        }
        else {
            this.startIdx = startIdx;
        }
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
    return StateMachine;
}());
exports.StateMachine = StateMachine;
