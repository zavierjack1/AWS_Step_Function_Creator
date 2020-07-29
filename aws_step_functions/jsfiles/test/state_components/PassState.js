"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PassState_1 = require("../../src/state_components/PassState");
var chai_1 = require("chai");
require("mocha");
var assert = require('assert');
describe('PassState class tests', function () {
    context('Name Tests', function () {
        it('should return name of State', function () {
            chai_1.expect(new PassState_1.PassState("myName").getName()).to.equal("myName");
        });
        it('should return the newName of State', function () {
            var state = new PassState_1.PassState("myName");
            state.setName("newName");
            chai_1.expect(state.getName()).to.equal("newName");
        });
        it('fail due too name being > 128', function () {
            var name = "";
            for (var i = 0; i < 129; i++) {
                name = name + "a";
            }
            chai_1.expect(function () { var state = new PassState_1.PassState(name); }).to.throw(Error, "name must be <= 128 char");
        });
    });
    context('Type Tests', function () {
        it('should return state type', function () {
            assert.equal(new PassState_1.PassState("myName").getType(), "Pass");
            chai_1.expect(new PassState_1.PassState("myName").getType()).to.equal("Pass");
        });
    });
    context('Comment Tests', function () {
        it('should return state comment', function () {
            chai_1.expect(new PassState_1.PassState("myName", "myComment").getComment()).to.equal("myComment");
        });
        it('should return new state comment', function () {
            var state = new PassState_1.PassState("myName", "myType", "myComment");
            state.setComment("newComment");
            chai_1.expect(state.getComment(), "newComment");
        });
    });
    context('NextState Tests', function () {
        it('should return the next state', function () {
            chai_1.expect(new PassState_1.PassState("myName", "myComment", "myNextState").getNextState()).to.equal("myNextState");
        });
        it('should return new next state', function () {
            var state = new PassState_1.PassState("myName", "myComment", "myNextState");
            state.setNextState("newNextState");
            chai_1.expect(state.getNextState(), "newNextState");
        });
    });
    context('End Tests', function () {
        it('should return end state = false', function () {
            chai_1.expect(new PassState_1.PassState("myName", "myComment").isEndState()).to.equal(false);
        });
        it('should set end state to true with constructor', function () {
            chai_1.expect(new PassState_1.PassState("myName", "comment", "", true).isEndState()).to.equal(true);
        });
        it('should set end state true with setState()', function () {
            var state = new PassState_1.PassState("myName", "comment");
            state.setEndState(true);
            chai_1.expect(state.isEndState()).equal(true);
        });
    });
});
