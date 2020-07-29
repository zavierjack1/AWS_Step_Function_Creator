import { TaskState }  from '../../src/state_components/TaskState';
import { expect, assert } from 'chai';
import 'mocha';
describe('TaskState class tests', function () {
  context('Name Tests', function () {
    it('should return name of State', function () {
      let resource = function () {
        console.log("helloworld");
      }
      expect(new TaskState("myName", resource).getName()).to.equal("myName");
    });

    it('should return the newName of State', function () {
      let resource = function () {
        console.log("helloworld");
      }
      let state = new TaskState("myName", resource);
      state.setName("newName"); 
      expect(state.getName()).to.equal("newName");
    });

    it('fail due too name being > 128', function () {
      let resource = function () {
        console.log("helloworld");
      }
      let name = "";
      for (let i = 0; i < 129; i++){
        name = name+"a";
      }
      expect(function () { let state = new TaskState(name, resource) }).to.throw(Error, "name must be <= 128 char");
    });
  });

  context('Type Tests', function () {
    it('should return state type', function () {
      let resource = function () {
        console.log("helloworld");
      } 
      expect(new TaskState("myName", resource).getType()).to.equal("Task");
    });
  });

  context('Resource Tests', function () {
    it('should return resource', function () {
      let resource = function () {
        console.log("helloworld");
      }
      expect(new TaskState("myName", resource).getType()).to.equal("Task");
    });
  });

  context('Comment Tests', function () {
    it('should return state comment', function () {
      let resource = function () {
        console.log("helloworld");
      }
      expect(new TaskState("myName", resource, "myComment").getComment()).to.equal("myComment");
    });

    it('should return new state comment', function () {
      let  resource = function () {
        console.log("helloworld");
      }
      let state = new TaskState("myName", resource, "myComment");
      state.setComment("newComment"); 
      expect(state.getComment()).to.equal("newComment");
    });
  });

  context('NextState Tests', function () {
    it('should return the next state', function () {
      let resource = function () {
        console.log("helloworld");
      }
      expect(new TaskState("myName", resource, "myComment", "myNextState").getNextState()).equal("myNextState");
    });

    it('should return new next state', function () {
      let resource = function () {
        console.log("helloworld");
      }
      let state = new TaskState("myName", resource, "myComment", "myNextState");
      state.setNextState("newNextState"); 
      expect(state.getNextState()).to.equal("newNextState");
    });
  });
 
  context('EndStates Tests', function () {
    it('should return end state = false', function () {
      let resource = function () {
        console.log("helloworld");
      }
      expect(new TaskState("myName", resource, "myComment").isEndState()).to.equal(false);
    });

    it('should set end state to true with constructor', function () {
      let resource = function () {
        console.log("helloworld");
      }
      expect(new TaskState("myName", resource, "comment", "", true).isEndState()).to.equal(true);
    });

    it('should set end state true with setState()', function () {
      let resource = function () {
        console.log("helloworld");
      }
      let state = new TaskState("myName", resource, "comment");
      state.setEndState(true);
      expect(state.isEndState()).to.equal(true);
    });
  })

  context('End Tests', function () {
    it('should return end state = false', function () {
      let resource = function () {
        console.log("helloworld");
      }
      expect(new TaskState("myName", resource, "myComment").isEndState()).to.equal(false);
    });
  })

  context('Resource Tests', function () {
    it('should return "test"', function () {
      let resource = function (){
        return "test";
      }
      let taskState = new TaskState("myName", resource, "myComment");
      taskState.setResource(resource);
      expect(taskState.simulate()).to.equal("test");
    });

    it('should return undefined', function () {
      let resource = function (){
        let test = 1+1;
      }
      let taskState = new TaskState("myName", resource, "myComment");
      taskState.setResource(resource);
      expect(taskState.simulate()).to.equal(undefined);
    });
  })
});