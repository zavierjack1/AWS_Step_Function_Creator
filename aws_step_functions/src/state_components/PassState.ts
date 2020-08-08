import { State } from "./State";
import { InputOutputPath } from "./InputOutputPath";
import { NextOrEnd } from "./NextOrEnd";
var JsonPath = require('jsonpath');
export class PassState extends State implements InputOutputPath, NextOrEnd{
  private result?: string;
  private nextStateName?: string;
  private endState: Boolean = false;
  private inputPath?: string;
  private outputPath?: string;

  constructor (
    name: string, 
    result?: any, 
    comment?: string, 
    nextStateName?: string, 
    endState?: Boolean, 
    inputPath?: string, 
    outputPath?: string, 
  ){
    super(name, "Pass", comment);
    this.setNextStateName(nextStateName);
    if (endState) this.setEndState(endState); else endState = false;
    this.setInputPath(inputPath);
    this.setOutputPath(outputPath);
    this.result = result;
  }

  public getResult(){
    return this.result;
  }

  public setResult(result: string){
    this.result = result;
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

  public getInputPath(): string | undefined{
    return this.inputPath;
  }

  public setInputPath(inputPath: string | undefined): void {
    this.inputPath = inputPath;
  }

  public getOutputPath(): string | undefined{
    return this.outputPath ? this.outputPath : "";
  }

  public setOutputPath(outputPath: string | undefined): void {
    if (outputPath) this.outputPath = outputPath;
  }

  public execute(input?: string) {
    let output = JSON.parse(input ? input : "{}");
    if(this.getOutputPath()){
      JsonPath.value(output, this.getOutputPath(), this.getResult());
      return output;
    }
    return output;
  }

  public isTerminal(): Boolean{
    return this.isEndState();
  }

  public validateNextStateName() : Boolean {
    if (this.isTerminal() || this.getNextStateName() != "") return true;
    return false;
  }

  public toString() : string{
    return '"'+this.getName()+'":'
    +'{'
        +'"Type":"'+this.getType()+'"'
        +',"Result":"'+this.getResult()+'"' 
        + ( (this.getComment()) ? ',"Comment":"'+this.getComment()+'"': '') 
        + ( (this.getNextStateName()) ? ',"Next":"'+this.getNextStateName()+'"' : '') 
        + ( (this.isTerminal()) ? ',"End":'+this.isTerminal() : '') 
        + ( (this.getInputPath()) ? ',"InputPath":"'+this.getInputPath()+'"' : '')
        + ( (this.getOutputPath()) ? ',"OutputPath":"'+this.getOutputPath()+'"' : '')
    + '}';
  }
} 