import { PassState }  from '../../src/state_components/PassState';
import { expect } from 'chai';
import 'mocha';
var JsonPath = require('jsonpath');

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

  context('Result and Execution Tests', function () {
    it('should return result', function () {
      let state = new PassState("myName", "result", "myComment");
      let result = state.execute();
      expect(result).to.equal("result");
    });
  })

  context('toString test', function () {
    it('should return json version of state', function () {
      expect(new PassState("myName", "myResult", "myComment").toString()).to.equal('"myName":{"Type":"Pass","Result":"myResult","Comment":"myComment"}');
    });

    it('should return json version of state', function () {
      expect(new PassState("myName", "myResult").toString()).to.equal('"myName":{"Type":"Pass","Result":"myResult"}');
    });
  })

  context('InputPath Test', function () {
    it('should set and get inputPath', function () {
      let state = new PassState("myName", "myResult", "myComment");
      state.setInputPath("$.store.book[*].author");
      expect(state.getInputPath()).to.equal("$.store.book[*].author");
    });
  })

  context('OutputPath Tests', function () {
    it('should set and get outputPath', function () {
      let state = new PassState("myName", "myResult", "myComment");
      state.setOutputPath("$.store.book[*].author");
      expect(state.getOutputPath()).to.equal("$.store.book[*].author");
    });

    it('should output a json with store.result = list of authors', function () {
      let state = new PassState("myName", "myResult", "myComment");
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
      state.setInputPath("$.store.book[*].author");
      state.setOutputPath("$.store.result");
      expect(JsonPath.query(state.execute(json), '$.store.result')).to.eql([ 'myResult' ]);
    });
  })

  it('should set inputJson expense field to array of numbers', function () {
    let state = new PassState("myName", [100, 200], "myComment");
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
    state.setInputPath("$.expensive");
    state.setOutputPath("$.expensive");
    expect(JsonPath.query(state.execute(json), state.getOutputPath())).to.eql([[100, 200]]);
  });

  it('should set inputJson expense field to 100', function () {
    let state = new PassState("myName", 100, "myComment");
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
    state.setInputPath("$.expensive");
    state.setOutputPath("$.expensive");
    expect(JsonPath.query(state.execute(json), state.getOutputPath())).to.eql([100]);
  });
});