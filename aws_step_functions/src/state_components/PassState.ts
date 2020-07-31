import { State } from "./State";
import { Simulate } from "./Simulate";

export class PassState extends State implements Simulate{
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
    
    public simulate() {
        return this.getResult();
    }
} 