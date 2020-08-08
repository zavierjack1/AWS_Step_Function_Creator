import { State } from "./State";
import { Executable } from "./Executable";
import { InputOutputPath } from "./InputOutputPath";
var JsonPath = require('jsonpath');
export class PassState extends State implements Executable, InputOutputPath{
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
    //if json invalid parse will throw SyntaxError
    this.inputPath = inputPath;
  }

  public getOutputPath(): string | undefined{
    return this.outputPath;
  }

  public setOutputPath(outputPath: string | undefined): void {
    //if json invalid parse will throw SyntaxError
    if (outputPath) this.outputPath = outputPath;
  }

  public execute(rawInput?: string) {
    if (rawInput){
      rawInput = JSON.parse(rawInput); //converts string to jsonObject and validates
      //let resoureResult = this.getResource()(JsonPath.query(rawInput, this.getInputPath()));
      if (this.getOutputPath()) {
        JsonPath.value(rawInput, this.getOutputPath(), this.getResult());
        return rawInput;
      }
      return this.getResult();
    }
    return this.getResult();
  }

  public isTerminal(): Boolean{
    return this.isEndState();
  }

  public toString() : string{
    return '"'+this.getName()+'":'
      +'{'
        +'"Type":"'+this.getType()+'"'
        + ( (this.getComment()) ? ',"Comment":"'+this.getComment()+'"': '') 
        + ( (this.getNextStateName()) ? ',"Next":"'+this.getNextStateName()+'"' : '') 
        + ( (this.isEndState()) ? ',"End":'+this.isEndState() : '') 
        + ( (this.getResult()) ? ',"Result":"'+this.getResult()+'"' : '') 
      + '}';
  }
} 