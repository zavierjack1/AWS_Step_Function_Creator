import { State } from "./State";

export class FailState extends State{
  constructor (
    name: string,  
		comment?: string,
  ){
    super(name, "Fail", comment);
  }

  public isTerminal(): Boolean {
      return true;
  }
  public toString() : string{
    return '"'+this.getName()+'":'
      +'{'
        +'"Type":"'+this.getType()+'"'
        + ( (this.getComment()) ? ',"Comment":"'+this.getComment()+'"': '') 
        + ( (this.isTerminal()) ? ',"End":'+this.isTerminal() : '') 
      + '}';
  }
} 