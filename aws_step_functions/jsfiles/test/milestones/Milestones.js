"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PassState_1 = require("../../src/state_components/PassState");
var TaskState_1 = require("../../src/state_components/TaskState");
var StateMachine_1 = require("../../src/state_components/StateMachine");
var chai_1 = require("chai");
var SucceedState_1 = require("../../src/state_components/SucceedState");
var Catcher_1 = require("../../src/state_components/Catcher");
var MapIterator_1 = require("../../src/state_components/MapIterator");
var MapState_1 = require("../../src/state_components/MapState");
var JsonPath = require('jsonpath');
describe('Milestones', function () {
    context('Milestone 1', function () {
        it('should create a State Machine w/ a Pass state using State class', function () {
            var stateMachine = new StateMachine_1.StateMachine([new SucceedState_1.SucceedState("myState")], "myState");
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("myState");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Succeed");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("myState");
            chai_1.expect(stateMachine.isValid()).to.equal(true);
        });
        it('should create a State Machine w/ a Pass state using the PassState class', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "comment", "myState2"), new SucceedState_1.SucceedState("myState2", "Succeed")], "myState");
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("myState");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("myState");
            chai_1.expect(stateMachine.isValid()).to.equal(true);
            console.log(stateMachine.toString());
            chai_1.expect(JSON.parse(stateMachine.toString())["myState"]["Result"]).to.equal("result");
            chai_1.expect(JSON.parse(stateMachine.toString())["myState"]["Comment"]).to.equal("comment");
            chai_1.expect(JSON.parse(stateMachine.toString())["myState"]["Next"]).to.equal("myState2");
            chai_1.expect(JSON.parse(stateMachine.toString())["myState"]["Type"]).to.equal("Pass");
            chai_1.expect(JSON.parse(stateMachine.toString())["myState2"]["Type"]).to.equal("Succeed");
            chai_1.expect(JSON.parse(stateMachine.toString())["myState2"]["End"]).to.equal(true);
            chai_1.expect(stateMachine.toJSON()["myState"]["Result"]).to.equal("result");
            chai_1.expect(stateMachine.toJSON()["myState"]["Comment"]).to.equal("comment");
            chai_1.expect(stateMachine.toJSON()["myState"]["Next"]).to.equal("myState2");
            chai_1.expect(stateMachine.toJSON()["myState"]["Type"]).to.equal("Pass");
            chai_1.expect(stateMachine.toJSON()["myState2"]["Type"]).to.equal("Succeed");
            chai_1.expect(stateMachine.toJSON()["myState2"]["End"]).to.equal(true);
        });
        it('should create a State Machine w/ a Pass state using the PassState class', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myState", "result", "comment", "myState2"), new SucceedState_1.SucceedState("myState2", "Succeed")], "myState");
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("myState");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("myState");
            chai_1.expect(stateMachine.isValid()).to.equal(true);
        });
        it('HelloWorld single PassState', function () {
            var input = "\n        {\n          \"result\": \"\"\n        }\n      ";
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("Hello World", "Hello World Result", "", "", true, "", "$.result")], "Hello World", "A simple minimal example of the States language");
            stateMachine.execute(input);
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("Hello World");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("Hello World");
            chai_1.expect(stateMachine.isValid()).to.equal(true);
            chai_1.expect(stateMachine.toString()).to.equal('{"StartAt":"Hello World", "Version":"1.0", "Comment":"A simple minimal example of the States language", "Hello World":{"Type":"Pass","Result":"Hello World Result","End":true,"OutputPath":"$.result"}}');
            chai_1.expect(JSON.parse(stateMachine.toString())["StartAt"]).to.equal("Hello World");
            chai_1.expect(JSON.parse(stateMachine.toString())["Version"]).to.equal("1.0");
            chai_1.expect(JSON.parse(stateMachine.toString())["Comment"]).to.equal("A simple minimal example of the States language");
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World"]["Type"]).to.equal("Pass");
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World"]["End"]).to.equal(true);
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World"]["Result"]).to.equal("Hello World Result");
            chai_1.expect(stateMachine.toJSON()["StartAt"]).to.equal("Hello World");
            chai_1.expect(stateMachine.toJSON()["Version"]).to.equal("1.0");
            chai_1.expect(stateMachine.toJSON()["Comment"]).to.equal("A simple minimal example of the States language");
            chai_1.expect(stateMachine.toJSON()["Hello World"]["Type"]).to.equal("Pass");
            chai_1.expect(stateMachine.toJSON()["Hello World"]["End"]).to.equal(true);
            chai_1.expect(stateMachine.toJSON()["Hello World"]["Result"]).to.equal("Hello World Result");
        });
    });
    context('Milestone 2', function () {
        it('HelloWorld single TaskState', function () {
            var resource = function () { return 1 + 1; };
            var stateMachine = new StateMachine_1.StateMachine([new TaskState_1.TaskState("Hello World Task", resource, "", "", true, "", "$.result")], "Hello World Task", "A simple minimal example of the States language");
            var input = "\n        {\n          \"result\": \"\"\n        }\n      ";
            stateMachine.execute(input);
            chai_1.expect(stateMachine.getStates()[0].getName()).to.equal("Hello World Task");
            chai_1.expect(stateMachine.getStates()[0].getType()).to.equal("Task");
            chai_1.expect(stateMachine.getStartStateName()).to.equal("Hello World Task");
            chai_1.expect(stateMachine.isValid()).to.equal(true);
            chai_1.expect(stateMachine.toString()).to.equal('{"StartAt":"Hello World Task", "Version":"1.0", "Comment":"A simple minimal example of the States language", "Hello World Task":{"Type":"Task","Resource":"function () { return 1 + 1; }","End":true,"OutputPath":"$.result"}}');
            chai_1.expect(JSON.parse(stateMachine.toString())["StartAt"]).to.equal("Hello World Task");
            chai_1.expect(JSON.parse(stateMachine.toString())["Version"]).to.equal("1.0");
            chai_1.expect(JSON.parse(stateMachine.toString())["Comment"]).to.equal("A simple minimal example of the States language");
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World Task"]["Type"]).to.equal("Task");
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World Task"]["End"]).to.equal(true);
            chai_1.expect(JSON.parse(stateMachine.toString())["Hello World Task"]["Resource"]).to.equal("function () { return 1 + 1; }");
            chai_1.expect(stateMachine.toJSON()["StartAt"]).to.equal("Hello World Task");
            chai_1.expect(stateMachine.toJSON()["Version"]).to.equal("1.0");
            chai_1.expect(stateMachine.toJSON()["Comment"]).to.equal("A simple minimal example of the States language");
            chai_1.expect(stateMachine.toJSON()["Hello World Task"]["Type"]).to.equal("Task");
            chai_1.expect(stateMachine.toJSON()["Hello World Task"]["End"]).to.equal(true);
            chai_1.expect(stateMachine.toJSON()["Hello World Task"]["Resource"]).to.equal("function () { return 1 + 1; }");
        });
    });
    context('Milestone 3', function () {
        it('Statemachine w/ a PassState and a TaskState. The PassState returns Hello World. The TaskState returns Hello World, Goodbye single state machines', function () {
            var stateMachine = new StateMachine_1.StateMachine([new PassState_1.PassState("myPassState", "HelloWorld", "", "myTaskState", false, "", "$.result")], "myPassState");
            var resource = function (x) {
                return x + ", GoodBye single state machines.";
            };
            stateMachine.addState(new TaskState_1.TaskState("myTaskState", resource, "", "", true, "$.result", "$.result"));
            var input = "{\n          \"first\": 100,\n          \"second\": 200,\n          \"result\": \"\"\n        }";
            chai_1.expect(stateMachine.execute(input)["result"]).to.equal("HelloWorld, GoodBye single state machines.");
        });
        it('Statemachine w/ a TaskState1 and a TaskState2. The TaskState1 returns 123. The TaskState2 returns 123abc', function () {
            var resource = function (x) {
                return "123";
            };
            var stateMachine = new StateMachine_1.StateMachine([new TaskState_1.TaskState("TaskState1", resource, "comment", "TaskState2", false, "$.result", "$.result")], "TaskState1");
            resource = function (x) {
                return x + "abc";
            };
            stateMachine.addState(new TaskState_1.TaskState("TaskState2", resource, "", "", true, "$.result", "$.result"));
            var input = "{\n          \"first\": 100,\n          \"second\": 200,\n          \"result\": \"\"\n        }";
            chai_1.expect(stateMachine.execute(input)["result"]).to.equal("123abc");
        });
        it('Statemachine w/ a TaskState1 and a TaskState2. The TaskState1 returns 100. The TaskState2 returns 200', function () {
            var resource = function (x) {
                return x;
            };
            var stateMachine = new StateMachine_1.StateMachine([new TaskState_1.TaskState("TaskState1", resource, "comment", "TaskState2", false, "$.param1", "$.result1")], "TaskState1");
            var resource2 = function (x) {
                return x;
            };
            stateMachine.addState(new TaskState_1.TaskState("TaskState2", resource2, "", "", true, "$.param2", "$.result2"));
            var input = "{\n          \"param1\": 100,\n          \"param2\": 200,\n          \"result1\": \"\",\n          \"result2\": \"\"\n        }";
            chai_1.expect(stateMachine.execute(input)["result1"]).to.eql([100]);
            chai_1.expect(stateMachine.execute(input)["result2"]).to.eql([200]);
        });
    });
    context('Milestone 4', function () {
        it('myState->Error->myState2->Error->myState3(only reachable via error)->Success', function () {
            var resource = function () {
                throw new Error("resource error");
            };
            var resource2 = function () {
                throw new Error("resource error 2");
            };
            var resource3 = function () {
                return "abcde";
            };
            var catcher1 = new Catcher_1.Catcher("myState2");
            var catcher2 = new Catcher_1.Catcher("myState3");
            var stateMachine = new StateMachine_1.StateMachine([
                new TaskState_1.TaskState("myState", resource, "xyz", "myEnd", false, "", "", [catcher1]),
                new TaskState_1.TaskState("myState2", resource2, "xyz", "myEnd", false, "", "", [catcher2]),
                new SucceedState_1.SucceedState("myEnd"),
                new TaskState_1.TaskState("myState3", resource3, "xyz", "myEnd", false, "", "$.result")
            ], "myState", "myComment", "2.0", 10);
            chai_1.expect(stateMachine.isValid()).to.equal(true);
            chai_1.expect(stateMachine.execute('{"result":""}')).to.eql({ "result": "abcde" });
        });
        it('myState->Error->myState2->myState1->Success', function () {
            var resource = function (param) {
                if (param < 1)
                    throw new Error("resource error");
                return Number(param) + 1;
            };
            var resource2 = function () {
                return 1;
            };
            var resource3 = function () {
                return 5;
            };
            var catcher1 = new Catcher_1.Catcher("myState2");
            var catcher2 = new Catcher_1.Catcher("myState3");
            var stateMachine = new StateMachine_1.StateMachine([
                new TaskState_1.TaskState("myState", resource, "xyz", "myEnd", false, "$.param1", "$.param1", [catcher1]),
                new TaskState_1.TaskState("myState2", resource2, "xyz", "myState", false, "", "$.param1", [catcher2]),
                new SucceedState_1.SucceedState("myEnd"),
                new TaskState_1.TaskState("myState3", resource3, "xyz", "myEnd", false, "", "$.result")
            ], "myState", "myComment", "2.0", 10);
            chai_1.expect(stateMachine.isValid()).to.equal(true);
            chai_1.expect(stateMachine.execute('{"param1": 0, "result":""}')).to.eql({ "param1": 2, "result": "" });
        });
    });
    context('Milestone 5', function () {
        var mapStateInputJson = "{\n        \"ship-date\": \"2016-03-14T01:59:00Z\",\n        \"detail\": {\n          \"delivery-partner\": \"UQS\",\n          \"shipped\": [\n            { \"prod\": \"R31\", \"dest-code\": 9511, \"quantity\": 1344, \"result\": \"\" },\n            { \"prod\": \"S39\", \"dest-code\": 9511, \"quantity\": 40, \"result\": \"\" },\n            { \"prod\": \"R31\", \"dest-code\": 9833, \"quantity\": 12, \"result\": \"\" },\n            { \"prod\": \"R40\", \"dest-code\": 9860, \"quantity\": 887, \"result\": \"\" },\n            { \"prod\": \"R40\", \"dest-code\": 9511, \"quantity\": 1220, \"result\": \"\" }\n          ]\n        },\n        \"result\": \"\"\n      }";
        it('Basic MapState', function () {
            var json = mapStateInputJson;
            var resource = function (x) {
                console.log(x);
                return x;
            };
            var mapIterator = new MapIterator_1.MapIterator([new TaskState_1.TaskState("myTaskState", resource, "", "", true, "$.prod", "$.result")], "myTaskState");
            var mapState = new MapState_1.MapState("myName", mapIterator, "myComment");
            mapState.setInputPath("$.detail.shipped");
            chai_1.expect(JsonPath.query(mapState.execute(json), '$.detail.shipped')).to.eql([
                [
                    { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: ["R31"] },
                    { prod: 'S39', 'dest-code': 9511, quantity: 40, result: ["S39"] },
                    { prod: 'R31', 'dest-code': 9833, quantity: 12, result: ["R31"] },
                    { prod: 'R40', 'dest-code': 9860, quantity: 887, result: ["R40"] },
                    { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: ["R40"] }
                ]
            ]);
        });
        it('concat 123 to prod', function () {
            var json = mapStateInputJson;
            var resource = function (x) {
                return x + 123;
            };
            var mapIterator = new MapIterator_1.MapIterator([new TaskState_1.TaskState("myTaskState", resource, "", "", true, "$.prod", "$.result")], "myTaskState");
            var mapState = new MapState_1.MapState("myName", mapIterator, "myComment");
            mapState.setInputPath("$.detail.shipped");
            chai_1.expect(JsonPath.query(mapState.execute(json), '$.detail.shipped')).to.eql([
                [
                    { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: "R31123" },
                    { prod: 'S39', 'dest-code': 9511, quantity: 40, result: "S39123" },
                    { prod: 'R31', 'dest-code': 9833, quantity: 12, result: "R31123" },
                    { prod: 'R40', 'dest-code': 9860, quantity: 887, result: "R40123" },
                    { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: "R40123" }
                ]
            ]);
        });
        it('should set quantity field to 5x', function () {
            var json = mapStateInputJson;
            var resource = function (x) {
                return Number(x) * 5;
            };
            var mapIterator = new MapIterator_1.MapIterator([new TaskState_1.TaskState("myTaskState", resource, "", "", true, "$.quantity", "$.result")], "myTaskState");
            var mapState = new MapState_1.MapState("myName", mapIterator, "myComment");
            mapState.setResource(resource);
            mapState.setInputPath("$.detail.shipped");
            chai_1.expect(JsonPath.query(mapState.execute(json), '$.detail.shipped')).to.eql([
                [
                    { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: 6720 },
                    { prod: 'S39', 'dest-code': 9511, quantity: 40, result: 200 },
                    { prod: 'R31', 'dest-code': 9833, quantity: 12, result: 60 },
                    { prod: 'R40', 'dest-code': 9860, quantity: 887, result: 4435 },
                    { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: 6100 }
                ]
            ]);
        });
        it('create a state machine with a map state inside', function () {
            var json = mapStateInputJson;
            var resource = function (x) {
                return Number(x) * 5;
            };
            var mapIterator = new MapIterator_1.MapIterator([new TaskState_1.TaskState("myTaskState", resource, "", "", true, "$.quantity", "$.result")], "myTaskState");
            var mapState = new MapState_1.MapState("myState", mapIterator, "myComment", "", true);
            mapState.setResource(resource);
            mapState.setInputPath("$.detail.shipped");
            chai_1.expect(JsonPath.query(mapState.execute(json), '$.detail.shipped')).to.eql([
                [
                    { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: 6720 },
                    { prod: 'S39', 'dest-code': 9511, quantity: 40, result: 200 },
                    { prod: 'R31', 'dest-code': 9833, quantity: 12, result: 60 },
                    { prod: 'R40', 'dest-code': 9860, quantity: 887, result: 4435 },
                    { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: 6100 }
                ]
            ]);
            var stateMachine = new StateMachine_1.StateMachine([mapState], "myState");
            console.log(stateMachine.toString());
        });
    });
});
