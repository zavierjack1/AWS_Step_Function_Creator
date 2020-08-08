"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SucceedState_1 = require("../../src/state_components/SucceedState");
var chai_1 = require("chai");
require("mocha");
describe('SucceedState class tests', function () {
    context('Name Tests', function () {
        it('should return name of State', function () {
            chai_1.expect(new SucceedState_1.SucceedState("myName").getName()).to.equal("myName");
        });
        it('should return the newName of State', function () {
            var state = new SucceedState_1.SucceedState("myName");
            state.setName("newName");
            chai_1.expect(state.getName()).to.equal("newName");
        });
        it('fail due too name being > 128', function () {
            var name = "";
            for (var i = 0; i < 129; i++) {
                name = name + "a";
            }
            chai_1.expect(function () { var state = new SucceedState_1.SucceedState(name); }).to.throw(Error, "name must be <= 128 char");
        });
    });
    context('Type Tests', function () {
        it('should return state type', function () {
            chai_1.expect(new SucceedState_1.SucceedState("myName").getType()).to.equal("Succeed");
        });
    });
    context('Comment Tests', function () {
        it('should return state comment', function () {
            chai_1.expect(new SucceedState_1.SucceedState("myName", "myComment").getComment()).to.equal("myComment");
        });
        it('should return new state comment', function () {
            var state = new SucceedState_1.SucceedState("myName", "myComment");
            state.setComment("newComment");
            chai_1.expect(state.getComment()).to.equal("newComment");
        });
    });
    context('InputPath Tests', function () {
        it('should set and get inputPath', function () {
            var resource = function () { return 1 + 1; };
            var state = new SucceedState_1.SucceedState("myName", "myComment");
            state.setInputPath("$.store.book[*].author");
            chai_1.expect(state.getInputPath()).to.equal("$.store.book[*].author");
        });
    });
    context('toString test', function () {
        it('should return json of task state', function () {
            var taskState = new SucceedState_1.SucceedState("myName", "myComment");
            chai_1.expect(taskState.toString()).to.equal('"myName":{"Type":"Succeed","Comment":"myComment","End":true}');
        });
    });
});
