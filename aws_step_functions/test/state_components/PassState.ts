import { PassState }  from '../../src/state_components/PassState';
import { expect } from 'chai';
import 'mocha';

var assert = require('assert');
describe('PassState class tests', function () {
  context('Name Tests', function () {
    it('should return name of State', function () {
        expect(new PassState("myName").getName()).to.equal("myName");
    });

    it('should return the newName of State', function () {
        let state = new PassState("myName");
        state.setName("newName"); 
        expect(state.getName()).to.equal("newName");
    });

    it('fail due too name being > 128', function () {
        let name = "";
        for (let i = 0; i < 129; i++){
          name = name+"a";
        }
        expect(function () { let state = new PassState(name) }).to.throw(Error, "name must be <= 128 char")
    });
  });

  context('Type Tests', function () {
    it('should return state type', function () {
        assert.equal(new PassState("myName").getType(), "Pass");
        expect(new PassState("myName").getType()).to.equal("Pass");
    });
  });

  context('Comment Tests', function () {
    it('should return state comment', function () {
        expect(new PassState("myName", "result", "myComment").getComment()).to.equal("myComment");
    });

    it('should return new state comment', function () {
        let state = new PassState("myName", "result", "myComment");
        state.setComment("newComment"); 
        expect(state.getComment(), "newComment");
    });
  });

  context('NextState Tests', function () {
    it('should return the next state', function () {
        expect(new PassState("myName", "result", "myComment", "myNextState").getNextStateName()).to.equal("myNextState");
    });

    it('should return new next state', function () {
        let state = new PassState("myName", "result", "myComment", "myNextState");
        state.setNextStateName("newNextState"); 
        expect(state.getNextStateName(), "newNextState");
    });
  });

  context('End Tests', function () {
    it('should return end state = false', function () {
        expect(new PassState("myName", "result", "myComment").isEndState()).to.equal(false);
    });

    it('should set end state to true with constructor', function () {
        expect(new PassState("myName", "result", "comment", "", true).isEndState()).to.equal(true);
    });

    it('should set end state true with setState()', function () {
      let state = new PassState("myName", "result", "comment");
      state.setEndState(true);
      expect(state.isEndState()).equal(true);
    });
  })

  context('Result Tests', function () {
    it('should return result', function () {
        expect(new PassState("myName", "result", "myComment").getResult()).to.equal("result");
    });

    it('should set new result', function () {
      let state = new PassState("myName", "result", "comment");
      state.setResult("result2");
      expect(state.getResult()).equal("result2");
    });
  })

  context('Simulate() Tests', function () {
    it('should return result', function () {
        let state = new PassState("myName", "result", "myComment");
        let result = state.execute();
        if (result) expect(result).to.equal("result");
        else expect(1).to.equal(2);
    });
  })

  context('toString test', function () {
    it('should return json version of state', function () {
      expect(new PassState("myName", "myResult", "myComment").toString()).to.equal('"myName":{"Type":"Pass","Comment":"myComment","Result":"myResult"}');
    });

    it('should return json version of state', function () {
      expect(new PassState("myName", "myResult").toString()).to.equal('"myName":{"Type":"Pass","Result":"myResult"}');
    });
  })
});