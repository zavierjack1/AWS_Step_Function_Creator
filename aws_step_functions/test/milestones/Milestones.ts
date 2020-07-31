import { State }  from '../../src/state_components/State';
import { PassState }  from '../../src/state_components/PassState';
import { StateMachine }  from '../../src/state_components/StateMachine';
import { expect, assert } from 'chai';
import 'mocha';
describe('Milestones', function () {
  context('Create/compile/simulate a state machine consisting of a single Pass state. No'||
  'input/output processing, parameters, result/result path, or error handling support', 
  function () {
    it('should create a State Machine w/ a Pass state using State class', 
    function () {
        let stateMachine = new StateMachine([new State("myState", "Succeed")], "myState");
        expect(stateMachine.getStates()[0].getName()).to.equal("myState");
        expect(stateMachine.getStates()[0].getType()).to.equal("Succeed");
        expect(stateMachine.getStartStateName()).to.equal("myState");
        expect(stateMachine.validate()).to.equal(true);
      });

    it('should create a State Machine w/ a Pass state using the PassState class', 
    function () {
        let stateMachine = new StateMachine([new PassState("myState", "result", "comment", "myState2"), new State("myState2", "Succeed")], "myState");
        expect(stateMachine.getStates()[0].getName()).to.equal("myState");
        expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
        expect(stateMachine.getStartStateName()).to.equal("myState");
        expect(stateMachine.validate()).to.equal(true);
    });
  })
});