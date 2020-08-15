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
        it('fails to create a mapIterator states array is length 0', function () {
            var states = [];
            chai_1.expect(function () { var mapIterator = new MapIterator_1.MapIterator(states, "startState"); }).to.throw(Error, "states must not be empty");
        });
    });
    context('states[] Tests', function () {
        it('should return states within machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var mapIterator = new MapIterator_1.MapIterator(states, "");
            chai_1.expect(JSON.stringify(mapIterator.getStates())).to.equal(JSON.stringify(states));
        });
        it('should set states within machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var mapIterator = new MapIterator_1.MapIterator(states, "myState");
            states = [new SucceedState_1.SucceedState("myState"), new SucceedState_1.SucceedState("myState2")];
            mapIterator.setStates(states);
            chai_1.expect(JSON.stringify(mapIterator.getStates())).to.equal(JSON.stringify(states));
        });
        it('should add state to machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var mapIterator = new MapIterator_1.MapIterator(states, "myState");
            mapIterator.addState(new SucceedState_1.SucceedState("myState2"));
            chai_1.expect(JSON.stringify(mapIterator.getStates())).to.equal(JSON.stringify(states));
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
    context('Comment Tests', function () {
        it('should return state machine comment', function () {
            chai_1.expect(new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState", "myComment").getComment()).to.equal("myComment");
        });
        it('should return new state machine comment', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState");
            mapIterator.setComment("newComment");
            chai_1.expect(mapIterator.getComment()).to.equal("newComment");
        });
    });
    context('Version Tests', function () {
        it('should return state machine version', function () {
            chai_1.expect(new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState", "myComment").getVersion()).to.equal("1.0");
        });
        it('should return state machine version', function () {
            chai_1.expect(new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0").getVersion()).to.equal("2.0");
        });
        it('should return new state machine version', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState", "myComment");
            mapIterator.setVersion("3.0");
            chai_1.expect(mapIterator.getVersion()).to.equal("3.0");
        });
    });
    context('TimeoutSeconds Tests', function () {
        it('should return state machine TimeoutSeconds', function () {
            chai_1.expect(new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 10).getTimeoutSeconds()).to.equal(10);
        });
        it('should return new state machine TimeoutSeconds', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 20);
            mapIterator.setTimeoutSeconds(40);
            chai_1.expect(mapIterator.getTimeoutSeconds()).to.equal(40);
        });
    });
    context('Add States', function () {
        it('should add a state to the list of states in the machine and return a false validity', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 10);
            var validity = mapIterator.addState(new PassState_1.PassState("myState2", "result", "not a terminal state", undefined, false));
            chai_1.expect(mapIterator.getStates().length).to.equal(2);
            chai_1.expect(validity).to.equal(false);
        });
        it('should add a state to the list of states in the machine and return a true validity', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 10);
            var validity = mapIterator.addState(new SucceedState_1.SucceedState("myState2"));
            chai_1.expect(mapIterator.getStates().length).to.equal(2);
            chai_1.expect(validity).to.equal(true);
        });
        it('should add 2 states to the list of states in the machine and return a true validity', function () {
            var mapIterator = new MapIterator_1.MapIterator([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 10);
            mapIterator.addState(new SucceedState_1.SucceedState("myState2"));
            var validity = mapIterator.addState(new SucceedState_1.SucceedState("myState3"));
            chai_1.expect(mapIterator.getStates().length).to.equal(3);
            chai_1.expect(validity).to.equal(true);
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
    context('execute mapiterator', function () {
        it('should fail mapiterator validation', function () {
            var mapIterator = new MapIterator_1.MapIterator([new PassState_1.PassState("myState", "result", "xyz", "", false)], "myState", "myComment", "2.0", 10);
            var input = "{\n        \"result\": \"\"\n      }";
            chai_1.expect(function () { mapIterator.execute(input); }).to.throw("this stateMachine is invalid!");
        });
        it('Statemachine w/ a PassState. The PassState returns Hello World.', function () {
            var mapIterator = new MapIterator_1.MapIterator([new PassState_1.PassState("myPassState", "HelloWorld", "", "myTaskState", true, "", "$.result")], "myPassState");
            var input = "{\n          \"first\": 100,\n          \"second\": 200,\n          \"result\": \"\"\n        }";
            chai_1.expect(mapIterator.execute(input)["result"]).to.equal("HelloWorld");
        });
        it('Statemachine w/ a PassState. The PassState returns Hello World.', function () {
            var mapIterator = new MapIterator_1.MapIterator([new PassState_1.PassState("myPassState", "HelloWorld", "", "myTaskState", true, "", "$.result")], "myPassState");
            var input = "{\n        \"result\": \"\"\n      }";
            chai_1.expect(mapIterator.execute(input)["result"]).to.equal("HelloWorld");
        });
        it('should simulate mapiterator with single pass state and succeed state', function () {
            var mapIterator = new MapIterator_1.MapIterator([new PassState_1.PassState("myState", "result", "xyz", "EndState")], "myState", "myComment", "2.0", 10);
            var state = new SucceedState_1.SucceedState("EndState");
            mapIterator.addState(state);
            chai_1.expect(mapIterator.isValid()).to.equal(true);
            chai_1.expect(mapIterator.execute('{"result":""}')).to.eql({ "result": "" });
        });
        it('should simulate mapiterator with a single task state', function () {
            var resource = function () {
                return 1 + 1;
            };
            var mapIterator = new MapIterator_1.MapIterator([new TaskState_1.TaskState("myState", resource, "xyz", "EndState", false, "", "$.result")], "myState", "myComment", "2.0", 10);
            var state = new SucceedState_1.SucceedState("EndState");
            mapIterator.addState(state);
            chai_1.expect(mapIterator.isValid()).to.equal(true);
            chai_1.expect(mapIterator.execute('{"result":""}')).to.eql({ "result": 2 });
        });
        it('should simulate mapiterator with error', function () {
            var resource = function () {
                throw new Error("resource error");
            };
            var catcher = new Catcher_1.Catcher("myEnd");
            var mapIterator = new MapIterator_1.MapIterator([
                new TaskState_1.TaskState("myState", resource, "xyz", "myEnd", false, "", "", [catcher]),
                new SucceedState_1.SucceedState("myEnd")
            ], "myState", "myComment", "2.0", 10);
            chai_1.expect(mapIterator.isValid()).to.equal(true);
            chai_1.expect(mapIterator.execute('{"result":""}')).to.eql({ "result": "" });
        });
        it('should simulate mapiterator with error', function () {
            var resource = function () {
                throw new Error("resource error");
            };
            var catcher = new Catcher_1.Catcher("myEnd");
            var mapIterator = new MapIterator_1.MapIterator([
                new TaskState_1.TaskState("myState", resource, "xyz", "myEnd", false, "", "", [catcher]),
                new SucceedState_1.SucceedState("myEnd")
            ], "myState", "myComment", "2.0", 10);
            chai_1.expect(mapIterator.isValid()).to.equal(true);
            chai_1.expect(mapIterator.execute('{"result":""}')).to.eql({ "result": "" });
        });
        it('myState->Error->myState2->myEnd', function () {
            var resource = function () {
                throw new Error("resource error");
            };
            var resource2 = function () {
                return "abcde";
            };
            var catcher = new Catcher_1.Catcher("myState2");
            var mapIterator = new MapIterator_1.MapIterator([
                new TaskState_1.TaskState("myState", resource, "xyz", "myEnd", false, "", "", [catcher]),
                new SucceedState_1.SucceedState("myEnd"),
                new TaskState_1.TaskState("myState2", resource2, "xyz", "myEnd", false, "", "$.result")
            ], "myState", "myComment", "2.0", 10);
            chai_1.expect(mapIterator.isValid()).to.equal(true);
            chai_1.expect(mapIterator.execute('{"result":""}')).to.eql({ "result": "abcde" });
        });
        it('should simulate mapiterator that fails validation because catcher points to non-existent state', function () {
            var resource = function () {
                throw new Error("resource error");
            };
            var resource2 = function () {
                return "abcde";
            };
            var catcher = new Catcher_1.Catcher("NOT_REAL");
            var mapIterator = new MapIterator_1.MapIterator([
                new TaskState_1.TaskState("myState", resource, "xyz", "myEnd", false, "", "", [catcher]),
                new SucceedState_1.SucceedState("myEnd"),
                new TaskState_1.TaskState("myState2", resource2, "xyz", "myEnd", false, "", "$.result")
            ], "myState", "myComment", "2.0", 10);
            chai_1.expect(mapIterator.isValid()).to.equal(false);
        });
    });
    context('toString mapiterator', function () {
        it('should print mapiterator', function () {
            var mapIterator = new MapIterator_1.MapIterator([new PassState_1.PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
            var state = new SucceedState_1.SucceedState("EndState");
            mapIterator.addState(state);
            chai_1.expect(JSON.parse(mapIterator.toString())['myState']['Type']).to.equal("Pass");
            chai_1.expect(JSON.parse(mapIterator.toString())['myState']['Result']).to.equal("result");
            chai_1.expect(JSON.parse(mapIterator.toString())['myState']['Comment']).to.equal("xyz");
            chai_1.expect(JSON.parse(mapIterator.toString())['myState']['End']).to.equal(true);
        });
    });
    context('toJSON mapiterator', function () {
        it('should return mapiterator JSON', function () {
            var mapIterator = new MapIterator_1.MapIterator([new PassState_1.PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
            var state = new SucceedState_1.SucceedState("EndState");
            mapIterator.addState(state);
            chai_1.expect(mapIterator.toJSON()['myState']['Type']).to.equal("Pass");
            chai_1.expect(mapIterator.toJSON()['myState']['Result']).to.equal("result");
            chai_1.expect(mapIterator.toJSON()['myState']['Comment']).to.equal("xyz");
            chai_1.expect(mapIterator.toJSON()['myState']['End']).to.equal(true);
        });
    });
});
