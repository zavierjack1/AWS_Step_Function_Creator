"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var MapIterator_1 = require("../../src/state_components/MapIterator");
var SucceedState_1 = require("../../src/state_components/SucceedState");
var PassState_1 = require("../../src/state_components/PassState");
var TaskState_1 = require("../../src/state_components/TaskState");
var Catcher_1 = require("../../src/state_components/Catcher");
describe('MapIterator Tests', function () {
    context('Constructor Tests', function () {
        it('create a default map Iterator', function () {
            var mapIterator = new MapIterator_1.MapIterator();
            chai_1.expect(mapIterator.getStates()).to.eql([]);
            chai_1.expect(mapIterator.getStartStateName()).to.equal("");
            chai_1.expect(mapIterator.isValid()).to.equal(false);
        });
        it('create a map Iterator with a startState and empty array', function () {
            var mapIterator = new MapIterator_1.MapIterator([], "startState");
            chai_1.expect(mapIterator.getStates()).to.eql([]);
            chai_1.expect(mapIterator.getStartStateName()).to.equal("startState");
            chai_1.expect(mapIterator.isValid()).to.equal(false);
        });
        it('create a map Iterator with a startState and array', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState");
            chai_1.expect(mapIterator.getStates()).to.eql([new SucceedState_1.SucceedState("myState")]);
            chai_1.expect(mapIterator.getStartStateName()).to.equal("myState");
            chai_1.expect(mapIterator.isValid()).to.equal(true);
        });
        it('create a map Iterator with a bad startState and array', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "notStartState");
            chai_1.expect(mapIterator.getStates()).to.eql([new SucceedState_1.SucceedState("myState")]);
            chai_1.expect(mapIterator.getStartStateName()).to.equal("notStartState");
            chai_1.expect(mapIterator.isValid()).to.equal(false);
        });
    });
    context('states[] Tests', function () {
        it('should return states within machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var mapIterator = new MapIterator_1.MapIterator(states, "");
            chai_1.expect(mapIterator.getStates()).to.eql(states);
        });
        it('should set states within machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var mapIterator = new MapIterator_1.MapIterator(states, "myState");
            states = [new SucceedState_1.SucceedState("myState"), new SucceedState_1.SucceedState("myState2")];
            mapIterator.setStates(states);
            chai_1.expect(mapIterator.getStates()).to.eql([new SucceedState_1.SucceedState("myState"), new SucceedState_1.SucceedState("myState2")]);
        });
        it('should add state to machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var mapIterator = new MapIterator_1.MapIterator(states, "myState");
            mapIterator.addState(new SucceedState_1.SucceedState("myState2"));
            chai_1.expect(mapIterator.getStates()).to.eql([new SucceedState_1.SucceedState("myState"), new SucceedState_1.SucceedState("myState2")]);
        });
        it('should fail to add non-unique stateName to machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var mapIterator = new MapIterator_1.MapIterator(states, "myState");
            mapIterator.addState(new SucceedState_1.SucceedState("myState2"));
            chai_1.expect(function () { mapIterator.addState(new SucceedState_1.SucceedState("myState2")); }).to.Throw(Error, "State names must be unique");
        });
    });
    context('startState tests', function () {
        it('should return start state', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState"), new SucceedState_1.SucceedState("myState2")], "myState");
            chai_1.expect(mapIterator.getStartStateName()).to.equal("myState");
        });
        it('should set start state', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState"), new SucceedState_1.SucceedState("myState2")], "myState");
            mapIterator.setStartStateName("myState2");
            chai_1.expect(mapIterator.getStartStateName()).to.equal("myState2");
        });
    });
    context('isValid tests', function () {
        it('create a map Iterator with invalid startname', function () {
            var mapIterator = new MapIterator_1.MapIterator([new PassState_1.PassState("myState", "test", "", "myState2"), new SucceedState_1.SucceedState("myState2")], "myState100000");
            chai_1.expect(mapIterator.getStates()).to.eql([new PassState_1.PassState("myState", "test", "", "myState2"), new SucceedState_1.SucceedState("myState2")]);
            chai_1.expect(mapIterator.getStartStateName()).to.equal("myState100000");
            chai_1.expect(mapIterator.validateStartStateName()).to.equal(false);
        });
        it('create a map Iterator with valid startname and next states', function () {
            var mapIterator = new MapIterator_1.MapIterator([new PassState_1.PassState("myState", "test", "", "myState2"), new SucceedState_1.SucceedState("myState2")], "myState");
            chai_1.expect(mapIterator.getStates()).to.eql([new PassState_1.PassState("myState", "test", "", "myState2"), new SucceedState_1.SucceedState("myState2")]);
            chai_1.expect(mapIterator.getStartStateName()).to.equal("myState");
            chai_1.expect(mapIterator.validateNextStates()).to.equal(true);
            chai_1.expect(mapIterator.validateStartStateName()).to.equal(true);
        });
        it('create a map Iterator with valid startname and invalid next states', function () {
            var mapIterator = new MapIterator_1.MapIterator([new PassState_1.PassState("myState", "test", "", "myState1000"), new SucceedState_1.SucceedState("myState2")], "myState");
            chai_1.expect(mapIterator.getStartStateName()).to.equal("myState");
            chai_1.expect(mapIterator.validateNextStates()).to.equal(false);
            chai_1.expect(mapIterator.validateStartStateName()).to.equal(true);
        });
        it('create a map Iterator with valid startname and next states and catch states', function () {
            var mapIterator = new MapIterator_1.MapIterator([new TaskState_1.TaskState("myState", function () { return true; }, "", "myState2", false, "", "", [new Catcher_1.Catcher("myState2")]), new SucceedState_1.SucceedState("myState2")], "myState");
            chai_1.expect(mapIterator.getStartStateName()).to.equal("myState");
            chai_1.expect(mapIterator.validateNextStates()).to.equal(true);
            chai_1.expect(mapIterator.validateStartStateName()).to.equal(true);
            chai_1.expect(mapIterator.validateCatchNextStates()).to.equal(true);
        });
        it('create a map Iterator with valid startname and next states and invalid catch states', function () {
            var mapIterator = new MapIterator_1.MapIterator([new TaskState_1.TaskState("myState", function () { return true; }, "", "myState2", false, "", "", [new Catcher_1.Catcher("myState5")]), new SucceedState_1.SucceedState("myState2")], "myState");
            chai_1.expect(mapIterator.getStartStateName()).to.equal("myState");
            chai_1.expect(mapIterator.validateNextStates()).to.equal(true);
            chai_1.expect(mapIterator.validateStartStateName()).to.equal(true);
            chai_1.expect(mapIterator.validateCatchNextStates()).to.equal(false);
        });
    });
});
