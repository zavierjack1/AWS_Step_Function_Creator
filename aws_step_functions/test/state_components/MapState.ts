import { MapState }  from '../../src/state_components/MapState';
import { expect } from 'chai';
import 'mocha';
import { Catcher } from '../../src/state_components/Catcher';
import { MapIterator } from '../../src/state_components/MapIterator';
import { SucceedState } from '../../src/state_components/SucceedState';
import { TaskState } from '../../src/state_components/TaskState';
var JsonPath = require('jsonpath');

describe('MapState class tests', function () {
  let defaultMapIterator = new MapIterator([new SucceedState("myState")], "");
  
  context('Name Tests', function () {
    it('should return name of State', function () {
      expect(new MapState("myName", defaultMapIterator).getName()).to.equal("myName");
    });
    
    it('should return the newName of State', function () {
      let state = new MapState("myName", defaultMapIterator);
      state.setName("newName"); 
      expect(state.getName()).to.equal("newName");
    });
    
    it('fail due too name being > 128', function () {
      let name = "";
      for (let i = 0; i < 129; i++){
        name = name+"a";
      }
      expect(function () { let state = new MapState(name, defaultMapIterator) }).to.throw(Error, "name must be <= 128 char");
    });
  });

  context('Type Tests', function () {
    it('should return state type', function () {
      expect(new MapState("myName", defaultMapIterator).getType()).to.equal("Map");
    });
  });
  
  context('Resource Tests', function () {
    it('should return resource', function () {
      expect(new MapState("myName", defaultMapIterator).getType()).to.equal("Map");
    });
  });

  context('Comment Tests', function () {
    it('should return state comment', function () {
      expect(new MapState("myName", defaultMapIterator, "myComment").getComment()).to.equal("myComment");
    });

    it('should return new state comment', function () {
      let state = new MapState("myName", defaultMapIterator, "myComment");
      state.setComment("newComment"); 
      expect(state.getComment()).to.equal("newComment");
    });
  });

  context('nextStateName Tests', function () {
    it('should return the nextStateName', function () {
      expect(new MapState("myName", defaultMapIterator, "myComment", "myNextState").getNextStateName()).equal("myNextState");
    });

    it('should return new nextStateName', function () {
      let state = new MapState("myName", defaultMapIterator, "myComment", "myNextState");
      state.setNextStateName("newNextState"); 
      expect(state.getNextStateName()).to.equal("newNextState");
    });
  });
 
  context('EndStates Tests', function () {
    it('should return end state = false', function () {
      expect(new MapState("myName", defaultMapIterator, "myComment").isEndState()).to.equal(false);
    });

    it('should set end state to true with constructor', function () {
      expect(new MapState("myName", defaultMapIterator, "comment", "", true).isEndState()).to.equal(true);
    });

    it('should set end state true with setState()', function () {
      let state = new MapState("myName", defaultMapIterator, "comment");
      state.setEndState(true);
      expect(state.isEndState()).to.equal(true);
    });
  })

  context('End Tests', function () {
    it('should return end state = false', function () {
      expect(new MapState("myName", defaultMapIterator, "myComment").isEndState()).to.equal(false);
    });
  })

  context('InputPath Tests', function () {
    it('should set and get inputPath', function () {
      let state = new MapState("myName", defaultMapIterator, "myComment");
      state.setInputPath("$.store.book[*].author");
      expect(state.getInputPath()).to.equal("$.store.book[*].author");
    });
  })

  context('OutputPath Tests', function () {
    it('should set and get outputPath', function () {
      let state = new MapState("myName", defaultMapIterator, "myComment");
      state.setOutputPath("$.store.book[*].author");
      expect(state.getOutputPath()).to.equal("$.store.book[*].author");
    });
  })
  
  context ("Execute Test", function () {
    let mapStateInputJson = 
      `{
        "ship-date": "2016-03-14T01:59:00Z",
        "detail": {
          "delivery-partner": "UQS",
          "shipped": [
            { "prod": "R31", "dest-code": 9511, "quantity": 1344, "result": "" },
            { "prod": "S39", "dest-code": 9511, "quantity": 40, "result": "" },
            { "prod": "R31", "dest-code": 9833, "quantity": 12, "result": "" },
            { "prod": "R40", "dest-code": 9860, "quantity": 887, "result": "" },
            { "prod": "R40", "dest-code": 9511, "quantity": 1220, "result": "" }
          ]
        },
        "result": ""
      }`;

    it('should output a json with store.result = list of authors', function () {
      let json = mapStateInputJson;
      let resource = function (x: string){
        return x;
      }
      let mapIterator = new MapIterator(
        [new TaskState("myTaskState", resource, "", "", true, "$.prod", "$.result")],
        "myTaskState"
      );
      let mapState = new MapState("myName", mapIterator, "myComment");
      mapState.setInputPath("$.detail.shipped");
      expect(JsonPath.query(mapState.execute(json), '$.detail.shipped')).to.eql(
        [
          [
            { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: ["R31"] },
            { prod: 'S39', 'dest-code': 9511, quantity: 40, result: ["S39"] },
            { prod: 'R31', 'dest-code': 9833, quantity: 12, result: ["R31"] },
            { prod: 'R40', 'dest-code': 9860, quantity: 887, result: ["R40"] },
            { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: ["R40"] }
          ]
        ]
      );
    });
    
    it('should print inputJson expense field to 2x', function () {
      let json = mapStateInputJson;
      let resource = function (x: string){
        return Number(x)*2;
      }

      let mapIterator = new MapIterator(
        [new TaskState("myTaskState", resource, "", "", true, "$.quantity", "$.result")],
        "myTaskState"
      );

      let mapState = new MapState("myName", mapIterator, "myComment");
      mapState.setResource(resource);
      mapState.setInputPath("$.detail.shipped");
      expect(JsonPath.query(mapState.execute(json), '$.detail.shipped')).to.eql(
        [
          [
            { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: 2688 },
            { prod: 'S39', 'dest-code': 9511, quantity: 40, result: 80 },
            { prod: 'R31', 'dest-code': 9833, quantity: 12, result: 24 },
            { prod: 'R40', 'dest-code': 9860, quantity: 887, result: 1774 },
            { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: 2440 }
          ]
        ]
      );
    });
  });
  
  context('toString test', function () {
    it('should return json of task state', function () {
      let mapState = new MapState("myName", defaultMapIterator, "myComment");
      expect(mapState.toString()).to.equal('"myName":{"Type":"Map","Comment":"myComment", "Iterator": {"StartAt":"", "myState":{"Type":"Succeed","End":true}}}');
    });
  })

  context('Catcher test', function () {
    it('should add Catcher to MapState', function () {
      let mapState = new MapState("myName", defaultMapIterator, "myComment");
      mapState.addCatcher(new Catcher("nextStateName"));
      expect(mapState.getCatchers()[0].getNextStateName()).to.equal("nextStateName");
      expect(mapState.getCatchers()[0].getErrorEquals()).to.eql(['States.ALL']);
    });
  })
});