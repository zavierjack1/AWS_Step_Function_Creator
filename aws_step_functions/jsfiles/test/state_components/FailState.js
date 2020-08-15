"use strict";
/*
import { FailState }  from '../../src/state_components/FailState';
import { expect, assert } from 'chai';
import 'mocha';
describe('SucceedState class tests', function () {
  context('Name Tests', function () {
    it('should return name of State', function () {
      expect(new FailState("myName").getName()).to.equal("myName");
    });

    it('should return the newName of State', function () {
      let state = new FailState("myName");
      state.setName("newName");
      expect(state.getName()).to.equal("newName");
    });

    it('fail due too name being > 128', function () {
      let name = "";
      for (let i = 0; i < 129; i++){
        name = name+"a";
      }
      expect(function () { let state = new FailState(name) }).to.throw(Error, "name must be <= 128 char");
    });
  });

  context('Type Tests', function () {
    it('should return state type', function () {
      expect(new FailState("myName").getType()).to.equal("Fail");
    });
  });

  context('Comment Tests', function () {
    it('should return state comment', function () {
      expect(new FailState("myName", "myComment").getComment()).to.equal("myComment");
    });

    it('should return new state comment', function () {
      let state = new FailState("myName", "myComment");
      state.setComment("newComment");
      expect(state.getComment()).to.equal("newComment");
    });
  });

  context('toString test', function () {
    it('should return json of task state', function () {
      let taskState = new FailState("myName", "myComment");
      expect(taskState.toString()).to.equal('"myName":{"Type":"Fail","Comment":"myComment","End":true}');
    });
  })
});
*/ 
