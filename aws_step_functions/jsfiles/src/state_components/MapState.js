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
exports.MapState = void 0;
var State_1 = require("./State");
var MapIterator_1 = require("./MapIterator");
var JsonPathCustom_1 = require("../utility/JsonPathCustom");
var MapState = /** @class */ (function (_super) {
    __extends(MapState, _super);
    function MapState(name, resource, comment, nextStateName, endState, inputPath, outputPath, catchers, retries, mapIterator) {
        if (endState === void 0) { endState = false; }
        if (catchers === void 0) { catchers = []; }
        if (retries === void 0) { retries = []; }
        if (mapIterator === void 0) { mapIterator = new MapIterator_1.MapIterator(); }
        var _this = _super.call(this, name, "Map", comment) || this;
        _this.endState = false;
        if (!resource)
            throw new Error("Task State must have a resource");
        _this.nextStateName = nextStateName;
        _this.endState = endState;
        _this.inputPath = inputPath;
        _this.outputPath = outputPath;
        _this.resource = resource;
        _this.catchers = catchers;
        _this.retries = retries;
        _this.mapIterator = mapIterator;
        return _this;
    }
    MapState.prototype.setResource = function (resource) {
        this.resource = resource;
    };
    MapState.prototype.getResource = function () {
        return this.resource;
    };
    MapState.prototype.getNextStateName = function () {
        return this.nextStateName;
    };
    MapState.prototype.setNextStateName = function (nextStateName) {
        this.nextStateName = nextStateName;
    };
    MapState.prototype.isEndState = function () {
        return this.endState;
    };
    MapState.prototype.setEndState = function (endState) {
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
    MapState.prototype.getInputPath = function () {
        return (this.inputPath) ? this.inputPath : "";
    };
    MapState.prototype.setInputPath = function (inputPath) {
        //we need a jsonpath validator
        this.inputPath = inputPath;
    };
    MapState.prototype.getOutputPath = function () {
        return (this.outputPath) ? this.outputPath : "";
    };
    MapState.prototype.setOutputPath = function (outputPath) {
        this.outputPath = outputPath;
    };
    MapState.prototype.getRetries = function () {
        return this.retries;
    };
    MapState.prototype.addRetry = function (retry) {
        this.getRetries().push(retry);
    };
    MapState.prototype.setRetries = function (retries) {
        var _this = this;
        this.retries = [];
        retries.forEach(function (r) { return _this.addRetry(r); });
        return true;
    };
    MapState.prototype.getCatchers = function () {
        return this.catchers;
    };
    MapState.prototype.addCatcher = function (catch_) {
        this.getCatchers().push(catch_);
    };
    MapState.prototype.setCatchers = function (catchers) {
        var _this = this;
        this.catchers = [];
        catchers.forEach(function (c) { return _this.addCatcher(c); });
    };
    MapState.prototype.isTerminal = function () {
        return this.isEndState();
    };
    MapState.prototype.execute = function (input) {
        if (input === void 0) { input = ""; }
        if (typeof input === 'string')
            input = JSON.parse((input) ? input : "{}");
        if (typeof input === 'object')
            input = input;
        else
            throw new Error("Input may only be string or valid json");
        if (this.getInputPath() && this.getOutputPath()) {
            if (JsonPathCustom_1.JsonPathCustom.containsNode(input, this.getOutputPath())) {
                JsonPathCustom_1.JsonPathCustom.value(input, this.getOutputPath(), this.getResource()(JsonPathCustom_1.JsonPathCustom.query(input, this.getInputPath())));
                return input;
            }
            else {
                throw new Error("outputPath not found in input json");
            }
        }
        if (this.getOutputPath()) {
            JsonPathCustom_1.JsonPathCustom.value(input, this.getOutputPath(), this.getResource()());
            return input;
        }
        this.getResource()();
        return input;
    };
    MapState.prototype.validateNextStateName = function () {
        if (this.isTerminal() || this.getNextStateName() != "")
            return true;
        return false;
    };
    MapState.prototype.toString = function () {
        return '"' + this.getName() + '":'
            + '{'
            + '"Type":"' + this.getType() + '"'
            + ',"Resource":"' + this.getResource() + '"'
            + ((this.getComment()) ? ',"Comment":"' + this.getComment() + '"' : '')
            + ((this.getNextStateName()) ? ',"Next":"' + this.getNextStateName() + '"' : '')
            + ((this.isTerminal()) ? ',"End":' + this.isTerminal() : '')
            + ((this.getInputPath()) ? ',"InputPath":"' + this.getInputPath() + '"' : '')
            + ((this.getOutputPath()) ? ',"OutputPath":"' + this.getOutputPath() + '"' : '')
            + ((this.getCatchers().length > 0) ? ", Catch: " + this.getCatchers()[0].toString() : "")
            + '}';
    };
    return MapState;
}(State_1.State));
exports.MapState = MapState;
