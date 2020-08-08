import { State } from './State';
import { Executable } from './Executable';
import { PassState } from './PassState';
import { TaskState } from './TaskState';
import { NextOrEnd } from './NextOrEnd';

export class StateMachine implements Executable{
  private states: State[] = [];
  private startState: string; 
  private comment?: string;
  private version: string;
  private timeoutSeconds?: number;
  private input?: string;

  constructor(states: State[] = [], startState: string, comment?: string, version: string="1.0", timeoutSeconds?: number, input?: string) {
    if (states.length == 0) throw new Error("states must not be empty");
    this.states = states;
    this.startState = startState;
    this.setComment(comment);
    this.version = version;
    this.setTimeoutSeconds(timeoutSeconds);
    this.setInput(input);
  }

  public getStates(): State[]{
    return this.states;
  }

  public addState(state: State) : Boolean{
    if (!this.validateState(state)) {
        throw new Error("State names must be unique");
    }
    this.getStates().push(state);
    return this.validateNextStates();
  }

  public validate(): Boolean{
    return this.validateNextStates();
  }

  public stateNameIsUnique(stateName : string) : Boolean {
    if (this.getStates().some(element => { 
        return element.getName() == stateName;
    })) {
        return false;
    }
    
    return true;
  }

  public validateState(state: State): Boolean{
    return this.stateNameIsUnique(state.getName());
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

  public getComment(): string {
      return this.comment ? this.comment : "";
  }

  public setComment(comment: string | undefined): void {
      this.comment = comment;
  }

  public getVersion(): string {
      return this.version;
  }

  public setVersion(version: string): void {
      this.version = version;
  }

  public getTimeoutSeconds(): number | undefined {
      return this.timeoutSeconds;
  }

  public setTimeoutSeconds(timeoutSeconds: number | undefined): void {
      this.timeoutSeconds = timeoutSeconds;
  }

  public getInput(): string {
    return (this.input) ? this.input : "";
  }

  public setInput(input: string | undefined): void {
    //if json invalid parse will throw SyntaxError
    if (input && JSON.parse(input)) this.input = input;
  }

  public execute() : string {
    let currentState: State | undefined;
    let results: any[] = [];
    currentState = this.getStates().find(element => {
      return element.getName() == this.getStartStateName();
    })

    while (true){
      if (currentState instanceof PassState || currentState instanceof TaskState){
        let output = currentState.execute(this.getInput());
        if (output) this.setInput(JSON.stringify(output));
      }
      if (currentState == undefined || currentState.isTerminal()) break;
      currentState = this.getStates().find(element => {
        if (currentState instanceof PassState) return (<PassState> currentState) ? element.getName() == currentState.getNextStateName() : false;
        if (currentState instanceof TaskState) return (<TaskState> currentState) ? element.getName() == currentState.getNextStateName() : false;
      })
    }
    return this.getInput();
  }

  public toString(){
    let json = '{'
        + '"StartAt":"'+this.getStartStateName()+'"'
        + ', "Version":"'+this.getVersion()+'"' 
        + ( (this.getComment().trim()) ? ', "Comment":"'+this.getComment()+'"' : '') 
        + ( (this.getTimeoutSeconds()) ? ', "TimeoutSeconds":'+this.getTimeoutSeconds() : ''); 
      //+"}";
    
    for (let state of this.getStates()){
        json = json+", "+state.toString();
    }
    json = json+"}";
    return json;
  }
} 