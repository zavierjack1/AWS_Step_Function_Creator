import { expect, assert } from 'chai';
import 'mocha';
import { State } from '../../src/state_components/State';
import { MapIterator } from '../../src/state_components/MapIterator';
import { SucceedState } from '../../src/state_components/SucceedState';
import { PassState } from '../../src/state_components/PassState';
import { TaskState } from '../../src/state_components/TaskState';
import { Catcher } from '../../src/state_components/Catcher';

describe('MapIterator Tests', function () {
  context('Constructor Tests', function () {
    it('create a default map Iterator', function () {
      let mapIterator = new MapIterator();
      expect(mapIterator.getStates()).to.eql([]);
      expect(mapIterator.getStartStateName()).to.equal("");
      expect(mapIterator.isValid()).to.equal(false);
    });

    it('create a map Iterator with a startState and empty array', function () {
      let mapIterator = new MapIterator([], "startState");
      expect(mapIterator.getStates()).to.eql([]);
      expect(mapIterator.getStartStateName()).to.equal("startState");
      expect(mapIterator.isValid()).to.equal(false);
    });

    it('create a map Iterator with a startState and array', function () {
      let mapIterator = new MapIterator([new SucceedState("myState")], "myState");
      expect(mapIterator.getStates()).to.eql([new SucceedState("myState")]);
      expect(mapIterator.getStartStateName()).to.equal("myState");
      expect(mapIterator.isValid()).to.equal(true);
    });

    it('create a map Iterator with a bad startState and array', function () {
      let mapIterator = new MapIterator([new SucceedState("myState")], "notStartState");
      expect(mapIterator.getStates()).to.eql([new SucceedState("myState")]);
      expect(mapIterator.getStartStateName()).to.equal("notStartState");
      expect(mapIterator.isValid()).to.equal(false);
    });
  })

  context('states[] Tests', function () {
    it('should return states within machine', function () {
      let states = [new SucceedState("myState")];
      let mapIterator = new MapIterator(states, "");
      expect(mapIterator.getStates()).to.eql(states);
    });

    it('should set states within machine', function () {
      let states = [new SucceedState("myState")];
      let mapIterator = new MapIterator(states, "myState");
      states = [new SucceedState("myState"), new SucceedState("myState2")];
      mapIterator.setStates(states);
      expect(mapIterator.getStates()).to.eql([new SucceedState("myState"), new SucceedState("myState2")]);
    });

    it('should add state to machine', function () {
      let states = [new SucceedState("myState")];
      let mapIterator = new MapIterator(states, "myState");
      mapIterator.addState(new SucceedState("myState2"));
      expect(mapIterator.getStates()).to.eql([new SucceedState("myState"), new SucceedState("myState2")]);
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
});
