"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State = /** @class */ (function () {
    function State(name, type, comment, nextState, endState) {
        this.endState = false;
        if (this.validateName(name))
            this.name = name;
        else
            this.name = "";
        this.type = type;
        if (comment)
            this.setComment(comment);
        if (nextState)
            this.setNextState(nextState);
        if (endState)
            this.setEndState(endState);
        else
            this.setEndState(false);
    }
    State.prototype.validateName = function (name) {
        if (name.trim().length == 0 || name.length > 128)
            throw new Error("name must be <= 128 char");
        return true;
    };
    State.prototype.validateNextState = function () {
        if (!this.isTerminal || this.getNextState() != "")
            return true;
        return false;
    };
    State.prototype.getName = function () {
        return this.name;
    };
    State.prototype.setName = function (name) {
        if (this.validateName(name))
            this.name = name;
    };
    State.prototype.getType = function () {
        return this.type;
    };
    State.prototype.setType = function (type) {
        this.type = type;
    };
    State.prototype.getComment = function () {
        return this.comment;
    };
    State.prototype.setComment = function (comment) {
        this.comment = comment;
    };
    State.prototype.getNextState = function () {
        return this.nextState;
    };
    State.prototype.setNextState = function (nextState) {
        this.nextState = nextState;
    };
    State.prototype.isEndState = function () {
        return this.endState;
    };
    State.prototype.setEndState = function (endState) {
        if (endState && !(this.getType() == "Choice" || this.getType() == "Succeed" || this.getType() == "Fail")) {
            this.endState = endState;
        }
        else if (endState) {
            throw new Error("you can only set EndState if type == Choice, type == Succeed, or type == Fail");
        }
        else {
            this.endState = endState;
        }
    };
    State.prototype.isTerminal = function () {
        if (this.isEndState() || this.getType() == "Succeed" || this.getType() == "Fail")
            return true;
        return false;
    };
    return State;
}());
exports.State = State;
