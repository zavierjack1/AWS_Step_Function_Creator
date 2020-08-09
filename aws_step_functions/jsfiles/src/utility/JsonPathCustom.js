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
exports.JsonPathCustom = void 0;
var JsonPath = require('jsonpath');
var JsonPathCustom = /** @class */ (function (_super) {
    __extends(JsonPathCustom, _super);
    function JsonPathCustom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonPathCustom.containsNode = function (obj, pathExpression, count) {
        if (JsonPath.nodes(obj, pathExpression, count).length > 0)
            return true;
        return false;
    };
    return JsonPathCustom;
}(JsonPath));
exports.JsonPathCustom = JsonPathCustom;
