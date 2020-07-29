"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../../src/state_components/State");
var StateMachine_1 = require("../../src/state_components/StateMachine");
var chai_1 = require("chai");
require("mocha");
describe('StateMachine Tests', function () {
    context('Constructor Tests', function () {
        it('fails to create a stateMachine states array is length 0', function () {
            var states = [];
            chai_1.expect(function () { var stateMachine = new StateMachine_1.StateMachine(states, 0); }).to.throw(Error, "states must not be empty");
        });
    });
    context('states[] Tests', function () {
        it('should return states within machine', function () {
            var states = [new State_1.State("myState", "myType")];
            var stateMachine = new StateMachine_1.StateMachine(states, 0);
            chai_1.expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
        });
        it('should set states within machine', function () {
            var states = [new State_1.State("myState", "myType")];
            var stateMachine = new StateMachine_1.StateMachine(states, 0);
            states = [new State_1.State("myState", "myType"), new State_1.State("myState2", "myType")];
            stateMachine.setStates(states);
            chai_1.expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
        });
        it('should get starting Idx', function () {
            var stateMachine = new StateMachine_1.StateMachine([new State_1.State("myState", "myType")], 0);
            chai_1.expect(stateMachine.getStartIdx()).to.equal(0);
        });
        it('should set starting idx', function () {
            var stateMachine = new StateMachine_1.StateMachine([new State_1.State("myState", "myType"), new State_1.State("myState", "myType")], 0);
            stateMachine.setStartIdx(1);
            chai_1.expect(stateMachine.getStartIdx()).to.equal(1);
        });
        it('should fail to set index out of bounds', function () {
            chai_1.expect(function () {
                var stateMachine = new StateMachine_1.StateMachine([new State_1.State("myState", "myType"), new State_1.State("myState", "myType")], 0);
                stateMachine.setStartIdx(2);
            }).to.throw(Error, "startIdx must be within array of states");
        });
    });
    context('Comment Tests', function () {
        it('should return state machine comment', function () {
            chai_1.expect(new StateMachine_1.StateMachine([new State_1.State("myState", "myType")], 0, "myComment").getComment()).to.equal("myComment");
        });
        it('should return new state machine comment', function () {
            var stateMachine = new StateMachine_1.StateMachine([new State_1.State("myState", "myType")], 0);
            stateMachine.setComment("newComment");
            chai_1.expect(stateMachine.getComment()).to.equal("newComment");
        });
    });
    context('Version Tests', function () {
        it('should return state machine version', function () {
            chai_1.expect(new StateMachine_1.StateMachine([new State_1.State("myState", "myType")], 0, "myComment").getVersion()).to.equal("1.0");
        });
        it('should return state machine version', function () {
            chai_1.expect(new StateMachine_1.StateMachine([new State_1.State("myState", "myType")], 0, "myComment", "2.0").getVersion()).to.equal("2.0");
        });
        it('should return new state machine version', function () {
            var stateMachine = new StateMachine_1.StateMachine([new State_1.State("myState", "myType")], 0, "myComment");
            stateMachine.setVersion("3.0");
            chai_1.expect(stateMachine.getVersion()).to.equal("3.0");
        });
    });
    context('TimeoutSeconds Tests', function () {
        it('should return state machine TimeoutSeconds', function () {
            chai_1.expect(new StateMachine_1.StateMachine([new State_1.State("myState", "myType")], 0, "myComment", "2.0", 10).getTimeoutSeconds()).to.equal(10);
        });
        it('should return new state machine TimeoutSeconds', function () {
            var stateMachine = new StateMachine_1.StateMachine([new State_1.State("myState", "myType")], 0, "myComment", "2.0", 20);
            stateMachine.setTimeoutSeconds(40);
            chai_1.expect(stateMachine.getTimeoutSeconds()).to.equal(40);
        });
    });
});
