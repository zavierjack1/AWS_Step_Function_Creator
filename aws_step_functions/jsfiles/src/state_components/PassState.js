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
var PassState = /** @class */ (function (_super) {
    __extends(PassState, _super);
    function PassState(name, comment, nextState, endState) {
        if (comment === void 0) { comment = ""; }
        if (nextState === void 0) { nextState = ""; }
        if (endState === void 0) { endState = false; }
        return _super.call(this, name, "Pass", comment, nextState, endState) || this;
    }
    return PassState;
}(State_1.State));
exports.PassState = PassState;