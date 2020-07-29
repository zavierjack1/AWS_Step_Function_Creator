import { State }  from '../../src/state_components/State';
import { PassState }  from '../../src/state_components/PassState';
import { StateMachine }  from '../../src/state_components/StateMachine';
var assert = require('assert'); 
describe('Milestones', function () {
  context('Create/compile/simulate a state machine consisting of a single Pass state. No'||
  'input/output processing, parameters, result/result path, or error handling support', 
  function () {
    it('should create a State Machine w/ a Pass state using State class', 
    function () {
        let stateMachine = new StateMachine([new State("myState", "myType")], 0);
        assert.equal("myState", stateMachine.getStates()[0].getName());
        assert.equal("myType", stateMachine.getStates()[0].getType());
        assert.equal(0, stateMachine.getStartIdx());
      });

    it('should create a State Machine w/ a Pass state using the PassState class', 
    function () {
        let stateMachine = new StateMachine([new PassState("myState")], 0);
        assert.equal("myState", stateMachine.getStates()[0].getName());
        assert.equal("Pass", stateMachine.getStates()[0].getType());
        assert.equal(0, stateMachine.getStartIdx());
    });
  })
});