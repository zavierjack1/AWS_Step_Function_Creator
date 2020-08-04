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
    function TaskState(name, resource, comment, nextState, endState) {
        var _this = this;
        if (!resource)
            throw new Error("Task State must have a resource");
        _this = _super.call(this, name, "Task", comment, nextState, endState) || this;
        _this.resource = resource;
        return _this;
    }
    TaskState.prototype.setResource = function (resource) {
        this.resource = resource;
    };
    TaskState.prototype.getResource = function () {
        return this.resource;
    };
    TaskState.prototype.execute = function (rawInput) {
        if (rawInput) {
            var output = this.getResource()(JsonPath.query(JSON.parse(rawInput), this.getInputPath()));
            //if (this.getOutputPath()) 
        }
        return this.getResource()();
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
