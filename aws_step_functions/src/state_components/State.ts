import { StateMachine } from "./StateMachine";

export class State {
  private name: string;
  private type: string;
  private comment?: string;
  private nextStateName?: string;
  private endState: Boolean = false;
  
  constructor (name: string, type: string, comment?: string, nextStateName?: string, endState?: Boolean){
    if (this.validateName(name)) this.name = name; else this.name = "";
    this.type = type;
    if (comment) this.setComment(comment);
    if (nextStateName) this.setNextStateName(nextStateName); 
    if (endState) this.setEndState(endState); else this.setEndState(false);
  }

  public validateName(name: string): Boolean{
      if (name.trim().length == 0 || name.length > 128) throw new Error("name must be <= 128 char");
      return true;
  }

  public validatenextStateName() : Boolean {
      if (!this.isTerminal || this.getNextStateName() != "") return true;
      return false;
  }

  public getName(): string {
      return this.name;
  }

  public setName(name: string): void {
      if (this.validateName(name)) this.name = name;
  }

  public getType(): string {
      return this.type;
  }

  private setType(type: string): void {
      this.type = type;
  }

  public getComment(): string | undefined {
      return this.comment;
  }

  public setComment(comment: string): void {
      this.comment = comment;
  }

  public getNextStateName(): string | undefined{
      return this.nextStateName;
  }

  public setNextStateName(nextStateName: string): void {
      this.nextStateName = nextStateName;
  }

  public isEndState(): Boolean{
      return this.endState;
  }

  public setEndState(endState: Boolean): void{
      if (endState && !(this.getType() == "Choice" || this.getType() == "Succeed" || this.getType() == "Fail")){
          this.endState = endState;
      }
      else if (endState) {
          throw new Error("you can only set EndState if type == Choice, type == Succeed, or type == Fail");
      }
      else{
          this.endState = endState;
      }
  }

  public isTerminal(): Boolean{
      if (this.isEndState() || this.getType() == "Succeed" || this.getType() == "Fail") return true;
      return false; 
  }

  public toString() : string {
    return '"'+this.getName()+'":'
      +'{'
        +'"Type":"'+this.getType()+'"'
        + ( (this.getComment()) ? ',"Comment":"'+this.getComment()+'"': '') 
        + ( (this.getNextStateName()) ? ',"Next":'+this.getNextStateName() : '') 
        + ( (this.isEndState()) ? ', "End":"'+this.isEndState()+'"' : '') 
      + '}';
  }
}