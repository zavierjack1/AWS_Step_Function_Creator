import { State } from "./State";
import { Simulate } from "./Simulate";

export class TaskState extends State implements Simulate{
    public resource: Function;
    constructor (name: string, resource: Function, comment?: string, nextState?: string, endState?: Boolean){
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

    public simulate() {
        return this.getResource()();
    }
}