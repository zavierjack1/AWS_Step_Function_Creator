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
exports.MapIterator = void 0;
var StateMachine_1 = require("./StateMachine");
var MapIterator = /** @class */ (function (_super) {
    __extends(MapIterator, _super);
    function MapIterator(states, startState, comment, version, timeoutSeconds) {
        if (version === void 0) { version = "1.0"; }
        return _super.call(this, states, startState, comment, version, timeoutSeconds) || this;
    }
    return MapIterator;
}(StateMachine_1.StateMachine));
exports.MapIterator = MapIterator;
