"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PassState_1 = require("../../src/state_components/PassState");
var TaskState_1 = require("../../src/state_components/TaskState");
var StateMachine_1 = require("../../src/state_components/StateMachine");
var chai_1 = require("chai");
require("mocha");
var SucceedState_1 = require("../../src/state_components/SucceedState");
describe('StateMachine Tests', function () {
    context('Constructor Tests', function () {
        it('fails to create a stateMachine states array is length 0', function () {
            var states = [];
            chai_1.expect(function () { var stateMachine = new StateMachine_1.StateMachine(states, "startState"); }).to.throw(Error, "states must not be empty");
        });
    });
    context('states[] Tests', function () {
        it('should return states within machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var stateMachine = new StateMachine_1.StateMachine(states, "");
            chai_1.expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
        });
        it('should set states within machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var stateMachine = new StateMachine_1.StateMachine(states, "myState");
            states = [new SucceedState_1.SucceedState("myState"), new SucceedState_1.SucceedState("myState2")];
            stateMachine.setStates(states);
            chai_1.expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
        });
        it('should add state to machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var stateMachine = new StateMachine_1.StateMachine(states, "myState");
            stateMachine.addState(new SucceedState_1.SucceedState("myState2"));
            chai_1.expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
        });
        it('should fail to add non-unique stateName to machine', function () {
            var states = [new SucceedState_1.SucceedState("myState")];
            var stateMachine = new StateMachine_1.StateMachine(states, "myState");
            stateMachine.addState(new SucceedState_1.SucceedState("myState2"));
            chai_1.expect(function () { stateMachine.addState(new SucceedState_1.SucceedState("myState2")); }).to.Throw(Error, "State names must be unique");
        });
    });
    context('startState tests', function () {
        it('should return start state', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState"), new SucceedState_1.SucceedState("myState2")], "myState");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("myState");
        });
        it('should set start state', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState"), new SucceedState_1.SucceedState("myState2")], "myState");
            stateMachine.setStartStateName("myState2");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("myState2");
        });
    });
    context('Comment Tests', function () {
        it('should return state machine comment', function () {
            chai_1.expect(new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState", "myComment").getComment()).to.equal("myComment");
        });
        it('should return new state machine comment', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState");
            stateMachine.setComment("newComment");
            chai_1.expect(stateMachine.getComment()).to.equal("newComment");
        });
    });
    context('Version Tests', function () {
        it('should return state machine version', function () {
            chai_1.expect(new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState", "myComment").getVersion()).to.equal("1.0");
        });
        it('should return state machine version', function () {
            chai_1.expect(new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0").getVersion()).to.equal("2.0");
        });
        it('should return new state machine version', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState", "myComment");
            stateMachine.setVersion("3.0");
            chai_1.expect(stateMachine.getVersion()).to.equal("3.0");
        });
    });
    context('TimeoutSeconds Tests', function () {
        it('should return state machine TimeoutSeconds', function () {
            chai_1.expect(new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 10).getTimeoutSeconds()).to.equal(10);
        });
        it('should return new state machine TimeoutSeconds', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 20);
            stateMachine.setTimeoutSeconds(40);
            chai_1.expect(stateMachine.getTimeoutSeconds()).to.equal(40);
        });
    });
    context('Add States', function () {
        it('should add a state to the list of states in the machine and return a false validity', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 10);
            var validity = stateMachine.addState(new PassState_1.PassState("myState2", "result", "not a terminal state", undefined, false));
            chai_1.expect(stateMachine.getStates().length).to.equal(2);
            chai_1.expect(validity).to.equal(false);
        });
        it('should add a state to the list of states in the machine and return a true validity', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 10);
            var validity = stateMachine.addState(new SucceedState_1.SucceedState("myState2"));
            chai_1.expect(stateMachine.getStates().length).to.equal(2);
            chai_1.expect(validity).to.equal(true);
        });
        it('should add 2 states to the list of states in the machine and return a true validity', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState", "myComment", "2.0", 10);
            stateMachine.addState(new SucceedState_1.SucceedState("myState2"));
            var validity = stateMachine.addState(new SucceedState_1.SucceedState("myState3"));
            chai_1.expect(stateMachine.getStates().length).to.equal(3);
            chai_1.expect(validity).to.equal(true);
        });
    });
    context('execute statemachine', function () {
        it('should fail statemachine validation', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "xyz", "", false)], "myState", "myComment", "2.0", 10);
            chai_1.expect(function () { stateMachine.execute(); }).to.throw("this stateMachine is invalid!");
        });
        it('Statemachine w/ a PassState. The PassState returns Hello World.', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myPassState", "HelloWorld", "", "myTaskState", true, "", "$.result")], "myPassState");
            var json = "{\n          \"first\": 100,\n          \"second\": 200\n        }";
            stateMachine.setInput(json);
            chai_1.expect(JSON.parse(stateMachine.execute())["result"]).to.equal("HelloWorld");
        });
        it('Statemachine w/ a PassState. The PassState returns Hello World.', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myPassState", "HelloWorld", "", "myTaskState", true, "", "$.result")], "myPassState");
            chai_1.expect(JSON.parse(stateMachine.execute())["result"]).to.equal("HelloWorld");
        });
        it('should simulate statemachine with single pass state and succeed state', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "xyz", "EndState")], "myState", "myComment", "2.0", 10);
            var state = new SucceedState_1.SucceedState("EndState");
            stateMachine.addState(state);
            chai_1.expect(stateMachine.validate()).to.equal(true);
            //expect(stateMachine.execute()[0]).to.equal("result");
        });
        it('should simulate statemachine with a single task state', function () {
            var resource = function () {
                return 1 + 1;
            };
            var stateMachine = new StateMachine_1.StateMachine([new TaskState_1.TaskState("myState", resource, "xyz", "EndState")], "myState", "myComment", "2.0", 10);
            var state = new SucceedState_1.SucceedState("EndState");
            stateMachine.addState(state);
            chai_1.expect(stateMachine.validate()).to.equal(true);
            //expect(stateMachine.execute()[0]).to.equal(2);
        });
    });
    context('toString statemachine', function () {
        it('should print statemachine', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
            var state = new SucceedState_1.SucceedState("EndState");
            stateMachine.addState(state);
            chai_1.expect(JSON.parse(stateMachine.toString())['myState']['Type']).to.equal("Pass");
            chai_1.expect(JSON.parse(stateMachine.toString())['myState']['Result']).to.equal("result");
            chai_1.expect(JSON.parse(stateMachine.toString())['myState']['Comment']).to.equal("xyz");
            chai_1.expect(JSON.parse(stateMachine.toString())['myState']['End']).to.equal(true);
        });
    });
    context('toJSON statemachine', function () {
        it('should return statemachine JSON', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
            var state = new SucceedState_1.SucceedState("EndState");
            stateMachine.addState(state);
            chai_1.expect(stateMachine.toJSON()['myState']['Type']).to.equal("Pass");
            chai_1.expect(stateMachine.toJSON()['myState']['Result']).to.equal("result");
            chai_1.expect(stateMachine.toJSON()['myState']['Comment']).to.equal("xyz");
            chai_1.expect(stateMachine.toJSON()['myState']['End']).to.equal(true);
        });
    });
    context('Input Test', function () {
        it('should fail to validate input JSON', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
            chai_1.expect(function () { stateMachine.setInput("abcd"); }).to.throw(SyntaxError);
        });
        it('should validate & add input JSON', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
            stateMachine.setInput('{"test" : "abcd"}');
            chai_1.expect(stateMachine.getInput()).to.equal('{"test" : "abcd"}');
        });
    });
});
