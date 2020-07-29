import { State }  from '../../src/state_components/State';
import { StateMachine }  from '../../src/state_components/StateMachine';
import { expect, assert } from 'chai';
import 'mocha';

describe('StateMachine Tests', function () {
  context('Constructor Tests', function () {
    it('fails to create a stateMachine states array is length 0', function () {
      let states: State[] = [];
      expect(function () { let stateMachine = new StateMachine(states, 0) }).to.throw(Error, "states must not be empty");
    });
  })

  context('states[] Tests', function () {
    it('should return states within machine', function () {
      let states = [new State("myState", "myType")];
      let stateMachine = new StateMachine(states, 0);
      expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
    });

    it('should set states within machine', function () {
      let states = [new State("myState", "myType")];
      let stateMachine = new StateMachine(states, 0);
      states = [new State("myState", "myType"), new State("myState2", "myType")];
      stateMachine.setStates(states);
      expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
    });

    it('should get starting Idx', function () {
      let stateMachine = new StateMachine([new State("myState", "myType")], 0);
      expect(stateMachine.getStartIdx()).to.equal(0);
    })

    it('should set starting idx', function () {
      let stateMachine = new StateMachine([new State("myState", "myType"), new State("myState", "myType")], 0);
      stateMachine.setStartIdx(1);
      expect(stateMachine.getStartIdx()).to.equal(1);
    })

    it('should fail to set index out of bounds', function () {
      expect(function () { 
        let stateMachine = new StateMachine([new State("myState", "myType"), new State("myState", "myType")], 0); 
        stateMachine.setStartIdx(2);  
      }).to.throw(Error, "startIdx must be within array of states");
    })
  })

  context('Comment Tests', function () {
    it('should return state machine comment', function () {
      expect(new StateMachine([new State("myState", "myType")], 0, "myComment").getComment()).to.equal("myComment");
    });

    it('should return new state machine comment', function () {
      let stateMachine = new StateMachine([new State("myState", "myType")], 0);
      stateMachine.setComment("newComment"); 
      expect(stateMachine.getComment()).to.equal("newComment");
    });
  });

  context('Version Tests', function () {
    it('should return state machine version', function () {
      expect(new StateMachine([new State("myState", "myType")], 0, "myComment").getVersion()).to.equal("1.0");
    });

    it('should return state machine version', function () {
      expect(new StateMachine([new State("myState", "myType")], 0, "myComment", "2.0").getVersion()).to.equal("2.0");
    });

    it('should return new state machine version', function () {
      let stateMachine = new StateMachine([new State("myState", "myType")], 0, "myComment");
      stateMachine.setVersion("3.0"); 
      expect(stateMachine.getVersion()).to.equal("3.0");
    });
  });

  context('TimeoutSeconds Tests', function () {
    it('should return state machine TimeoutSeconds', function () {
      expect(new StateMachine([new State("myState", "myType")], 0, "myComment", "2.0", 10).getTimeoutSeconds()).to.equal(10);
    });

    it('should return new state machine TimeoutSeconds', function () {
      let stateMachine = new StateMachine([new State("myState", "myType")], 0, "myComment", "2.0", 20);
      stateMachine.setTimeoutSeconds(40); 
      expect(stateMachine.getTimeoutSeconds()).to.equal(40);
    });
  });
});
