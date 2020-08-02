import { State } from "./State";
import { Executable } from "./Executable";

export class PassState extends State implements Executable{
  private result?: string;
  constructor (name: string, result?: string, comment?: string, nextState?: string, endState?: Boolean){
    super(name, "Pass", comment, nextState, endState);
    this.result = result;
  }

  public getResult(){
    return this.result;
  }

  public setResult(result: string){
    this.result = result;
  }

  public execute() {
    return this.getResult();
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