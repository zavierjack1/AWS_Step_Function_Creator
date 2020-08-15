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
var JsonPathCustom_1 = require("../utility/JsonPathCustom");
var TaskState_1 = require("./TaskState");
var MapState = /** @class */ (function (_super) {
    __extends(MapState, _super);
    function MapState(name, mapIterator, comment, nextStateName, endState, inputPath, outputPath, catchers, retries) {
        if (endState === void 0) { endState = false; }
        if (catchers === void 0) { catchers = []; }
        if (retries === void 0) { retries = []; }
        var _this = _super.call(this, name, function () { throw Error("Map States have no resource"); }, comment, nextStateName, endState, inputPath, outputPath, catchers, retries) || this;
        _this.setType("Map");
        _this.setResource(_this.execute);
        _this.mapIterator = mapIterator;
        return _this;
    }
    MapState.prototype.isTerminal = function () {
        return this.isEndState();
    };
    MapState.prototype.execute = function (input) {
        var _this = this;
        if (input === void 0) { input = ""; }
        if (!this.getInputPath())
            throw new Error("MapStates require an inputPath");
        if (typeof input === 'string')
            input = JSON.parse((input) ? input : "{}");
        if (typeof input === 'object')
            null;
        else
            throw new Error("Input may only be string or valid json");
        if (this.getInputPath() && this.getOutputPath()) {
            if (JsonPathCustom_1.JsonPathCustom.containsNode(input, this.getOutputPath())) {
                var inputArray_1 = JsonPathCustom_1.JsonPathCustom.query(input, this.getInputPath());
                if (Array.isArray(JsonPathCustom_1.JsonPathCustom.query(input, this.getInputPath())[0]))
                    inputArray_1 = JsonPathCustom_1.JsonPathCustom.query(input, this.getInputPath())[0];
                //else inputArray = JsonPathCustom.query(input, this.getInputPath());
                inputArray_1.forEach(function (element, index) {
                    inputArray_1[index] = _this.getMapIterator().execute(element);
                });
                JsonPathCustom_1.JsonPathCustom.value(input, this.getOutputPath(), inputArray_1);
                return input;
            }
            else {
                throw new Error("outputPath not found in input json");
            }
        }
        if (this.getInputPath() && !this.getOutputPath()) {
            var inputArray_2 = JsonPathCustom_1.JsonPathCustom.query(input, this.getInputPath())[0];
            var count_1 = 0;
            inputArray_2.forEach(function (element, index) {
                inputArray_2[index] = _this.getMapIterator().execute(element);
                count_1++;
            });
            return input;
        }
    };
    MapState.prototype.validateNextStateName = function () {
        if (this.isTerminal() || this.getNextStateName() != "")
            return true;
        return false;
    };
    MapState.prototype.getMapIterator = function () {
        return this.mapIterator;
    };
    MapState.prototype.setMapIterator = function (mapIterator) {
        this.mapIterator = mapIterator;
    };
    MapState.prototype.toString = function () {
        return '"' + this.getName() + '":'
            + '{'
            + '"Type":"' + this.getType() + '"'
            + ((this.getComment()) ? ',"Comment":"' + this.getComment() + '"' : '')
            + ((this.getNextStateName()) ? ',"Next":"' + this.getNextStateName() + '"' : '')
            + ((this.isTerminal()) ? ',"End":' + this.isTerminal() : '')
            + ((this.getInputPath()) ? ',"InputPath":"' + this.getInputPath() + '"' : '')
            + ((this.getOutputPath()) ? ',"OutputPath":"' + this.getOutputPath() + '"' : '')
            + ((this.getCatchers().length > 0) ? ", Catch: " + this.getCatchers()[0].toString() : "")
            + (', "Iterator": ' + this.getMapIterator().toString())
            + '}';
    };
    return MapState;
}(TaskState_1.TaskState));
exports.MapState = MapState;
