import { Catcher } from "./Catcher";
import { InputOutputPath } from "./InputOutputPath";
import { NextOrEnd } from "./NextOrEnd";
import { RetryOrCatch } from "./RetryOrCatch";
import { JsonPathCustom } from "../utility/JsonPathCustom";
import { TaskState } from "./TaskState";
import { MapIterator } from "./MapIterator";

export class MapState extends TaskState implements InputOutputPath, NextOrEnd, RetryOrCatch
{
  private mapIterator: MapIterator;
  
  constructor (
    name: string,  
    mapIterator: MapIterator,
    comment?: string, 
    nextStateName?: string, 
    endState: Boolean = false, 
    inputPath?: string, 
    outputPath?: string,
    catchers: Catcher[] = [],
    retries: any[] = [],
  ){
    super(name, function(){throw Error("Map States have no resource")}, comment, nextStateName, endState, inputPath, outputPath, catchers, retries);
    this.setType("Map");
    this.setResource(this.execute);
    this.mapIterator = mapIterator;
  }

  public isTerminal(): Boolean{
    return this.isEndState();
  }
  
  public execute(input: any = "") :any  {
    if (!this.getInputPath()) throw new Error("MapStates require an inputPath");
    if (typeof input === 'string') input = JSON.parse((input) ? input : "{}");
    if (typeof input === 'object') null;
    else throw new Error("Input may only be string or valid json");
    if (this.getInputPath() && this.getOutputPath()){
      if (JsonPathCustom.containsNode(input, this.getOutputPath())){
        let inputArray = JsonPathCustom.query(input, this.getInputPath());
        if (Array.isArray(JsonPathCustom.query(input, this.getInputPath())[0])) inputArray = JsonPathCustom.query(input, this.getInputPath())[0];
        //else inputArray = JsonPathCustom.query(input, this.getInputPath());
        inputArray.forEach((element: string | object, index: number)=> {
          inputArray[index] = this.getMapIterator().execute(element);
        });
        JsonPathCustom.value(input, this.getOutputPath(), inputArray);
        return input;
      }
      else {
        throw new Error("outputPath not found in input json");
      }
    }
    if (this.getInputPath() && !this.getOutputPath()){
      let inputArray: any[] = JsonPathCustom.query(input, this.getInputPath())[0];
      let count = 0;
      inputArray.forEach((element: string | object, index: number)=> {
        inputArray[index] = this.getMapIterator().execute(element);
        count++;
      });
      return input;
    }
  }

  public validateNextStateName() : Boolean {
    if (this.isTerminal() || this.getNextStateName() != "") return true;
    return false;
  }

  public getMapIterator() : MapIterator {
    return this.mapIterator;
  }

  public setMapIterator(mapIterator : MapIterator) : void {
    this.mapIterator = mapIterator;
  }

  public toString() : string{
    return '"'+this.getName()+'":'
    +'{'
        +'"Type":"'+this.getType()+'"'
        + ( (this.getComment()) ? ',"Comment":"'+this.getComment()+'"': '') 
        + ( (this.getNextStateName()) ? ',"Next":"'+this.getNextStateName()+'"' : '') 
        + ( (this.isTerminal()) ? ',"End":'+this.isTerminal() : '') 
        + ( (this.getInputPath()) ? ',"InputPath":"'+this.getInputPath()+'"' : '')
        + ( (this.getOutputPath()) ? ',"OutputPath":"'+this.getOutputPath()+'"' : '')
        + ( (this.getCatchers().length > 0) ? ", Catch: "+this.getCatchers()[0].toString() : "")
        + ( ', "Iterator": '+ this.getMapIterator().toString())
    + '}';
  }
}