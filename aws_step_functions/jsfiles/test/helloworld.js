"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helloworld_1 = require("../src/helloworld");
var chai_1 = require("chai");
require("mocha");
describe('First test', function () {
    it('should return true', function () {
        var result = helloworld_1.helloTest();
        chai_1.expect(result).to.equal(true);
    });
});
