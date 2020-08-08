import { State } from "./State";
import { InputOutputPath } from "./InputOutputPath";
import { NextOrEnd } from "./NextOrEnd";
import { JsonPathCustom } from "../utility/JsonPathCustom";

export class TaskState extends State implements InputOutputPath, NextOrEnd//, Parameters, ResultPath, , RetryCatch
{
  private resource: Function;
  private nextStateName?: string;
  private endState: Boolean = false;
  private inputPath?: string;
  private outputPath?: string;

  constructor (
    name: string, 
    resource: Function, 
    comment?: string, 
    nextStateName?: string, 
    endState?: Boolean, 
    inputPath?: string, 
    outputPath?: string
  ){
    super(name, "Task", comment);
    if (!resource) throw new Error("Task State must have a resource");
    this.setNextStateName(nextStateName);
    if (endState) this.setEndState(endState); else endState = false;
    this.setInputPath(inputPath);
    this.setOutputPath(outputPath);
    this.resource = resource;
  }

  public setResource(resource: Function){
    this.resource = resource;
  }

  public getResource(){
    return this.resource;
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
    //we need a jsonpath validator
    this.inputPath = inputPath;
  }

  public getOutputPath(): string | undefined{
    return this.outputPath;
  }

  public setOutputPath(outputPath: string | undefined): void {
    this.outputPath = outputPath;
  }

  public isTerminal(): Boolean{
    return this.isEndState();
  }

  public execute(input?: string) {
    let output = JSON.parse(input ? input : "{}"); 
    if (this.getInputPath() && this.getOutputPath()){
      JsonPathCustom.value(output, this.getOutputPath(), 
        this.getResource()(JsonPathCustom.query(output, this.getInputPath()))
      );
      return output;
    }
    if (this.getOutputPath()) {
      JsonPathCustom.value(output, this.getOutputPath(), this.getResource()());
      return output;
    }
    this.getResource()();
    return output;
  }

  public validateNextStateName() : Boolean {
    if (this.isTerminal() || this.getNextStateName() != "") return true;
    return false;
  }

  public toString() : string{
    return '"'+this.getName()+'":'
    +'{'
        +'"Type":"'+this.getType()+'"'
        +',"Resource":"'+this.getResource()+'"' 
        + ( (this.getComment()) ? ',"Comment":"'+this.getComment()+'"': '') 
        + ( (this.getNextStateName()) ? ',"Next":"'+this.getNextStateName()+'"' : '') 
        + ( (this.isTerminal()) ? ',"End":'+this.isTerminal() : '') 
        + ( (this.getInputPath()) ? ',"InputPath":"'+this.getInputPath()+'"' : '')
        + ( (this.getOutputPath()) ? ',"OutputPath":"'+this.getOutputPath()+'"' : '')
    + '}';
  }
}