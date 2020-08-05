"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State = /** @class */ (function () {
    function State(name, type, comment) {
        if (this.validateName(name))
            this.name = name;
        else
            this.name = "";
        this.type = type;
        this.setComment(comment);
    }
    State.prototype.validateName = function (name) {
        if (name.trim().length == 0 || name.length > 128)
            throw new Error("name must be <= 128 char");
        return true;
    };
    State.prototype.getName = function () {
        return this.name;
    };
    State.prototype.setName = function (name) {
        if (this.validateName(name))
            this.name = name;
    };
    State.prototype.getType = function () {
        return this.type;
    };
    State.prototype.setType = function (type) {
        this.type = type;
    };
    State.prototype.getComment = function () {
        return this.comment;
    };
    State.prototype.setComment = function (comment) {
        this.comment = comment;
    };
    return State;
}());
exports.State = State;
