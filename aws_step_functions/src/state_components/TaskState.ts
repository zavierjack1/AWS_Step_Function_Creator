import { State } from "./State";
import { Executable } from "./Executable";
var JsonPath = require('jsonpath');

export class TaskState extends State implements Executable{
    public resource: Function;
    constructor (
      name: string, 
      resource: Function, 
      comment?: string, 
      nextState?: string, 
      endState?: Boolean
    ){
      if (!resource) throw new Error("Task State must have a resource");
      super(name, "Task", comment, nextState, endState);
      this.resource = resource;
    }

    public setResource(resource: Function){
      this.resource = resource;
    }

    public getResource(){
      return this.resource;
    }

    public execute(rawInput?: string) {
      if (rawInput){
        let output = this.getResource()(JsonPath.query(JSON.parse(rawInput), this.getInputPath()));

        //if (this.getOutputPath()) 
      } 
      return this.getResource()();
    }

    public toString() : string{
      return '"'+this.getName()+'":'
      +'{'
          +'"Type":"'+this.getType()+'"'
          +',"Resource":"'+this.getResource()+'"' 
          + ( (this.getComment()) ? ',"Comment":"'+this.getComment()+'"': '') 
          + ( (this.getNextStateName()) ? ',"Next":"'+this.getNextStateName()+'"' : '') 
          + ( (this.isEndState()) ? ',"End":'+this.isEndState() : '') 
      + '}';
    }
}