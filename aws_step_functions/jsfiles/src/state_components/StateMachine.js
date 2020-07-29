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
    StateMachine.prototype.setStates = function (states) {
        if (states.length > 0) {
            this.states = states;
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
