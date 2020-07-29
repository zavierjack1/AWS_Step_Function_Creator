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
        let stateMachine = new StateMachine([new State("myState", "myType")], 0);
        expect(stateMachine.getStates()[0].getName()).to.equal("myState");
        expect(stateMachine.getStates()[0].getType()).to.equal("myType");
        expect(stateMachine.getStartIdx()).to.equal(0);
      });

    it('should create a State Machine w/ a Pass state using the PassState class', 
    function () {
        let stateMachine = new StateMachine([new PassState("myState")], 0);
        expect(stateMachine.getStates()[0].getName()).to.equal("myState");
        expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
        expect(stateMachine.getStartIdx()).to.equal(0);
    });
  })
});