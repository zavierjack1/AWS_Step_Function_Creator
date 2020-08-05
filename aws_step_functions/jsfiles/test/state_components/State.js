"use strict";
/*
import { State }  from '../../src/state_machine_components/State';
import { expect, assert } from 'chai';
import 'mocha';

describe('State class tests', function () {
  context('Name Tests', function () {
    it('should return name of State', function () {
      expect(new State("myName", "myType").getName()).to.equal("myName");
    });

    it('should return the newName of State', function () {
      let state = new State("myName", "myType");
      state.setName("newName");
      expect(state.getName()).equal("newName");
    });

    it('fail due too name being > 128', function () {
      let name = "";
      for (let i = 0; i < 129; i++){
        name = name+"a";
      }
      expect(function () { let state = new State(name, "myType") }).to.Throw(Error, "name must be <= 128 char");
    });
  });

  context('Type Tests', function () {
    it('should return state type', function () {
      expect(new State("myName", "myType").getType()).to.equal("myType");
    });
  });

  context('Comment Tests', function () {
    it('should return state comment', function () {
      expect(new State("myName", "myType", "myComment").getComment()).equal("myComment");
    });

    it('should return new state comment', function () {
      let state = new State("myName", "myType", "myComment");
      state.setComment("newComment");
      expect(state.getComment()).to.equal("newComment");
    });
  });

  context('NextState Tests', function () {
    it('should return the next state', function () {
      expect(new State("myName", "myType", "myComment", "myNextState").getNextStateName()).to.equal("myNextState");
    });

    it('should return new next state', function () {
      let state = new State("myName", "myType", "myComment", "myNextState");
      state.setNextStateName("newNextState");
      expect(state.getNextStateName()).to.equal("newNextState");
    });
  });

  context('End Tests', function () {
    it('should return end state = false', function () {
      expect(new State("myName", "myType", "myComment").isEndState()).to.equal(false);
    });

    it('should fail to set end state to true due to invalid type', function () {
      expect(function () { let state = new State("myName", "Succeed").setEndState(true)}).to.throw(Error,'you can only set EndState if type == Choice, type == Succeed, or type == Fail');
    });

    it('should set end state to true with constructor', function () {
      expect(new State("myName", "Pass", "comment", "",true).isEndState()).to.equal(true);
    });

    it('should set end state true with setState()', function () {
      let state = new State("myName", "Pass");
      state.setEndState(true);
      expect(state.isEndState()).to.equal(true);
    });
  })

  context('toString test', function () {
    it('should return json version of state', function () {
      expect(new State("myName", "myType", "myComment").toString()).to.equal('"myName":{"Type":"myType","Comment":"myComment"}');
    });

    it('should return json version of state', function () {
      expect(new State("myName", "myType").toString()).to.equal('"myName":{"Type":"myType"}');
    });
  })

  context('InputPath Test', function () {
    it('should set and get inputPath', function () {
      let state = new State("myState", "myType", "comment", "", true);
      state.setInputPath("$.store.book[*].author");
      expect(state.getInputPath()).to.equal("$.store.book[*].author");
    });
  })
  
  context('toString test', function () {
    it('should return json version of state', function () {
      expect(new State("myName", "myType", "myComment").toString()).to.equal('"myName":{"Type":"myType","Comment":"myComment"}');
    });

    it('should return json version of state', function () {
      expect(new State("myName", "myType").toString()).to.equal('"myName":{"Type":"myType"}');
    });
  })
});
*/ 
