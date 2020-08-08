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
exports.SucceedState = void 0;
var State_1 = require("./State");
var SucceedState = /** @class */ (function (_super) {
    __extends(SucceedState, _super);
    function SucceedState(name, comment, inputPath, outputPath) {
        var _this = _super.call(this, name, "Succeed", comment) || this;
        _this.inputPath = inputPath;
        _this.outputPath = outputPath;
        return _this;
    }
    SucceedState.prototype.getInputPath = function () {
        return this.inputPath;
    };
    SucceedState.prototype.setInputPath = function (inputPath) {
        //if json invalid parse will throw SyntaxError
        this.inputPath = inputPath;
    };
    SucceedState.prototype.getOutputPath = function () {
        return this.outputPath;
    };
    SucceedState.prototype.setOutputPath = function (outputPath) {
        //if json invalid parse will throw SyntaxError
        if (outputPath && JSON.parse(outputPath))
            this.outputPath = outputPath;
    };
    SucceedState.prototype.isTerminal = function () {
        return true;
    };
    SucceedState.prototype.toString = function () {
        return '"' + this.getName() + '":'
            + '{'
            + '"Type":"' + this.getType() + '"'
            + ((this.getComment()) ? ',"Comment":"' + this.getComment() + '"' : '')
            + ((this.isTerminal()) ? ',"End":' + this.isTerminal() : '')
            + ((this.getInputPath()) ? ',"InputPath":"' + this.getInputPath() + '"' : '')
            + ((this.getOutputPath()) ? ',"OutputPath":"' + this.getInputPath() + '"' : '')
            + '}';
    };
    return SucceedState;
}(State_1.State));
exports.SucceedState = SucceedState;
