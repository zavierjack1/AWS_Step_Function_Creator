"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FailState_1 = require("../../src/state_components/FailState");
var chai_1 = require("chai");
require("mocha");
describe('SucceedState class tests', function () {
    context('Name Tests', function () {
        it('should return name of State', function () {
            chai_1.expect(new FailState_1.FailState("myName").getName()).to.equal("myName");
        });
        it('should return the newName of State', function () {
            var state = new FailState_1.FailState("myName");
            state.setName("newName");
            chai_1.expect(state.getName()).to.equal("newName");
        });
        it('fail due too name being > 128', function () {
            var name = "";
            for (var i = 0; i < 129; i++) {
                name = name + "a";
            }
            chai_1.expect(function () { var state = new FailState_1.FailState(name); }).to.throw(Error, "name must be <= 128 char");
        });
    });
    context('Type Tests', function () {
        it('should return state type', function () {
            chai_1.expect(new FailState_1.FailState("myName").getType()).to.equal("Fail");
        });
    });
    context('Comment Tests', function () {
        it('should return state comment', function () {
            chai_1.expect(new FailState_1.FailState("myName", "myComment").getComment()).to.equal("myComment");
        });
        it('should return new state comment', function () {
            var state = new FailState_1.FailState("myName", "myComment");
            state.setComment("newComment");
            chai_1.expect(state.getComment()).to.equal("newComment");
        });
    });
    context('toString test', function () {
        it('should return json of task state', function () {
            var taskState = new FailState_1.FailState("myName", "myComment");
            chai_1.expect(taskState.toString()).to.equal('"myName":{"Type":"Fail","Comment":"myComment","End":true}');
        });
    });
});
