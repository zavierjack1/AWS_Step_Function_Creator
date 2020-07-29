"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State = /** @class */ (function () {
    function State(name, type, comment, nextState, endState) {
        if (comment === void 0) { comment = ""; }
        if (nextState === void 0) { nextState = ""; }
        if (endState === void 0) { endState = false; }
        this.endState = false;
        if (!name)
            throw new Error("all params required");
        if (!type)
            throw new Error("type required");
        if (this.validateName(name)) {
            this.name = name;
        }
        else {
            this.name = ""; //unreachable
        }
        this.type = type;
        this.comment = comment;
        this.nextState = nextState;
        this.setEndState(endState);
    }
    State.prototype.validateName = function (name) {
        if (name.length > 128)
            throw new Error("name must be <= 128 char");
        return true;
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
    //public setType(type: string): void {
    //    this.type = type;
    //}
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
        //Todo: if not type = choice, succeed, or fail. you may set EndState
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
