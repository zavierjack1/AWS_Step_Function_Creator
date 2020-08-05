import { State }  from '../../src/state_components/State';
import { PassState }  from '../../src/state_components/PassState';
import { TaskState }  from '../../src/state_components/TaskState';
import { StateMachine }  from '../../src/state_components/StateMachine';
import { expect, assert } from 'chai';
import 'mocha';
import { SucceedState } from '../../src/state_components/SucceedState';

describe('StateMachine Tests', function () {
  context('Constructor Tests', function () {
    it('fails to create a stateMachine states array is length 0', function () {
      let states: State[] = [];
      expect(function () { let stateMachine = new StateMachine(states, "startState") }).to.throw(Error, "states must not be empty");
    });
  })

  context('states[] Tests', function () {
    it('should return states within machine', function () {
      let states = [new SucceedState("myState")];
      let stateMachine = new StateMachine(states, "");
      expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
    });

    it('should set states within machine', function () {
      let states = [new SucceedState("myState")];
      let stateMachine = new StateMachine(states, "myState");
      states = [new SucceedState("myState"), new SucceedState("myState2")];
      stateMachine.setStates(states);
      expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
    });

    it('should add state to machine', function () {
      let states = [new SucceedState("myState")];
      let stateMachine = new StateMachine(states, "myState");
      stateMachine.addState(new SucceedState("myState2"));
      expect(JSON.stringify(stateMachine.getStates())).to.equal(JSON.stringify(states));
    });

    it('should fail to add non-unique stateName to machine', function () {
      let states = [new SucceedState("myState")];
      let stateMachine = new StateMachine(states, "myState");
      stateMachine.addState(new SucceedState("myState2"));
      expect(function () {stateMachine.addState(new SucceedState("myState2"))}).to.Throw(Error, "State names must be unique");
    });
  })

  context('startState tests', function () {
   it('should return start state', function () {
      let stateMachine = new StateMachine([new SucceedState("myState"), new SucceedState("myState2")], "myState");
      expect(stateMachine.getStartStateName()).to.equal("myState");
    })
    it('should set start state', function () {
      let stateMachine = new StateMachine([new SucceedState("myState"), new SucceedState("myState2")], "myState");
      stateMachine.setStartStateName("myState2");
      expect(stateMachine.getStartStateName()).to.equal("myState2");
    })
  })

  context('Comment Tests', function () {
    it('should return state machine comment', function () {
      expect(new StateMachine([new SucceedState("myState")], "myState", "myComment").getComment()).to.equal("myComment");
    });

    it('should return new state machine comment', function () {
      let stateMachine = new StateMachine([new SucceedState("myState")], "myState");
      stateMachine.setComment("newComment"); 
      expect(stateMachine.getComment()).to.equal("newComment");
    });
  });

  context('Version Tests', function () {
    it('should return state machine version', function () {
      expect(new StateMachine([new SucceedState("myState")], "myState", "myComment").getVersion()).to.equal("1.0");
    });

    it('should return state machine version', function () {
      expect(new StateMachine([new SucceedState("myState")], "myState", "myComment", "2.0").getVersion()).to.equal("2.0");
    });

    it('should return new state machine version', function () {
      let stateMachine = new StateMachine([new SucceedState("myState")], "myState", "myComment");
      stateMachine.setVersion("3.0"); 
      expect(stateMachine.getVersion()).to.equal("3.0");
    });
  });

  context('TimeoutSeconds Tests', function () {
    it('should return state machine TimeoutSeconds', function () {
      expect(new StateMachine([new SucceedState("myState")], "myState", "myComment", "2.0", 10).getTimeoutSeconds()).to.equal(10);
    });

    it('should return new state machine TimeoutSeconds', function () {
      let stateMachine = new StateMachine([new SucceedState("myState")], "myState", "myComment", "2.0", 20);
      stateMachine.setTimeoutSeconds(40); 
      expect(stateMachine.getTimeoutSeconds()).to.equal(40);
    });
  });

  context('Add States', function () {
    it('should add a state to the list of states in the machine and return a false validity', function () {
      let stateMachine = new StateMachine([new SucceedState("myState")], "myState", "myComment", "2.0", 10);
      let validity = stateMachine.addState(new PassState("myState2", "result", "not a terminal state", undefined, false));
      expect(stateMachine.getStates().length).to.equal(2);
      expect(validity).to.equal(false);
    });

    it('should add a state to the list of states in the machine and return a true validity', function () {
      let stateMachine = new StateMachine([new SucceedState("myState")], "myState", "myComment", "2.0", 10);
      let validity = stateMachine.addState(new SucceedState("myState2"));
      expect(stateMachine.getStates().length).to.equal(2);
      expect(validity).to.equal(true);
    });

    it('should add 2 states to the list of states in the machine and return a true validity', function () {
      let stateMachine = new StateMachine([new SucceedState("myState")], "myState", "myComment", "2.0", 10);
      stateMachine.addState(new SucceedState("myState2"));
      let validity = stateMachine.addState(new SucceedState("myState3"));
      expect(stateMachine.getStates().length).to.equal(3);
      expect(validity).to.equal(true);
    });
  });

  context('execute statemachine', function () {
    it('should simulate statemachine with single pass state', function () {
      let stateMachine = new StateMachine([new PassState("myState", "result", "xyz", "", true)], "myState", "myComment", "2.0", 10);
      expect(stateMachine.validate()).to.equal(true);
      expect(stateMachine.execute()[0]).to.equal("result");
    });

    it('should simulate statemachine with single pass state and succeed state', function () {
      let stateMachine = new StateMachine([new PassState("myState", "result", "xyz", "EndState")], "myState", "myComment", "2.0", 10);
      let state = new SucceedState("EndState");
      stateMachine.addState(state);
      expect(stateMachine.validate()).to.equal(true);
      expect(stateMachine.execute()[0]).to.equal("result");
    });

    it('should simulate statemachine with a single task state', function () {
      let resource = function (){
        return 1+1;
      }
      let stateMachine = new StateMachine([new TaskState("myState", resource, "xyz", "EndState")], "myState", "myComment", "2.0", 10);
      let state = new SucceedState("EndState");
      stateMachine.addState(state);
      expect(stateMachine.validate()).to.equal(true);
      expect(stateMachine.execute()[0]).to.equal(2);
    });
  })

  context('toString statemachine', function () {
    it('should print statemachine', function () {
      let stateMachine = new StateMachine([new PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
      let state = new SucceedState("EndState");
      stateMachine.addState(state);
      expect(JSON.parse(stateMachine.toString())['myState']['Type']).to.equal("Pass");
      expect(JSON.parse(stateMachine.toString())['myState']['Result']).to.equal("result");
      expect(JSON.parse(stateMachine.toString())['myState']['Comment']).to.equal("xyz");
      expect(JSON.parse(stateMachine.toString())['myState']['End']).to.equal(true);
    });
  })

  context('Input Test', function () {
    it('should fail to validate input JSON', function () {
      let stateMachine = new StateMachine([new PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
      expect(function () {stateMachine.setInput("abcd")}).to.throw(SyntaxError);
    });

    it('should validate & add input JSON', function () {
      let stateMachine = new StateMachine([new PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
      stateMachine.setInput('{"test" : "abcd"}');
      expect(stateMachine.getInput()).to.equal('{"test" : "abcd"}');
    });
  })
});
