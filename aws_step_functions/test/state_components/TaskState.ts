import { TaskState }  from '../../src/state_components/TaskState';
import { expect, assert } from 'chai';
import 'mocha';
var JsonPath = require('jsonpath');

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

  context('nextStateName Tests', function () {
    it('should return the nextStateName', function () {
      let resource = function () {
        console.log("helloworld");
      }
      expect(new TaskState("myName", resource, "myComment", "myNextState").getNextStateName()).equal("myNextState");
    });

    it('should return new nextStateName', function () {
      let resource = function () {
        console.log("helloworld");
      }
      let state = new TaskState("myName", resource, "myComment", "myNextState");
      state.setNextStateName("newNextState"); 
      expect(state.getNextStateName()).to.equal("newNextState");
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

  context('Resource & Execution Tests', function () {
    it('should return json result', function () {
      let resource = function (){
        return "test";
      }
      let taskState = new TaskState("myName", resource, "myComment", "", true, "", "$.result");
      taskState.setResource(resource);
      expect(taskState.execute()['result']).to.equal("test");
    });

    it('should return empty json', function () {
      let resource = function (){
        return "test";
      }
      let taskState = new TaskState("myName", resource, "myComment");
      taskState.setResource(resource);
      expect(taskState.execute()).to.eql(JSON.parse("{}"));
    });

    it('should return undefined', function () {
      let resource = function (){
        let test = 1+1;
      }
      let taskState = new TaskState("myName", resource, "myComment");
      taskState.setResource(resource);
      expect(taskState.execute()).to.eql(JSON.parse("{}"));
    });
  });

  context('InputPath Tests', function () {
    it('should set and get inputPath', function () {
      let resource = function (){ return 1 + 1; }
      let state = new TaskState("myName", resource, "myComment");
      state.setInputPath("$.store.book[*].author");
      expect(state.getInputPath()).to.equal("$.store.book[*].author");
    });

    it('should fail to validate json', function () {
      let resource = function (x: string){
        return x;
      }
      let taskState = new TaskState("myName", resource, "myComment");
      let json = 
        `invalidJson`;
      taskState.setResource(resource);
      taskState.setInputPath("$.store.book[*].author");
      expect(function() {taskState.execute(json)}).to.Throw(SyntaxError);
    });

    it('should return list of authors from json', function () {
      let resource = function (x: string){
        return x;
      }
      let taskState = new TaskState("myName", resource, "myComment");
      let json = 
        `{
          "store": {
              "book": [
                  {
                      "category": "reference",
                      "author": "Nigel Rees",
                      "title": "Sayings of the Century",
                      "price": 8.95
                  },
                  {
                      "category": "fiction",
                      "author": "Evelyn Waugh",
                      "title": "Sword of Honour",
                      "price": 12.99
                  },
                  {
                      "category": "fiction",
                      "author": "Herman Melville",
                      "title": "Moby Dick",
                      "isbn": "0-553-21311-3",
                      "price": 8.99
                  },
                  {
                      "category": "fiction",
                      "author": "J. R. R. Tolkien",
                      "title": "The Lord of the Rings",
                      "isbn": "0-395-19395-8",
                      "price": 22.99
                  }
              ],
              "bicycle": {
                  "color": "red",
                  "price": 19.95
              }
          },
          "expensive": 10
        }`;
      taskState.setResource(resource);
      taskState.setInputPath("$.store.book[*].author");
      expect(JsonPath.query(taskState.execute(json), '$.store.book[*].author')).to.eql([ 'Nigel Rees', 'Evelyn Waugh', 'Herman Melville', 'J. R. R. Tolkien' ]);
    });
  })

  context('OutputPath Tests', function () {
    it('should set and get outputPath', function () {
      let resource = function (x: string){
        return x;
      }
      let state = new TaskState("myName", resource, "myComment");
      state.setOutputPath("$.store.book[*].author");
      expect(state.getOutputPath()).to.equal("$.store.book[*].author");
    });

    it('should output a json with store.result = list of authors', function () {
      let resource = function (x: string){
        return x;
      }
      let taskState = new TaskState("myName", resource, "myComment");
      let json = 
        `{
          "store": {
              "book": [
                  {
                      "category": "reference",
                      "author": "Nigel Rees",
                      "title": "Sayings of the Century",
                      "price": 8.95
                  },
                  {
                      "category": "fiction",
                      "author": "Evelyn Waugh",
                      "title": "Sword of Honour",
                      "price": 12.99
                  },
                  {
                      "category": "fiction",
                      "author": "Herman Melville",
                      "title": "Moby Dick",
                      "isbn": "0-553-21311-3",
                      "price": 8.99
                  },
                  {
                      "category": "fiction",
                      "author": "J. R. R. Tolkien",
                      "title": "The Lord of the Rings",
                      "isbn": "0-395-19395-8",
                      "price": 22.99
                  }
              ],
              "bicycle": {
                  "color": "red",
                  "price": 19.95
              }
          },
          "expensive": 10
        }`;
      taskState.setResource(resource);
      taskState.setInputPath("$.store.book[*].author");
      taskState.setOutputPath("$.store.result");
      expect(JsonPath.query(taskState.execute(json), '$.store.result')).to.eql([[ 'Nigel Rees', 'Evelyn Waugh', 'Herman Melville', 'J. R. R. Tolkien' ]]);
    });
  })

  it('should set inputJson expense field to 2x', function () {
    let resource = function (x: string){
      return Number(x)*2;
    }
    let taskState = new TaskState("myName", resource, "myComment");
    let json = 
      `{
        "store": {
            "book": [
                {
                    "category": "reference",
                    "author": "Nigel Rees",
                    "title": "Sayings of the Century",
                    "price": 8.95
                },
                {
                    "category": "fiction",
                    "author": "Evelyn Waugh",
                    "title": "Sword of Honour",
                    "price": 12.99
                },
                {
                    "category": "fiction",
                    "author": "Herman Melville",
                    "title": "Moby Dick",
                    "isbn": "0-553-21311-3",
                    "price": 8.99
                },
                {
                    "category": "fiction",
                    "author": "J. R. R. Tolkien",
                    "title": "The Lord of the Rings",
                    "isbn": "0-395-19395-8",
                    "price": 22.99
                }
            ],
            "bicycle": {
                "color": "red",
                "price": 19.95
            }
        },
        "expensive": 10
      }`;
    taskState.setResource(resource);
    taskState.setInputPath("$.expensive");
    taskState.setOutputPath("$.expensive");
    expect(JsonPath.query(taskState.execute(json), taskState.getOutputPath())).to.eql([20]);
  });

  context('toString test', function () {
    it('should return json of task state', function () {
      let resource = function (){ return 1 + 1; }
      let taskState = new TaskState("myName", resource, "myComment");
      expect(taskState.toString()).to.equal('"myName":{"Type":"Task","Resource":"function () { return 1 + 1; }","Comment":"myComment"}');
    });

    it('should return json of task state', function () {
      let resource = function (){ return 1 + 1; }
      let taskState = new TaskState("myName", resource, "myComment", "nextState", false, "$.test", "$.test2");
      expect(taskState.toString()).to.equal('"myName":{"Type":"Task","Resource":"function () { return 1 + 1; }","Comment":"myComment","Next":"nextState","InputPath":"$.test","OutputPath":"$.test2"}');
    });
  })
});