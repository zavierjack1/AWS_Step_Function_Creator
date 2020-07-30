import { State }  from '../../src/state_components/State';
import { StateMachine }  from '../../src/state_components/StateMachine';
import { expect, assert } from 'chai';
import 'mocha';

describe('StateMachine Tests', function () {
  context('Constructor Tests', function () {
    it('fails to create a stateMachine states array is length 0', function () {
      let states: State[] = [];
      expect(function () { let stateMachine = new StateMachine(states, "startState") }).to.throw(Error, "states must not be empty");
    });
  })

  context('states[] Tests', function () {
    it('should return states within machine', function () {
      let states = [new State("myState", "myType")];
      let stateMachine = new StateMachine(states, "");
      expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
    });

    it('should set states within machine', function () {
      let states = [new State("myState", "myType")];
      let stateMachine = new StateMachine(states, "myState");
      states = [new State("myState", "myType"), new State("myState2", "myType")];
      stateMachine.setStates(states);
      expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
    });
    /*make test better!!!*/
   it('should return start state', function () {
      let stateMachine = new StateMachine([new State("myState", "myType")], "myState");
      expect(stateMachine.getStartState()).to.equal("myState");
    })
    /*make test better!!!*/
    it('should set start state', function () {
      let stateMachine = new StateMachine([new State("myState", "myType"), new State("myState", "myType")], "myState");
      stateMachine.setStartState("myState");
      expect(stateMachine.getStartState()).to.equal("myState");
    })
  })

  context('Comment Tests', function () {
    it('should return state machine comment', function () {
      expect(new StateMachine([new State("myState", "myType")], "myState", "myComment").getComment()).to.equal("myComment");
    });

    it('should return new state machine comment', function () {
      let stateMachine = new StateMachine([new State("myState", "myType")], "myState");
      stateMachine.setComment("newComment"); 
      expect(stateMachine.getComment()).to.equal("newComment");
    });
  });

  context('Version Tests', function () {
    it('should return state machine version', function () {
      expect(new StateMachine([new State("myState", "myType")], "myState", "myComment").getVersion()).to.equal("1.0");
    });

    it('should return state machine version', function () {
      expect(new StateMachine([new State("myState", "myType")], "myState", "myComment", "2.0").getVersion()).to.equal("2.0");
    });

    it('should return new state machine version', function () {
      let stateMachine = new StateMachine([new State("myState", "myType")], "myState", "myComment");
      stateMachine.setVersion("3.0"); 
      expect(stateMachine.getVersion()).to.equal("3.0");
    });
  });

  context('TimeoutSeconds Tests', function () {
    it('should return state machine TimeoutSeconds', function () {
      expect(new StateMachine([new State("myState", "myType")], "myState", "myComment", "2.0", 10).getTimeoutSeconds()).to.equal(10);
    });

    it('should return new state machine TimeoutSeconds', function () {
      let stateMachine = new StateMachine([new State("myState", "myType")], "myState", "myComment", "2.0", 20);
      stateMachine.setTimeoutSeconds(40); 
      expect(stateMachine.getTimeoutSeconds()).to.equal(40);
    });
  });

  context('Add States', function () {
    it('should add a state to the list of states in the machine and return a false validity', function () {
      let stateMachine = new StateMachine([new State("myState", "myType")], "myState", "myComment", "2.0", 10);
      let validity = stateMachine.addState(new State("myState2", "myType"));
      expect(stateMachine.getStates().length).to.equal(2);
      expect(validity).to.equal(false);
    });

    it('should add a state to the list of states in the machine and return a true validity', function () {
      let stateMachine = new StateMachine([new State("myState", "Succeed")], "myState", "myComment", "2.0", 10);
      let validity = stateMachine.addState(new State("myState2", "myType", "", "myState"));
      expect(stateMachine.getStates().length).to.equal(2);
      expect(validity).to.equal(true);
    });

    it('should add 2 states to the list of states in the machine and return a true validity', function () {
      let stateMachine = new StateMachine([new State("myState", "Succeed")], "myState", "myComment", "2.0", 10);
      stateMachine.addState(new State("myState2", "myType", "", "myState"));
      let validity = stateMachine.addState(new State("myState3", "myType", "", "myState2"));
      expect(stateMachine.getStates().length).to.equal(3);
      expect(validity).to.equal(true);
    });
  });
});
