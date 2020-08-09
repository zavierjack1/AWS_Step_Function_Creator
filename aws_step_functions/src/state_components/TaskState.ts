import { State } from "./State";
import { InputOutputPath } from "./InputOutputPath";
import { NextOrEnd } from "./NextOrEnd";
import { RetryOrCatch } from "./RetryOrCatch";
import { JsonPathCustom } from "../utility/JsonPathCustom";

export class TaskState extends State implements InputOutputPath, NextOrEnd, RetryOrCatch//, Parameters, ResultPath, , 
{
  private resource: Function;
  private nextStateName?: string;
  private endState: Boolean = false;
  private inputPath?: string;
  private outputPath?: string;
  private retries: any[];
  private catches: any[];

  constructor (
    name: string, 
    resource: Function, 
    comment?: string, 
    nextStateName?: string, 
    endState: Boolean = false, 
    inputPath?: string, 
    outputPath?: string,
    retries: any[] = [],
    catches: any[] = []
  ){
    super(name, "Task", comment);
    if (!resource) throw new Error("Task State must have a resource");
    this.nextStateName = nextStateName;
    this.endState = endState;
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.resource = resource;
    this.retries = retries;
    this.catches = catches;
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

  public getInputPath(): string {
    return (this.inputPath) ? this.inputPath : "";
  }

  public setInputPath(inputPath: string): void {
    //we need a jsonpath validator
    this.inputPath = inputPath;
  }

  public getOutputPath(): string {
    return (this.outputPath) ? this.outputPath : "";
  }

  public setOutputPath(outputPath: string): void {
    this.outputPath = outputPath;
  }

  public getRetries() : any[]{
    return this.retries;
  }
  
  public addRetry(retry: any) : void{
    this.getRetries().push(retry);
  }

  public setRetries(retries: any[]) : Boolean{
    this.retries = [];
    retries.forEach( (r) => this.addRetry(r));
    return true;
  }

  public getCatches() : any[]{
    return this.catches;
  }

  public addCatch(catch_: any) : void{
    this.getCatches().push(catch_);
  }

  public setCatches(catches: any[]) : Boolean{
    this.catches = [];
    catches.forEach( (c) => this.addCatch(c));
    return true;
  }

  public isTerminal(): Boolean{
    return this.isEndState();
  }

  public execute(input: any = "") {
    if (typeof input === 'string') input = JSON.parse((input) ? input : "{}");
    if (typeof input === 'object') input = input;
    else throw new Error("Input may only be string or valid json");
    if (this.getInputPath() && this.getOutputPath()){
      if (JsonPathCustom.containsNode(input, this.getOutputPath())){
        JsonPathCustom.value(input, this.getOutputPath(), this.getResource()(JsonPathCustom.query(input, this.getInputPath())));
        return input;
      }
      else {
        throw new Error("outputPath not found in input json");
      }
    }
    if (this.getOutputPath()) {
      JsonPathCustom.value(input, this.getOutputPath(), this.getResource()());
      return input;
    }
    this.getResource()();
    return input;
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