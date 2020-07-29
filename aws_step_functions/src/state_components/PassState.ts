import { State } from "./State";

export class PassState extends State{
    constructor (name: string, comment: string = "", nextState: string = "", endState: Boolean = false){
        super(name, "Pass", comment, nextState, endState);
    }
} 