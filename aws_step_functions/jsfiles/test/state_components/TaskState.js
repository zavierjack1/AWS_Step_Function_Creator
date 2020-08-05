"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskState_1 = require("../../src/state_components/TaskState");
var chai_1 = require("chai");
require("mocha");
describe('TaskState class tests', function () {
    context('Name Tests', function () {
        it('should return name of State', function () {
            var resource = function () {
                console.log("helloworld");
            };
            chai_1.expect(new TaskState_1.TaskState("myName", resource).getName()).to.equal("myName");
        });
        it('should return the newName of State', function () {
            var resource = function () {
                console.log("helloworld");
            };
            var state = new TaskState_1.TaskState("myName", resource);
            state.setName("newName");
            chai_1.expect(state.getName()).to.equal("newName");
        });
        it('fail due too name being > 128', function () {
            var resource = function () {
                console.log("helloworld");
            };
            var name = "";
            for (var i = 0; i < 129; i++) {
                name = name + "a";
            }
            chai_1.expect(function () { var state = new TaskState_1.TaskState(name, resource); }).to.throw(Error, "name must be <= 128 char");
        });
    });
    context('Type Tests', function () {
        it('should return state type', function () {
            var resource = function () {
                console.log("helloworld");
            };
            chai_1.expect(new TaskState_1.TaskState("myName", resource).getType()).to.equal("Task");
        });
    });
    context('Resource Tests', function () {
        it('should return resource', function () {
            var resource = function () {
                console.log("helloworld");
            };
            chai_1.expect(new TaskState_1.TaskState("myName", resource).getType()).to.equal("Task");
        });
    });
    context('Comment Tests', function () {
        it('should return state comment', function () {
            var resource = function () {
                console.log("helloworld");
            };
            chai_1.expect(new TaskState_1.TaskState("myName", resource, "myComment").getComment()).to.equal("myComment");
        });
        it('should return new state comment', function () {
            var resource = function () {
                console.log("helloworld");
            };
            var state = new TaskState_1.TaskState("myName", resource, "myComment");
            state.setComment("newComment");
            chai_1.expect(state.getComment()).to.equal("newComment");
        });
    });
    context('nextStateName Tests', function () {
        it('should return the nextStateName', function () {
            var resource = function () {
                console.log("helloworld");
            };
            chai_1.expect(new TaskState_1.TaskState("myName", resource, "myComment", "myNextState").getNextStateName()).equal("myNextState");
        });
        it('should return new nextStateName', function () {
            var resource = function () {
                console.log("helloworld");
            };
            var state = new TaskState_1.TaskState("myName", resource, "myComment", "myNextState");
            state.setNextStateName("newNextState");
            chai_1.expect(state.getNextStateName()).to.equal("newNextState");
        });
    });
    context('EndStates Tests', function () {
        it('should return end state = false', function () {
            var resource = function () {
                console.log("helloworld");
            };
            chai_1.expect(new TaskState_1.TaskState("myName", resource, "myComment").isEndState()).to.equal(false);
        });
        it('should set end state to true with constructor', function () {
            var resource = function () {
                console.log("helloworld");
            };
            chai_1.expect(new TaskState_1.TaskState("myName", resource, "comment", "", true).isEndState()).to.equal(true);
        });
        it('should set end state true with setState()', function () {
            var resource = function () {
                console.log("helloworld");
            };
            var state = new TaskState_1.TaskState("myName", resource, "comment");
            state.setEndState(true);
            chai_1.expect(state.isEndState()).to.equal(true);
        });
    });
    context('End Tests', function () {
        it('should return end state = false', function () {
            var resource = function () {
                console.log("helloworld");
            };
            chai_1.expect(new TaskState_1.TaskState("myName", resource, "myComment").isEndState()).to.equal(false);
        });
    });
    context('Resource & Execution Tests', function () {
        it('should return "test"', function () {
            var resource = function () {
                return "test";
            };
            var taskState = new TaskState_1.TaskState("myName", resource, "myComment");
            taskState.setResource(resource);
            chai_1.expect(taskState.execute()).to.equal("test");
        });
        it('should return undefined', function () {
            var resource = function () {
                var test = 1 + 1;
            };
            var taskState = new TaskState_1.TaskState("myName", resource, "myComment");
            taskState.setResource(resource);
            chai_1.expect(taskState.execute()).to.equal(undefined);
        });
    });
    context('InputPath Tests', function () {
        it('should set and get inputPath', function () {
            var resource = function () { return 1 + 1; };
            var state = new TaskState_1.TaskState("myName", resource, "myComment");
            state.setInputPath("$.store.book[*].author");
            chai_1.expect(state.getInputPath()).to.equal("$.store.book[*].author");
        });
        it('should fail to validate json', function () {
            var resource = function (x) {
                return x;
            };
            var taskState = new TaskState_1.TaskState("myName", resource, "myComment");
            var json = "invalidJson";
            taskState.setResource(resource);
            taskState.setInputPath("$.store.book[*].author");
            chai_1.expect(function () { taskState.execute(json); }).to.Throw(SyntaxError);
        });
        it('should return list of authors from json', function () {
            var resource = function (x) {
                return x;
            };
            var taskState = new TaskState_1.TaskState("myName", resource, "myComment");
            var json = "{\n          \"store\": {\n              \"book\": [\n                  {\n                      \"category\": \"reference\",\n                      \"author\": \"Nigel Rees\",\n                      \"title\": \"Sayings of the Century\",\n                      \"price\": 8.95\n                  },\n                  {\n                      \"category\": \"fiction\",\n                      \"author\": \"Evelyn Waugh\",\n                      \"title\": \"Sword of Honour\",\n                      \"price\": 12.99\n                  },\n                  {\n                      \"category\": \"fiction\",\n                      \"author\": \"Herman Melville\",\n                      \"title\": \"Moby Dick\",\n                      \"isbn\": \"0-553-21311-3\",\n                      \"price\": 8.99\n                  },\n                  {\n                      \"category\": \"fiction\",\n                      \"author\": \"J. R. R. Tolkien\",\n                      \"title\": \"The Lord of the Rings\",\n                      \"isbn\": \"0-395-19395-8\",\n                      \"price\": 22.99\n                  }\n              ],\n              \"bicycle\": {\n                  \"color\": \"red\",\n                  \"price\": 19.95\n              }\n          },\n          \"expensive\": 10\n        }";
            taskState.setResource(resource);
            taskState.setInputPath("$.store.book[*].author");
            chai_1.expect(taskState.execute(json)).to.eql(['Nigel Rees', 'Evelyn Waugh', 'Herman Melville', 'J. R. R. Tolkien']);
        });
    });
    context('toString test', function () {
        it('should return json of task state', function () {
            var resource = function () { return 1 + 1; };
            var taskState = new TaskState_1.TaskState("myName", resource, "myComment");
            chai_1.expect(taskState.toString()).to.equal('"myName":{"Type":"Task","Resource":"function () { return 1 + 1; }","Comment":"myComment"}');
        });
    });
});
