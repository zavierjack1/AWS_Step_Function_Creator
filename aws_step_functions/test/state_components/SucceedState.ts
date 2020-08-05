import { SucceedState }  from '../../src/state_components/SucceedState';
import { expect, assert } from 'chai';
import 'mocha';
describe('SucceedState class tests', function () {
  context('Name Tests', function () {
    it('should return name of State', function () {
      expect(new SucceedState("myName").getName()).to.equal("myName");
    });

    it('should return the newName of State', function () {
      let state = new SucceedState("myName");
      state.setName("newName"); 
      expect(state.getName()).to.equal("newName");
    });

    it('fail due too name being > 128', function () {
      let name = "";
      for (let i = 0; i < 129; i++){
        name = name+"a";
      }
      expect(function () { let state = new SucceedState(name) }).to.throw(Error, "name must be <= 128 char");
    });
  });

  context('Type Tests', function () {
    it('should return state type', function () {
      expect(new SucceedState("myName").getType()).to.equal("Succeed");
    });
  });

  context('Comment Tests', function () {
    it('should return state comment', function () {
      expect(new SucceedState("myName", "myComment").getComment()).to.equal("myComment");
    });

    it('should return new state comment', function () {
      let state = new SucceedState("myName", "myComment");
      state.setComment("newComment"); 
      expect(state.getComment()).to.equal("newComment");
    });
  });

  context('InputPath Tests', function () {
    it('should set and get inputPath', function () {
      let resource = function (){ return 1 + 1; }
      let state = new SucceedState("myName", "myComment");
      state.setInputPath("$.store.book[*].author");
      expect(state.getInputPath()).to.equal("$.store.book[*].author");
    });
  });
});