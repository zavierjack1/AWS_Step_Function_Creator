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
exports.FailState = void 0;
var State_1 = require("./State");
var FailState = /** @class */ (function (_super) {
    __extends(FailState, _super);
    function FailState(name, comment) {
        return _super.call(this, name, "Fail", comment) || this;
    }
    FailState.prototype.isTerminal = function () {
        return true;
    };
    FailState.prototype.toString = function () {
        return '"' + this.getName() + '":'
            + '{'
            + '"Type":"' + this.getType() + '"'
            + ((this.getComment()) ? ',"Comment":"' + this.getComment() + '"' : '')
            + '}';
    };
    return FailState;
}(State_1.State));
exports.FailState = FailState;
