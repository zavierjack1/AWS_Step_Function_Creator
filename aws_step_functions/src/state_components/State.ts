import { StateMachine } from "./StateMachine";

export class State {
  private name: string;
  private type: string;
  private comment?: string;
  private nextStateName?: string;
  private endState: Boolean = false;
  private inputPath?: string;
  private outputPath?: string;

  constructor (
    name: string, 
    type: string, 
    comment?: string, 
    nextStateName?: string, 
    endState?: Boolean, 
    inputPath?: string, 
    outputPath?: string
  ){
    if (this.validateName(name)) this.name = name; else this.name = "";
    this.type = type;
    this.setComment(comment);
    this.setNextStateName(nextStateName);
    if (endState) this.setEndState(endState); else endState = false;
    this.setInputPath(inputPath);
    this.setOutputPath(outputPath);
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

  public setComment(comment: string | undefined): void {
    this.comment = comment;
  }

  public getNextStateName(): string | undefined{
    return this.nextStateName;
  }

  public setNextStateName(nextStateName: string | undefined): void {
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

  public getInputPath(): string | undefined{
    return this.inputPath;
  }

  public setInputPath(inputPath: string | undefined): void {
    //if json invalid parse will throw SyntaxError
    this.inputPath = inputPath;
  }

  public getOutputPath(): string | undefined{
    return this.outputPath;
  }

  public setOutputPath(outputPath: string | undefined): void {
    //if json invalid parse will throw SyntaxError
    if (outputPath && JSON.parse(outputPath)) this.outputPath = outputPath;
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