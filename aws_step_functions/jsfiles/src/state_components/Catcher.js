"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catcher = void 0;
var Catcher = /** @class */ (function () {
    function Catcher(nextStateName
    //errorEquals: string[] = ['States.ALL'] //for now only support this error
    ) {
        this.nextStateName = nextStateName;
        this.errorEquals = ['States.ALL'];
    }
    ;
    Catcher.prototype.getNextStateName = function () {
        return this.nextStateName;
    };
    Catcher.prototype.setNextStateName = function (nextStateName) {
        this.nextStateName = nextStateName;
    };
    Catcher.prototype.getErrorEquals = function () {
        return this.errorEquals;
    };
    return Catcher;
}());
exports.Catcher = Catcher;
