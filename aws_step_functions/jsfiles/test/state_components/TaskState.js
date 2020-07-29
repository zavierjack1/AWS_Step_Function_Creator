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
    context('NextState Tests', function () {
        it('should return the next state', function () {
            var resource = function () {
                console.log("helloworld");
            };
            chai_1.expect(new TaskState_1.TaskState("myName", resource, "myComment", "myNextState").getNextState()).equal("myNextState");
        });
        it('should return new next state', function () {
            var resource = function () {
                console.log("helloworld");
            };
            var state = new TaskState_1.TaskState("myName", resource, "myComment", "myNextState");
            state.setNextState("newNextState");
            chai_1.expect(state.getNextState()).to.equal("newNextState");
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
    context('Resource Tests', function () {
        it('should return "test"', function () {
            var resource = function () {
                return "test";
            };
            var taskState = new TaskState_1.TaskState("myName", resource, "myComment");
            taskState.setResource(resource);
            chai_1.expect(taskState.simulate()).to.equal("test");
        });
        it('should return undefined', function () {
            var resource = function () {
                var test = 1 + 1;
            };
            var taskState = new TaskState_1.TaskState("myName", resource, "myComment");
            taskState.setResource(resource);
            chai_1.expect(taskState.simulate()).to.equal(undefined);
        });
    });
});
