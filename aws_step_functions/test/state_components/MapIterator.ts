import { expect, assert } from 'chai';
import 'mocha';
import { MapIterator } from '../../src/state_components/MapIterator';
import { SucceedState } from '../../src/state_components/SucceedState';
import { PassState } from '../../src/state_components/PassState';
import { TaskState } from '../../src/state_components/TaskState';
import { Catcher } from '../../src/state_components/Catcher';
import { State } from '../../src/state_components/State';

describe('MapIterator Tests', function () {

  context('Constructor Tests', function () {
    it('fails to create a mapIterator states array is length 0', function () {
      let states: State[] = [];
      expect(function () { let mapIterator = new MapIterator(states, "startState") }).to.throw(Error, "states must not be empty");
    });
  })

  context('states[] Tests', function () {
    it('should return states within machine', function () {
      let states = [new SucceedState("myState")];
      let mapIterator = new MapIterator(states, "");
      expect(JSON.stringify(mapIterator.getStates())).to.equal(JSON.stringify(states));
    });

    it('should set states within machine', function () {
      let states = [new SucceedState("myState")];
      let mapIterator = new MapIterator(states, "myState");
      states = [new SucceedState("myState"), new SucceedState("myState2")];
      mapIterator.setStates(states);
      expect(JSON.stringify(mapIterator.getStates())).to.equal(JSON.stringify(states));
    });

    it('should add state to machine', function () {
      let states = [new SucceedState("myState")];
      let mapIterator = new MapIterator(states, "myState");
      mapIterator.addState(new SucceedState("myState2"));
      expect(JSON.stringify(mapIterator.getStates())).to.equal(JSON.stringify(states));
    });

    it('should fail to add non-unique stateName to machine', function () {
      let states = [new SucceedState("myState")];
      let mapIterator = new MapIterator(states, "myState");
      mapIterator.addState(new SucceedState("myState2"));
      expect(function () {mapIterator.addState(new SucceedState("myState2"))}).to.Throw(Error, "State names must be unique");
    });
  })

  context('startState tests', function () {
   it('should return start state', function () {
      let mapIterator = new MapIterator([new SucceedState("myState"), new SucceedState("myState2")], "myState");
      expect(mapIterator.getStartStateName()).to.equal("myState");
    })
    it('should set start state', function () {
      let mapIterator = new MapIterator([new SucceedState("myState"), new SucceedState("myState2")], "myState");
      mapIterator.setStartStateName("myState2");
      expect(mapIterator.getStartStateName()).to.equal("myState2");
    })
  })

  context('Comment Tests', function () {
    it('should return state machine comment', function () {
      expect(new MapIterator([new SucceedState("myState")], "myState", "myComment").getComment()).to.equal("myComment");
    });

    it('should return new state machine comment', function () {
      let mapIterator = new MapIterator([new SucceedState("myState")], "myState");
      mapIterator.setComment("newComment"); 
      expect(mapIterator.getComment()).to.equal("newComment");
    });
  });

  context('Version Tests', function () {
    it('should return state machine version', function () {
      expect(new MapIterator([new SucceedState("myState")], "myState", "myComment").getVersion()).to.equal("1.0");
    });

    it('should return state machine version', function () {
      expect(new MapIterator([new SucceedState("myState")], "myState", "myComment", "2.0").getVersion()).to.equal("2.0");
    });

    it('should return new state machine version', function () {
      let mapIterator = new MapIterator([new SucceedState("myState")], "myState", "myComment");
      mapIterator.setVersion("3.0"); 
      expect(mapIterator.getVersion()).to.equal("3.0");
    });
  });

  context('TimeoutSeconds Tests', function () {
    it('should return state machine TimeoutSeconds', function () {
      expect(new MapIterator([new SucceedState("myState")], "myState", "myComment", "2.0", 10).getTimeoutSeconds()).to.equal(10);
    });

    it('should return new state machine TimeoutSeconds', function () {
      let mapIterator = new MapIterator([new SucceedState("myState")], "myState", "myComment", "2.0", 20);
      mapIterator.setTimeoutSeconds(40); 
      expect(mapIterator.getTimeoutSeconds()).to.equal(40);
    });
  });

  context('Add States', function () {
    it('should add a state to the list of states in the machine and return a false validity', function () {
      let mapIterator = new MapIterator([new SucceedState("myState")], "myState", "myComment", "2.0", 10);
      let validity = mapIterator.addState(new PassState("myState2", "result", "not a terminal state", undefined, false));
      expect(mapIterator.getStates().length).to.equal(2);
      expect(validity).to.equal(false);
    });

    it('should add a state to the list of states in the machine and return a true validity', function () {
      let mapIterator = new MapIterator([new SucceedState("myState")], "myState", "myComment", "2.0", 10);
      let validity = mapIterator.addState(new SucceedState("myState2"));
      expect(mapIterator.getStates().length).to.equal(2);
      expect(validity).to.equal(true);
    });

    it('should add 2 states to the list of states in the machine and return a true validity', function () {
      let mapIterator = new MapIterator([new SucceedState("myState")], "myState", "myComment", "2.0", 10);
      mapIterator.addState(new SucceedState("myState2"));
      let validity = mapIterator.addState(new SucceedState("myState3"));
      expect(mapIterator.getStates().length).to.equal(3);
      expect(validity).to.equal(true);
    });
  });

  context('isValid tests', function () {
    it('create a map Iterator with invalid startname', function () {
      let mapIterator = new MapIterator([new PassState("myState", "test", "", "myState2"), new SucceedState("myState2")], "myState100000");
      expect(mapIterator.getStates()).to.eql([new PassState("myState", "test", "", "myState2"), new SucceedState("myState2")]);
      expect(mapIterator.getStartStateName()).to.equal("myState100000");
      expect(mapIterator.validateStartStateName()).to.equal(false);
    });

    it('create a map Iterator with valid startname and next states', function () {
      let mapIterator = new MapIterator([new PassState("myState", "test", "", "myState2"), new SucceedState("myState2")], "myState");
      expect(mapIterator.getStates()).to.eql([new PassState("myState", "test", "", "myState2"), new SucceedState("myState2")]);
      expect(mapIterator.getStartStateName()).to.equal("myState");
      expect(mapIterator.validateNextStates()).to.equal(true);
      expect(mapIterator.validateStartStateName()).to.equal(true);
    });

    it('create a map Iterator with valid startname and invalid next states', function () {
      let mapIterator = new MapIterator([new PassState("myState", "test", "", "myState1000"), new SucceedState("myState2")], "myState");
      expect(mapIterator.getStartStateName()).to.equal("myState");
      expect(mapIterator.validateNextStates()).to.equal(false);
      expect(mapIterator.validateStartStateName()).to.equal(true);
    });

    it('create a map Iterator with valid startname and next states and catch states', function () {
      let mapIterator = new MapIterator([new TaskState("myState", function(){return true;}, "", "myState2", false, "", "", [new Catcher("myState2")]), new SucceedState("myState2")], "myState");
      expect(mapIterator.getStartStateName()).to.equal("myState");
      expect(mapIterator.validateNextStates()).to.equal(true);
      expect(mapIterator.validateStartStateName()).to.equal(true);
      expect(mapIterator.validateCatchNextStates()).to.equal(true);
    });

    it('create a map Iterator with valid startname and next states and invalid catch states', function () {
      let mapIterator = new MapIterator([new TaskState("myState", function(){return true;}, "", "myState2", false, "", "", [new Catcher("myState5")]), new SucceedState("myState2")], "myState");
      expect(mapIterator.getStartStateName()).to.equal("myState");
      expect(mapIterator.validateNextStates()).to.equal(true);
      expect(mapIterator.validateStartStateName()).to.equal(true);
      expect(mapIterator.validateCatchNextStates()).to.equal(false);
    });
   })

  context('execute mapiterator', function () {
    it('should fail mapiterator validation', function () {
      let mapIterator = new MapIterator([new PassState("myState", "result", "xyz", "", false)], "myState", "myComment", "2.0", 10);
      let input = `{
        "result": ""
      }`;
      expect(function () {mapIterator.execute(input)}).to.throw("this stateMachine is invalid!");
    });
    
    it('Statemachine w/ a PassState. The PassState returns Hello World.', 
    function () {
      let mapIterator = new MapIterator([new PassState("myPassState", "HelloWorld", "", "myTaskState", true, "", "$.result")], "myPassState");
      let input = `{
          "first": 100,
          "second": 200,
          "result": ""
        }`;
      expect(mapIterator.execute(input)["result"]).to.equal("HelloWorld");
    });
    
    it('Statemachine w/ a PassState. The PassState returns Hello World.', 
    function () {
      let mapIterator = new MapIterator([new PassState("myPassState", "HelloWorld", "", "myTaskState", true, "", "$.result")], "myPassState");
      let input = `{
        "result": ""
      }`;
      expect(mapIterator.execute(input)["result"]).to.equal("HelloWorld");
    });

    it('should simulate mapiterator with single pass state and succeed state', function () {
      let mapIterator = new MapIterator([new PassState("myState", "result", "xyz", "EndState")], "myState", "myComment", "2.0", 10);
      let state = new SucceedState("EndState");
      mapIterator.addState(state);
      expect(mapIterator.isValid()).to.equal(true);
      expect(mapIterator.execute('{"result":""}')).to.eql({"result":""});
    });

    it('should simulate mapiterator with a single task state', function () {
      let resource = function (){
        return 1+1;
      }
      let mapIterator = new MapIterator([new TaskState("myState", resource, "xyz", "EndState", false, "", "$.result")], "myState", "myComment", "2.0", 10);
      let state = new SucceedState("EndState");
      mapIterator.addState(state);
      expect(mapIterator.isValid()).to.equal(true);
      expect(mapIterator.execute('{"result":""}')).to.eql({"result":2});
    });

    it('should simulate mapiterator with error', function () {
      let resource = function (){
        throw new Error("resource error");
      }
      let catcher = new Catcher("myEnd");
      let mapIterator = new MapIterator(
        [
          new TaskState("myState", resource, "xyz", "myEnd",false, "","", [catcher]),
          new SucceedState("myEnd")
        ], "myState", "myComment", "2.0", 10);
      expect(mapIterator.isValid()).to.equal(true);
      expect(mapIterator.execute('{"result":""}')).to.eql({"result":""});
    });

    it('should simulate mapiterator with error', function () {
      let resource = function (){
        throw new Error("resource error");
      }
      let catcher = new Catcher("myEnd");
      let mapIterator = new MapIterator(
        [
          new TaskState("myState", resource, "xyz", "myEnd",false, "","", [catcher]),
          new SucceedState("myEnd")
        ], "myState", "myComment", "2.0", 10);
      expect(mapIterator.isValid()).to.equal(true);
      expect(mapIterator.execute('{"result":""}')).to.eql({"result":""});
    });

    it('myState->Error->myState2->myEnd', function () {
      let resource = function (){
        throw new Error("resource error");
      }

      let resource2 = function (){
        return "abcde";
      }
      let catcher = new Catcher("myState2");
      let mapIterator = new MapIterator(
        [
          new TaskState("myState", resource, "xyz", "myEnd",false, "","", [catcher]),
          new SucceedState("myEnd"), 
          new TaskState("myState2", resource2, "xyz", "myEnd",false, "","$.result")
        ], "myState", "myComment", "2.0", 10);
      expect(mapIterator.isValid()).to.equal(true);
      expect(mapIterator.execute('{"result":""}')).to.eql({"result":"abcde"});
    });

    it('should simulate mapiterator that fails validation because catcher points to non-existent state', function () {
      let resource = function (){
        throw new Error("resource error");
      }

      let resource2 = function (){
        return "abcde";
      }
      let catcher = new Catcher("NOT_REAL");
      let mapIterator = new MapIterator(
        [
          new TaskState("myState", resource, "xyz", "myEnd",false, "","", [catcher]),
          new SucceedState("myEnd"), 
          new TaskState("myState2", resource2, "xyz", "myEnd",false, "","$.result")
        ], "myState", "myComment", "2.0", 10);
      expect(mapIterator.isValid()).to.equal(false);
    });
  })
  
  context('toString mapiterator', function () {
    it('should print mapiterator', function () {
      let mapIterator = new MapIterator([new PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
      let state = new SucceedState("EndState");
      mapIterator.addState(state);
      expect(JSON.parse(mapIterator.toString())['myState']['Type']).to.equal("Pass");
      expect(JSON.parse(mapIterator.toString())['myState']['Result']).to.equal("result");
      expect(JSON.parse(mapIterator.toString())['myState']['Comment']).to.equal("xyz");
      expect(JSON.parse(mapIterator.toString())['myState']['End']).to.equal(true);
    });
  })

  context('toJSON mapiterator', function () {
    it('should return mapiterator JSON', function () {
      let mapIterator = new MapIterator([new PassState("myState", "result", "xyz", "EndState", true)], "myState", "myComment", "2.0", 10);
      let state = new SucceedState("EndState");
      mapIterator.addState(state);
      expect(mapIterator.toJSON()['myState']['Type']).to.equal("Pass");
      expect(mapIterator.toJSON()['myState']['Result']).to.equal("result");
      expect(mapIterator.toJSON()['myState']['Comment']).to.equal("xyz");
      expect(mapIterator.toJSON()['myState']['End']).to.equal(true);
    });
  })
});
