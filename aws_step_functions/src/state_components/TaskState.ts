import { State } from "./State";

export class TaskState extends State{
    //private resource: string;
    public resource: Function;
    constructor (name: string, resource: Function, comment: string = "", nextState: string = "", endState: Boolean = false){
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