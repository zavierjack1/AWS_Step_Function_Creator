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
exports.TaskState = void 0;
var State_1 = require("./State");
var JsonPath = require('jsonpath');
var TaskState = /** @class */ (function (_super) {
    __extends(TaskState, _super);
    function TaskState(name, resource, comment, nextStateName, endState, inputPath, outputPath) {
        var _this = _super.call(this, name, "Task", comment) || this;
        _this.endState = false;
        if (!resource)
            throw new Error("Task State must have a resource");
        _this.setNextStateName(nextStateName);
        if (endState)
            _this.setEndState(endState);
        else
            endState = false;
        _this.setInputPath(inputPath);
        _this.setOutputPath(outputPath);
        _this.resource = resource;
        return _this;
    }
    TaskState.prototype.setResource = function (resource) {
        this.resource = resource;
    };
    TaskState.prototype.getResource = function () {
        return this.resource;
    };
    TaskState.prototype.getNextStateName = function () {
        return this.nextStateName;
    };
    TaskState.prototype.setNextStateName = function (nextStateName) {
        this.nextStateName = nextStateName;
    };
    TaskState.prototype.isEndState = function () {
        return this.endState;
    };
    TaskState.prototype.setEndState = function (endState) {
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
    TaskState.prototype.getInputPath = function () {
        return this.inputPath;
    };
    TaskState.prototype.setInputPath = function (inputPath) {
        //if json invalid parse will throw SyntaxError
        this.inputPath = inputPath;
    };
    TaskState.prototype.getOutputPath = function () {
        return this.outputPath;
    };
    TaskState.prototype.setOutputPath = function (outputPath) {
        //if json invalid parse will throw SyntaxError
        this.outputPath = outputPath;
    };
    TaskState.prototype.isTerminal = function () {
        return this.isEndState();
    };
    TaskState.prototype.execute = function (rawInput) {
        if (rawInput) {
            rawInput = JSON.parse(rawInput); //convert string to jsonObject
            var resoureResult = this.getResource()(JsonPath.query(rawInput, this.getInputPath()));
            if (this.getOutputPath()) {
                JsonPath.value(rawInput, this.getOutputPath(), resoureResult);
                return rawInput;
            }
            return resoureResult;
        }
        return this.getResource()();
    };
    TaskState.prototype.validateNextStateName = function () {
        if (!this.isTerminal || this.getNextStateName() != "")
            return true;
        return false;
    };
    TaskState.prototype.toString = function () {
        return '"' + this.getName() + '":'
            + '{'
            + '"Type":"' + this.getType() + '"'
            + ',"Resource":"' + this.getResource() + '"'
            + ((this.getComment()) ? ',"Comment":"' + this.getComment() + '"' : '')
            + ((this.getNextStateName()) ? ',"Next":"' + this.getNextStateName() + '"' : '')
            + ((this.isEndState()) ? ',"End":' + this.isEndState() : '')
            + '}';
    };
    return TaskState;
}(State_1.State));
exports.TaskState = TaskState;
