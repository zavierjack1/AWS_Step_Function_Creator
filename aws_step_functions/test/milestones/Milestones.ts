import { PassState }  from '../../src/state_components/PassState';
import { TaskState }  from '../../src/state_components/TaskState';
import { StateMachine }  from '../../src/state_components/StateMachine';
import { expect } from 'chai';
import { SucceedState } from '../../src/state_components/SucceedState';
import { Catcher } from '../../src/state_components/Catcher';
import { MapIterator } from '../../src/state_components/MapIterator';
import { MapState } from '../../src/state_components/MapState';
var JsonPath = require('jsonpath');

describe('Milestones', function () {
  context('Milestone 1', 
  function () {
    it('should create a State Machine w/ a Pass state using State class', 
    function () {
      let stateMachine = new StateMachine([new SucceedState("myState")], "myState");
      expect(stateMachine.getStates()[0].getName()).to.equal("myState");
      expect(stateMachine.getStates()[0].getType()).to.equal("Succeed");
      expect(stateMachine.getStartStateName()).to.equal("myState");
      expect(stateMachine.isValid()).to.equal(true);
    });

    it('should create a State Machine w/ a Pass state using the PassState class', 
    function () {
      let stateMachine = new StateMachine([new PassState("myState", "result", "comment", "myState2"), new SucceedState("myState2", "Succeed")], "myState");
      expect(stateMachine.getStates()[0].getName()).to.equal("myState");
      expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
      expect(stateMachine.getStartStateName()).to.equal("myState");
      expect(stateMachine.isValid()).to.equal(true);
      expect(JSON.parse(stateMachine.toString())["myState"]["Result"]).to.equal("result");
      expect(JSON.parse(stateMachine.toString())["myState"]["Comment"]).to.equal("comment");
      expect(JSON.parse(stateMachine.toString())["myState"]["Next"]).to.equal("myState2");
      expect(JSON.parse(stateMachine.toString())["myState"]["Type"]).to.equal("Pass");
      expect(JSON.parse(stateMachine.toString())["myState2"]["Type"]).to.equal("Succeed");
      expect(JSON.parse(stateMachine.toString())["myState2"]["End"]).to.equal(true);

      expect(stateMachine.toJSON()["myState"]["Result"]).to.equal("result");
      expect(stateMachine.toJSON()["myState"]["Comment"]).to.equal("comment");
      expect(stateMachine.toJSON()["myState"]["Next"]).to.equal("myState2");
      expect(stateMachine.toJSON()["myState"]["Type"]).to.equal("Pass");
      expect(stateMachine.toJSON()["myState2"]["Type"]).to.equal("Succeed");
      expect(stateMachine.toJSON()["myState2"]["End"]).to.equal(true);
    });

    it('should create a State Machine w/ a Pass state using the PassState class', 
    function () {
      let stateMachine = new StateMachine([new PassState("myState", "result", "comment", "myState2"), new SucceedState("myState2", "Succeed")], "myState");
      expect(stateMachine.getStates()[0].getName()).to.equal("myState");
      expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
      expect(stateMachine.getStartStateName()).to.equal("myState");
      expect(stateMachine.isValid()).to.equal(true);
    });

    it('HelloWorld single PassState', 
    function () {
      let input = `
        {
          "result": ""
        }
      `;
      let stateMachine = new StateMachine([new PassState("Hello World", "Hello World Result", "", "", true, "", "$.result")], "Hello World", "A simple minimal example of the States language");
      stateMachine.execute(input);
      expect(stateMachine.getStates()[0].getName()).to.equal("Hello World");
      expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
      expect(stateMachine.getStartStateName()).to.equal("Hello World");
      expect(stateMachine.isValid()).to.equal(true);
      expect(stateMachine.toString()).to.equal('{"StartAt":"Hello World", "Version":"1.0", "Comment":"A simple minimal example of the States language", "Hello World":{"Type":"Pass","Result":"Hello World Result","End":true,"OutputPath":"$.result"}}');
      expect(JSON.parse(stateMachine.toString())["StartAt"]).to.equal("Hello World");
      expect(JSON.parse(stateMachine.toString())["Version"]).to.equal("1.0");
      expect(JSON.parse(stateMachine.toString())["Comment"]).to.equal("A simple minimal example of the States language");
      expect(JSON.parse(stateMachine.toString())["Hello World"]["Type"]).to.equal("Pass");
      expect(JSON.parse(stateMachine.toString())["Hello World"]["End"]).to.equal(true);
      expect(JSON.parse(stateMachine.toString())["Hello World"]["Result"]).to.equal("Hello World Result");
      
      expect(stateMachine.toJSON()["StartAt"]).to.equal("Hello World");
      expect(stateMachine.toJSON()["Version"]).to.equal("1.0");
      expect(stateMachine.toJSON()["Comment"]).to.equal("A simple minimal example of the States language");
      expect(stateMachine.toJSON()["Hello World"]["Type"]).to.equal("Pass");
      expect(stateMachine.toJSON()["Hello World"]["End"]).to.equal(true);
      expect(stateMachine.toJSON()["Hello World"]["Result"]).to.equal("Hello World Result");
    });
  })

  context('Milestone 2', 
  function () {
    it('HelloWorld single TaskState', 
    function () {
      let resource = function (){ return 1 + 1; };
      let stateMachine = new StateMachine([new TaskState("Hello World Task", resource, "", "", true, "", "$.result")], "Hello World Task", "A simple minimal example of the States language");
      let input = `
        {
          "result": ""
        }
      `;
      stateMachine.execute(input);
      expect(stateMachine.getStates()[0].getName()).to.equal("Hello World Task");
      expect(stateMachine.getStates()[0].getType()).to.equal("Task");
      expect(stateMachine.getStartStateName()).to.equal("Hello World Task");
      expect(stateMachine.isValid()).to.equal(true);
      expect(stateMachine.toString()).to.equal('{"StartAt":"Hello World Task", "Version":"1.0", "Comment":"A simple minimal example of the States language", "Hello World Task":{"Type":"Task","Resource":"function () { return 1 + 1; }","End":true,"OutputPath":"$.result"}}');
      expect(JSON.parse(stateMachine.toString())["StartAt"]).to.equal("Hello World Task");
      expect(JSON.parse(stateMachine.toString())["Version"]).to.equal("1.0");
      expect(JSON.parse(stateMachine.toString())["Comment"]).to.equal("A simple minimal example of the States language");
      expect(JSON.parse(stateMachine.toString())["Hello World Task"]["Type"]).to.equal("Task");
      expect(JSON.parse(stateMachine.toString())["Hello World Task"]["End"]).to.equal(true);
      expect(JSON.parse(stateMachine.toString())["Hello World Task"]["Resource"]).to.equal("function () { return 1 + 1; }");
      expect(stateMachine.toJSON()["StartAt"]).to.equal("Hello World Task");
      expect(stateMachine.toJSON()["Version"]).to.equal("1.0");
      expect(stateMachine.toJSON()["Comment"]).to.equal("A simple minimal example of the States language");
      expect(stateMachine.toJSON()["Hello World Task"]["Type"]).to.equal("Task");
      expect(stateMachine.toJSON()["Hello World Task"]["End"]).to.equal(true);
      expect(stateMachine.toJSON()["Hello World Task"]["Resource"]).to.equal("function () { return 1 + 1; }");
    });
  });

  context('Milestone 3', 
  function () {
    it('Statemachine w/ a PassState and a TaskState. The PassState returns Hello World. The TaskState returns Hello World, Goodbye single state machines', 
    function () {
      let stateMachine = new StateMachine([new PassState("myPassState", "HelloWorld", "", "myTaskState", false, "", "$.result")], "myPassState");
      let resource = function (x: string){
        return x+", GoodBye single state machines.";
      }
      stateMachine.addState(new TaskState("myTaskState", resource, "", "", true, "$.result", "$.result"));
      let input = `{
          "first": 100,
          "second": 200,
          "result": ""
        }`;
      expect(stateMachine.execute(input)["result"]).to.equal("HelloWorld, GoodBye single state machines.");
    });

    it('Statemachine w/ a TaskState1 and a TaskState2. The TaskState1 returns 123. The TaskState2 returns 123abc', 
    function () {
      let resource = function (x: string){
        return "123";
      }
      let stateMachine = new StateMachine([new TaskState("TaskState1", resource, "comment", "TaskState2", false, "$.result", "$.result")], "TaskState1");
      resource = function (x: string){
        return x+"abc";
      }
      stateMachine.addState(new TaskState("TaskState2", resource, "", "", true, "$.result", "$.result"));
      let input = `{
          "first": 100,
          "second": 200,
          "result": ""
        }`;
      expect(stateMachine.execute(input)["result"]).to.equal("123abc");
    });

    it('Statemachine w/ a TaskState1 and a TaskState2. The TaskState1 returns 100. The TaskState2 returns 200', 
    function () {
      let resource = function (x: number){
        return x;
      }
      let stateMachine = new StateMachine([new TaskState("TaskState1", resource, "comment", "TaskState2", false, "$.param1", "$.result1")], "TaskState1");
      let resource2 = function (x: number){
        return x;
      }
      stateMachine.addState(new TaskState("TaskState2", resource2, "", "", true, "$.param2", "$.result2"));
      let input = `{
          "param1": 100,
          "param2": 200,
          "result1": "",
          "result2": ""
        }`;
      expect(stateMachine.execute(input)["result1"]).to.eql([100]);
      expect(stateMachine.execute(input)["result2"]).to.eql([200]);
    });
  });

  context('Milestone 4', 
  function () {
    it('myState->Error->myState2->Error->myState3(only reachable via error)->Success', function () {
      let resource = function (){
        throw new Error("resource error");
      }
      let resource2 = function (){
        throw new Error("resource error 2");
      }

      let resource3 = function (){
        return "abcde";
      }
      let catcher1 = new Catcher("myState2");
      let catcher2 = new Catcher("myState3");
      let stateMachine = new StateMachine(
        [
          new TaskState("myState", resource, "xyz", "myEnd",false, "","", [catcher1]),
          new TaskState("myState2", resource2, "xyz", "myEnd",false, "","", [catcher2]),
          new SucceedState("myEnd"), 
          new TaskState("myState3", resource3, "xyz", "myEnd",false, "","$.result")
        ], "myState", "myComment", "2.0", 10);
      expect(stateMachine.isValid()).to.equal(true);
      expect(stateMachine.execute('{"result":""}')).to.eql({"result":"abcde"});
    });

    it('myState->Error->myState2->myState1->Success', function () {
      let resource = function (param : number){
        if (param < 1) throw new Error("resource error");
        return Number(param)+1;
      }
      let resource2 = function (){
        return 1;
      }

      let resource3 = function (){
        return 5;
      }
      let catcher1 = new Catcher("myState2");
      let catcher2 = new Catcher("myState3");
      let stateMachine = new StateMachine(
        [
          new TaskState("myState", resource, "xyz", "myEnd",false, "$.param1","$.param1", [catcher1]),
          new TaskState("myState2", resource2, "xyz", "myState",false, "","$.param1", [catcher2]),
          new SucceedState("myEnd"), 
          new TaskState("myState3", resource3, "xyz", "myEnd",false, "","$.result")
        ], "myState", "myComment", "2.0", 10);
      expect(stateMachine.isValid()).to.equal(true);
      expect(stateMachine.execute('{"param1": 0, "result":""}')).to.eql({"param1":2, "result":""});
    });
  });

  context('Milestone 5', 
  function () {
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

    it('Basic MapState', function () {
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

    it('concat 123 to prod', function () {
      let json = mapStateInputJson;
      let resource = function (x: string){
        return x+123;
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
            { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: "R31123" },
            { prod: 'S39', 'dest-code': 9511, quantity: 40, result: "S39123" },
            { prod: 'R31', 'dest-code': 9833, quantity: 12, result: "R31123" },
            { prod: 'R40', 'dest-code': 9860, quantity: 887, result: "R40123" },
            { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: "R40123" }
          ]
        ]
      );
    });

    it('should set quantity field to 5x', function () {
      let json = mapStateInputJson;
      let resource = function (x: string){
        return Number(x)*5;
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
            { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: 6720 },
            { prod: 'S39', 'dest-code': 9511, quantity: 40, result: 200 },
            { prod: 'R31', 'dest-code': 9833, quantity: 12, result: 60 },
            { prod: 'R40', 'dest-code': 9860, quantity: 887, result: 4435 },
            { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: 6100 }
          ]
        ]
      );
    });

    it('create a state machine with a map state inside', function () {
      let json = mapStateInputJson;
      let resource = function (x: string){
        return Number(x)*5;
      }

      let mapIterator = new MapIterator(
        [new TaskState("myTaskState", resource, "", "", true, "$.quantity", "$.result")],
        "myTaskState"
      );

      let mapState = new MapState("myState", mapIterator, "myComment","", true);
      mapState.setResource(resource);
      mapState.setInputPath("$.detail.shipped");
      let stateMachine = new StateMachine([mapState], "myState");
      expect(JsonPath.query(stateMachine.execute(json), '$.detail.shipped')).to.eql(
        [
          [
            { prod: 'R31', 'dest-code': 9511, quantity: 1344, result: 6720 },
            { prod: 'S39', 'dest-code': 9511, quantity: 40, result: 200 },
            { prod: 'R31', 'dest-code': 9833, quantity: 12, result: 60 },
            { prod: 'R40', 'dest-code': 9860, quantity: 887, result: 4435 },
            { prod: 'R40', 'dest-code': 9511, quantity: 1220, result: 6100 }
          ]
        ]
      );
    });
  });
})