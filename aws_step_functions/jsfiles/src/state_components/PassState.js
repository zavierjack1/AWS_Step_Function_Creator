"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassState = void 0;
var State_1 = require("./State");
var JsonPath = require('jsonpath');
var PassState = /** @class */ (function (_super) {
    __extends(PassState, _super);
    function PassState(name, result, comment, nextStateName, endState, inputPath, outputPath) {
        var _this = _super.call(this, name, "Pass", comment) || this;
        _this.endState = false;
        _this.setNextStateName(nextStateName);
        if (endState)
            _this.setEndState(endState);
        else
            endState = false;
        _this.setInputPath(inputPath);
        _this.setOutputPath(outputPath);
        _this.result = result;
        return _this;
    }
    PassState.prototype.getResult = function () {
        return this.result;
    };
    PassState.prototype.setResult = function (result) {
        this.result = result;
    };
    PassState.prototype.getNextStateName = function () {
        return this.nextStateName;
    };
    PassState.prototype.setNextStateName = function (nextStateName) {
        this.nextStateName = nextStateName;
    };
    PassState.prototype.isEndState = function () {
        return this.endState;
    };
    PassState.prototype.setEndState = function (endState) {
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
    PassState.prototype.getInputPath = function () {
        return this.inputPath;
    };
    PassState.prototype.setInputPath = function (inputPath) {
        this.inputPath = inputPath;
    };
    PassState.prototype.getOutputPath = function () {
        return this.outputPath ? this.outputPath : "";
    };
    PassState.prototype.setOutputPath = function (outputPath) {
        if (outputPath)
            this.outputPath = outputPath;
    };
    PassState.prototype.execute = function (input) {
        var output = JSON.parse(input ? input : "{}");
        if (this.getOutputPath()) {
            JsonPath.value(output, this.getOutputPath(), this.getResult());
            return output;
        }
        return output;
    };
    PassState.prototype.isTerminal = function () {
        return this.isEndState();
    };
    PassState.prototype.toString = function () {
        return '"' + this.getName() + '":'
            + '{'
            + '"Type":"' + this.getType() + '"'
            + ',"Result":"' + this.getResult() + '"'
            + ((this.getComment()) ? ',"Comment":"' + this.getComment() + '"' : '')
            + ((this.getNextStateName()) ? ',"Next":"' + this.getNextStateName() + '"' : '')
            + ((this.isTerminal()) ? ',"End":' + this.isTerminal() : '')
            + ((this.getInputPath()) ? ',"InputPath":"' + this.getInputPath() + '"' : '')
            + ((this.getOutputPath()) ? ',"OutputPath":"' + this.getOutputPath() + '"' : '')
            + '}';
    };
    return PassState;
}(State_1.State));
exports.PassState = PassState;
