import { State }  from '../../src/state_components/State';
import { PassState }  from '../../src/state_components/PassState';
import { TaskState }  from '../../src/state_components/TaskState';
import { StateMachine }  from '../../src/state_components/StateMachine';
import { expect, assert } from 'chai';
import 'mocha';
import { SucceedState } from '../../src/state_components/SucceedState';

//!!!!!!! WE NEED TO PASS AND RETURN JSON OBJECTS TO STATES NOT STRINGS!!!
describe('Milestones', function () {
  context(
    `1. Create/toString/simulate a state machine consisting of a single Pass state. No
    input/output processing, parameters, result/result path, or error handling support`, 
  function () {
    it('should create a State Machine w/ a Pass state using State class', 
    function () {
      let stateMachine = new StateMachine([new SucceedState("myState")], "myState");
      expect(stateMachine.getStates()[0].getName()).to.equal("myState");
      expect(stateMachine.getStates()[0].getType()).to.equal("Succeed");
      expect(stateMachine.getStartStateName()).to.equal("myState");
      expect(stateMachine.validate()).to.equal(true);
    });

    it('should create a State Machine w/ a Pass state using the PassState class', 
    function () {
      let stateMachine = new StateMachine([new PassState("myState", "result", "comment", "myState2"), new SucceedState("myState2", "Succeed")], "myState");
      expect(stateMachine.getStates()[0].getName()).to.equal("myState");
      expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
      expect(stateMachine.getStartStateName()).to.equal("myState");
      expect(stateMachine.validate()).to.equal(true);
    });

    it('should create a State Machine w/ a Pass state using the PassState class', 
    function () {
      let stateMachine = new StateMachine([new PassState("myState", "result", "comment", "myState2"), new SucceedState("myState2", "Succeed")], "myState");
      expect(stateMachine.getStates()[0].getName()).to.equal("myState");
      expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
      expect(stateMachine.getStartStateName()).to.equal("myState");
      expect(stateMachine.validate()).to.equal(true);
    });

    it('HelloWorld single PassState', 
    function () {
      let stateMachine = new StateMachine([new PassState("Hello World", "Hello World Result", "", "", true)], "Hello World", "A simple minimal example of the States language");
      let results = stateMachine.execute();
      expect(stateMachine.getStates()[0].getName()).to.equal("Hello World");
      expect(stateMachine.getStates()[0].getType()).to.equal("Pass");
      expect(stateMachine.getStartStateName()).to.equal("Hello World");
      expect(stateMachine.validate()).to.equal(true);
      expect(stateMachine.toString()).to.equal('{"StartAt":"Hello World", "Version":"1.0", "Comment":"A simple minimal example of the States language", "Hello World":{"Type":"Pass","End":true,"Result":"Hello World Result"}}');
      expect(JSON.parse(stateMachine.toString())["StartAt"]).to.equal("Hello World");
      expect(JSON.parse(stateMachine.toString())["Version"]).to.equal("1.0");
      expect(JSON.parse(stateMachine.toString())["Comment"]).to.equal("A simple minimal example of the States language");
      expect(JSON.parse(stateMachine.toString())["Hello World"]["Type"]).to.equal("Pass");
      expect(JSON.parse(stateMachine.toString())["Hello World"]["End"]).to.equal(true);
      expect(JSON.parse(stateMachine.toString())["Hello World"]["Result"]).to.equal("Hello World Result");
      //expect(results[0]).to.equal("Hello World Result");
    });
  })

  context(
    `2. Add support for a Task state. The state machine representation can now be created either
    with a single Pass state or a single Task state. The interpreter must support a way
    for the client to provide mock implementations for function resources used in task states.
    When simulated, the output of the Task state should be the result of an invocation to the
    corresponding mock function.`, 
  function () {
    it('HelloWorld single TaskState', 
    function () {
      let resource = function (){ return 1 + 1; };
      let stateMachine = new StateMachine([new TaskState("Hello World Task", resource, "", "", true)], "Hello World Task", "A simple minimal example of the States language");
      let results = stateMachine.execute();
      expect(stateMachine.getStates()[0].getName()).to.equal("Hello World Task");
      expect(stateMachine.getStates()[0].getType()).to.equal("Task");
      expect(stateMachine.getStartStateName()).to.equal("Hello World Task");
      expect(stateMachine.validate()).to.equal(true);
      expect(stateMachine.toString()).to.equal('{"StartAt":"Hello World Task", "Version":"1.0", "Comment":"A simple minimal example of the States language", "Hello World Task":{"Type":"Task","Resource":"function () { return 1 + 1; }","End":true}}');
      expect(JSON.parse(stateMachine.toString())["StartAt"]).to.equal("Hello World Task");
      expect(JSON.parse(stateMachine.toString())["Version"]).to.equal("1.0");
      expect(JSON.parse(stateMachine.toString())["Comment"]).to.equal("A simple minimal example of the States language");
      expect(JSON.parse(stateMachine.toString())["Hello World Task"]["Type"]).to.equal("Task");
      expect(JSON.parse(stateMachine.toString())["Hello World Task"]["End"]).to.equal(true);
      expect(JSON.parse(stateMachine.toString())["Hello World Task"]["Resource"]).to.equal("function () { return 1 + 1; }");
      //expect(results[0]).to.equal(2);
    });
  });

  context(
    `3. Add support for state transitions. The state machine representation can now be created
    with a sequence of states (Pass or Task) with outputs of previous states passing on to
    the inputs of next states.`, 
  function () {
    it('Statemachine w/ a PassState and a TaskState. The PassState returns Hello World. The TaskState returns Hello World, Goodbye single state machines', 
    function () {
      let stateMachine = new StateMachine([new PassState("myPassState", "HelloWorld", "", "myTaskState", false, "", "$.result")], "myPassState");
      let resource = function (x: string){
        return x+", GoodBye single state machines.";
      }
      stateMachine.addState(new TaskState("myTaskState", resource, "", "", true, "$.result", "$.result"));
      let json = `{
          "first": 100,
          "second": 200
        }`;
      stateMachine.setInput(json);
      console.log(stateMachine.execute());
    });
  });
})