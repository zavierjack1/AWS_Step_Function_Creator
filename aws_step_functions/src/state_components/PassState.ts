import { State } from "./State";
import { InputOutputPath } from "./InputOutputPath";
import { NextOrEnd } from "./NextOrEnd";
import { JsonPathCustom } from "../utility/JsonPathCustom";

export class PassState extends State implements InputOutputPath, NextOrEnd{
  private result?: any;
  private nextStateName?: string;
  private endState: Boolean = false;
  private inputPath?: string;
  private outputPath?: string;

  constructor (
    name: string, 
    result?: any, 
    comment?: string, 
    nextStateName?: string, 
    endState: Boolean = false, 
    inputPath?: string, 
    outputPath?: string, 
  ){
    super(name, "Pass", comment);
    this.setNextStateName(nextStateName);
    this.endState = endState;
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.result = result;
  }

  public getResult() : any{
    return this.result;
  }

  public setResult(result: string) : void{
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

  public getOutputPath(): string{
    return this.outputPath ? this.outputPath : "";
  }

  public setOutputPath(outputPath: string): void {
    if (outputPath) this.outputPath = outputPath;
  }

  public execute(input: any = "") : any {
    if (typeof input === 'string') input = JSON.parse((input) ? input : "{}");
    else if (typeof input === 'object') input = input;
    else throw new Error("Input may only be string or valid json");
    if(this.getOutputPath()){
      if (JsonPathCustom.containsNode(input, this.getOutputPath())){
        JsonPathCustom.value(input, this.getOutputPath(), this.getResult());
        return input;
      }
      else{
        throw new Error("outputPath not found in input json");
      }
    }
    return input;
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