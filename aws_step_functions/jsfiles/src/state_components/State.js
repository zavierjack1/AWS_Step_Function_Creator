"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State = /** @class */ (function () {
    function State(name, type, comment, nextStateName, endState, inputPath, outputPath) {
        this.endState = false;
        if (this.validateName(name))
            this.name = name;
        else
            this.name = "";
        this.type = type;
        this.setComment(comment);
        this.setNextStateName(nextStateName);
        if (endState)
            this.setEndState(endState);
        else
            endState = false;
        this.setInputPath(inputPath);
        this.setOutputPath(outputPath);
    }
    State.prototype.validateName = function (name) {
        if (name.trim().length == 0 || name.length > 128)
            throw new Error("name must be <= 128 char");
        return true;
    };
    State.prototype.validatenextStateName = function () {
        if (!this.isTerminal || this.getNextStateName() != "")
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
    State.prototype.getNextStateName = function () {
        return this.nextStateName;
    };
    State.prototype.setNextStateName = function (nextStateName) {
        this.nextStateName = nextStateName;
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
    State.prototype.getInputPath = function () {
        return this.inputPath;
    };
    State.prototype.setInputPath = function (inputPath) {
        //if json invalid parse will throw SyntaxError
        this.inputPath = inputPath;
    };
    State.prototype.getOutputPath = function () {
        return this.outputPath;
    };
    State.prototype.setOutputPath = function (outputPath) {
        //if json invalid parse will throw SyntaxError
        if (outputPath && JSON.parse(outputPath))
            this.outputPath = outputPath;
    };
    State.prototype.toString = function () {
        return '"' + this.getName() + '":'
            + '{'
            + '"Type":"' + this.getType() + '"'
            + ((this.getComment()) ? ',"Comment":"' + this.getComment() + '"' : '')
            + ((this.getNextStateName()) ? ',"Next":' + this.getNextStateName() : '')
            + ((this.isEndState()) ? ', "End":"' + this.isEndState() + '"' : '')
            + '}';
    };
    return State;
}());
exports.State = State;
