"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PassState_1 = require("../../src/state_components/PassState");
var TaskState_1 = require("../../src/state_components/TaskState");
var StateMachine_1 = require("../../src/state_components/StateMachine");
var chai_1 = require("chai");
require("mocha");
var SucceedState_1 = require("../../src/state_components/SucceedState");
//!!!!!!! WE NEED TO PASS AND RETURN JSON OBJECTS TO STATES NOT STRINGS!!!
describe('Milestones', function () {
    context("1. Create/toString/simulate a state machine consisting of a single Pass state. No\n    input/output processing, parameters, result/result path, or error handling support", function () {
        it('should create a State Machine w/ a Pass state using State class', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState");
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("myState");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Succeed");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("myState");
            chai_1.expect(stateMachine.validate()).to.equal(true);
        });
        it('should create a State Machine w/ a Pass state using the PassState class', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "comment", "myState2"), new SucceedState_1.SucceedState("myState2", "Succeed")], "myState");
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("myState");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("myState");
            chai_1.expect(stateMachine.validate()).to.equal(true);
        });
        it('should create a State Machine w/ a Pass state using the PassState class', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "comment", "myState2"), new SucceedState_1.SucceedState("myState2", "Succeed")], "myState");
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("myState");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("myState");
            chai_1.expect(stateMachine.validate()).to.equal(true);
        });
        it('HelloWorld single PassState', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("Hello World", "Hello World Result", "", "", true)], "Hello World", "A simple minimal example of the States language");
            var results = stateMachine.execute();
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("Hello World");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("Hello World");
            chai_1.expect(stateMachine.validate()).to.equal(true);
            chai_1.expect(stateMachine.toString()).to.equal('{"StartAt":"Hello World", "Version":"1.0", "Comment":"A simple minimal example of the States language", "Hello World":{"Type":"Pass","End":true,"Result":"Hello World Result"}}');
            chai_1.expect(JSON.parse(stateMachine.toString())["StartAt"]).to.equal("Hello World");
            chai_1.expect(JSON.parse(stateMachine.toString())["Version"]).to.equal("1.0");
            chai_1.expect(JSON.parse(stateMachine.toString())["Comment"]).to.equal("A simple minimal example of the States language");
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World"]["Type"]).to.equal("Pass");
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World"]["End"]).to.equal(true);
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World"]["Result"]).to.equal("Hello World Result");
            //expect(results[0]).to.equal("Hello World Result");
        });
    });
    context("2. Add support for a Task state. The state machine representation can now be created either\n    with a single Pass state or a single Task state. The interpreter must support a way\n    for the client to provide mock implementations for function resources used in task states.\n    When simulated, the output of the Task state should be the result of an invocation to the\n    corresponding mock function.", function () {
        it('HelloWorld single TaskState', function () {
            var resource = function () { return 1 + 1; };
            var stateMachine = new StateMachine_1.StateMachine([new TaskState_1.TaskState("Hello World Task", resource, "", "", true)], "Hello World Task", "A simple minimal example of the States language");
            var results = stateMachine.execute();
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("Hello World Task");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Task");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("Hello World Task");
            chai_1.expect(stateMachine.validate()).to.equal(true);
            chai_1.expect(stateMachine.toString()).to.equal('{"StartAt":"Hello World Task", "Version":"1.0", "Comment":"A simple minimal example of the States language", "Hello World Task":{"Type":"Task","Resource":"function () { return 1 + 1; }","End":true}}');
            chai_1.expect(JSON.parse(stateMachine.toString())["StartAt"]).to.equal("Hello World Task");
            chai_1.expect(JSON.parse(stateMachine.toString())["Version"]).to.equal("1.0");
            chai_1.expect(JSON.parse(stateMachine.toString())["Comment"]).to.equal("A simple minimal example of the States language");
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World Task"]["Type"]).to.equal("Task");
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World Task"]["End"]).to.equal(true);
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World Task"]["Resource"]).to.equal("function () { return 1 + 1; }");
            //expect(results[0]).to.equal(2);
        });
    });
    context("3. Add support for state transitions. The state machine representation can now be created\n    with a sequence of states (Pass or Task) with outputs of previous states passing on to\n    the inputs of next states.", function () {
        it('Statemachine w/ a PassState and a TaskState. The PassState returns Hello World. The TaskState returns Hello World, Goodbye single state machines', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myPassState", "HelloWorld", "", "myTaskState", false, "", "$.result")], "myPassState");
            var resource = function (x) {
                return x + ", GoodBye single state machines.";
            };
            stateMachine.addState(new TaskState_1.TaskState("myTaskState", resource, "", "", true, "$.result", "$.result"));
            var json = "{\n          \"first\": 100,\n          \"second\": 200\n        }";
            stateMachine.setInput(json);
            console.log(stateMachine.execute());
        });
    });
});
