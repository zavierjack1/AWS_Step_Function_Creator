"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../../src/state_components/State");
var chai_1 = require("chai");
require("mocha");
describe('State class tests', function () {
    context('Name Tests', function () {
        it('should return name of State', function () {
            chai_1.expect(new State_1.State("myName", "myType").getName()).to.equal("myName");
        });
        it('should return the newName of State', function () {
            var state = new State_1.State("myName", "myType");
            state.setName("newName");
            chai_1.expect(state.getName()).equal("newName");
        });
        it('fail due too name being > 128', function () {
            var name = "";
            for (var i = 0; i < 129; i++) {
                name = name + "a";
            }
            chai_1.expect(function () { var state = new State_1.State(name, "myType"); }).to.Throw(Error, "name must be <= 128 char");
        });
    });
    context('Type Tests', function () {
        it('should return state type', function () {
            chai_1.expect(new State_1.State("myName", "myType").getType()).to.equal("myType");
        });
    });
    context('Comment Tests', function () {
        it('should return state comment', function () {
            chai_1.expect(new State_1.State("myName", "myType", "myComment").getComment()).equal("myComment");
        });
        it('should return new state comment', function () {
            var state = new State_1.State("myName", "myType", "myComment");
            state.setComment("newComment");
            chai_1.expect(state.getComment()).to.equal("newComment");
        });
    });
    context('NextState Tests', function () {
        it('should return the next state', function () {
            chai_1.expect(new State_1.State("myName", "myType", "myComment", "myNextState").getNextStateName()).to.equal("myNextState");
        });
        it('should return new next state', function () {
            var state = new State_1.State("myName", "myType", "myComment", "myNextState");
            state.setNextStateName("newNextState");
            chai_1.expect(state.getNextStateName()).to.equal("newNextState");
        });
    });
    context('End Tests', function () {
        it('should return end state = false', function () {
            chai_1.expect(new State_1.State("myName", "myType", "myComment").isEndState()).to.equal(false);
        });
        it('should fail to set end state to true due to invalid type', function () {
            chai_1.expect(function () { var state = new State_1.State("myName", "Succeed").setEndState(true); }).to.throw(Error, 'you can only set EndState if type == Choice, type == Succeed, or type == Fail');
        });
        it('should set end state to true with constructor', function () {
            chai_1.expect(new State_1.State("myName", "Pass", "comment", "", true).isEndState()).to.equal(true);
        });
        it('should set end state true with setState()', function () {
            var state = new State_1.State("myName", "Pass");
            state.setEndState(true);
            chai_1.expect(state.isEndState()).to.equal(true);
        });
    });
    context('toString test', function () {
        it('should return json version of state', function () {
            chai_1.expect(new State_1.State("myName", "myType", "myComment").toString()).to.equal('"myName":{"Type":"myType","Comment":"myComment"}');
        });
        it('should return json version of state', function () {
            chai_1.expect(new State_1.State("myName", "myType").toString()).to.equal('"myName":{"Type":"myType"}');
        });
    });
    context('InputPath Test', function () {
        it('should set and get inputPath', function () {
            var state = new State_1.State("myState", "myType", "comment", "", true);
            state.setInputPath("$.store.book[*].author");
            chai_1.expect(state.getInputPath()).to.equal("$.store.book[*].author");
        });
    });
    context('toString test', function () {
        it('should return json version of state', function () {
            chai_1.expect(new State_1.State("myName", "myType", "myComment").toString()).to.equal('"myName":{"Type":"myType","Comment":"myComment"}');
        });
        it('should return json version of state', function () {
            chai_1.expect(new State_1.State("myName", "myType").toString()).to.equal('"myName":{"Type":"myType"}');
        });
    });
});
