import { State } from './State';
import { Executable } from './Executable';
import { PassState } from './PassState';
import { TaskState } from './TaskState';

export class StateMachine implements Executable{
  private states: State[] = [];
  private startState: string; 
  private comment: string;
  private version: string;
  private timeoutSeconds?: number;

  constructor(states: State[] = [], startState: string, comment: string = "", version: string="1.0", timeoutSeconds?: number) {
    if (states.length == 0) throw new Error("states must not be empty");
    this.states = states;
    this.startState = startState;
    this.comment = comment;
    this.version = version;
    this.timeoutSeconds = timeoutSeconds;
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
        //the nextstate of the current state does not match any of the statenames in the machine
        !(this.getStates().some(
            function matchesNextState(element){
                return (states[idx].getNextStateName() == element.getName());
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
      return this.comment;
  }

  public setComment(comment: string): void {
      this.comment = comment;
  }

  public getVersion(): string {
      return this.version;
  }

  public setVersion(version: string): void {
      this.version = version;
  }

  public getTimeoutSeconds(): number|undefined {
      return this.timeoutSeconds;
  }

  public setTimeoutSeconds(timeoutSeconds: number): void {
      this.timeoutSeconds = timeoutSeconds;
  }

  public execute() : any[]{
    let currentState: State | undefined;
    let results: any[] = [];
    currentState = this.getStates().find(element => {
      return element.getName() == this.getStartStateName();
    })

    while (true){
      if (currentState instanceof PassState || currentState instanceof TaskState) results.push(currentState.execute());

      currentState = this.getStates().find(element => {
        return (currentState) ? element.getName() == currentState.getNextStateName() : false;
      })

      if (currentState == undefined || currentState.isTerminal()) break;
    }
    return results;
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
        //console.log(state.toJSON());
    }
    json = json+"}";
    return json;
  }
} 