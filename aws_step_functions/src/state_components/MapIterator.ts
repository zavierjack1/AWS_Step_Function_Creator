import { State } from "./State";
import { PassState } from "./PassState";
import { TaskState } from "./TaskState";

export class MapIterator{
  private states: State[] = [];
  private startState: string; 

  constructor(states: State[] = [], startState: string = "") {
    this.states = states;
    this.startState = startState;
  }

  public getStates(): State[]{
    return this.states;
  }

  public addState(state: State) : Boolean{
    if (!this.stateNameIsUnique(state.getName())) {
        throw new Error("State names must be unique");
    }
    this.getStates().push(state);
    return this.validateNextStates();
  }

  public setStates(states: State[]) : Boolean{
    if (states.length > 0) {
      this.states = [];
      states.forEach( (s) => this.addState(s));
      return this.validateNextStates();
    }
    else{
      throw new Error("can not set states to empty");
    }
  }

  public getStartStateName(){
    return this.startState;
  }

  public setStartStateName(startState: string){
      this.startState = startState;
  }

  public isValid(): Boolean{
    return this.validateNextStates() &&
      this.validateCatchNextStates() &&
      this.validateStartStateName() && //add this to StateMachine
      this.getStates().length > 0;
  }

  public stateNameIsUnique(stateName : string) : Boolean {
    if (this.getStates().some(element => { 
        return element.getName() == stateName;
    })) {
        return false;
    }
    
    return true;
  }

  public validateNextStates(): Boolean {
    //check that each non-terminal state in the machine points to another state in the machine
    let states: State[] = this.getStates();
    
    let returnVal = true;
    for (let idx in states){
      if (
        //current state is not terminal
        !states[idx].isTerminal()
        &&
        //the nextstate of the current state match a statename in the machine
        !(this.getStates().some(
            function matchesNextState(element){
              if (states[idx] instanceof PassState) return (<PassState> states[idx]).getNextStateName() == element.getName();
              if (states[idx] instanceof TaskState) return (<TaskState> states[idx]).getNextStateName() == element.getName();
              return false;
            }
        ))
      ){
        returnVal = false;
      }
    }
    return returnVal;
  }

  public validateCatchNextStates(): Boolean {
    //check that each task state w/ Catchers in the machine points to another state in the machine
    let states: State[] = this.getStates();
    let returnVal = true;
    for (let idx in states){
      if (states[idx] instanceof TaskState){
        let taskState = <TaskState> states[idx];
        if (taskState.getCatchers().length > 0){
          if (!this.getStates().some(
            function matchesNextState(element){
              return taskState.getCatchers()[0].getNextStateName() == element.getName()
            }
          )){
            returnVal = false;
          }
        }
      }
    }
    return returnVal;
  }

  public validateStartStateName(): Boolean{
    return this.getStates().some(
      state => {
        return state.getName() == this.getStartStateName();
      }
    );
  }
}