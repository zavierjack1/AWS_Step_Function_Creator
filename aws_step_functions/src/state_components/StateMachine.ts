import { State } from './State';
import { runInThisContext } from 'vm';

export class StateMachine {
    private states: State[] = [];
    private startState: string; 
    private comment: string;
    private version: string;
    private timeoutSeconds?: number;
    constructor(states: State[] = [], startState: string, comment: string = "", version: string="1.0", timeoutSeconds?: number) {
        if (states.length == 0) throw new Error("states must not be empty");
        this.states = states;
        this.startState = startState;
        this.comment = comment;
        this.version = version;
        this.timeoutSeconds = timeoutSeconds;
    }

    public getStates(): State[]{
        return this.states;
    }

    public addState(state: State) : Boolean{
        this.getStates().push(state);
        return this.validateNextStates();
    }
    
    public validate(): Boolean{
        return this.validateNextStates();
    }

    public validateNextStates(): Boolean {
        //check that each non-terminal state in the machine points to another state in the machine
        let states: State[] = this.getStates();
        let returnVal = true;
        for (let idx in states){
            if (
                //current state is not terminal
                !states[idx].isTerminal()
                &&
                //the nextstate of the current state does not match any of the statenames in the machine
                !(this.getStates().some(
                    function matchesNextState(element){
                        return (states[idx].getNextState() == element.getName());
                    }
                ))
            ){
                returnVal = false;
            }
        }
        return returnVal;
    }

    public setStates(states: State[]) : Boolean{
        if (states.length > 0) {
            this.states = [];
            states.forEach( (s) => this.addState(s));
            return this.validateNextStates();
        }
        else{
            throw new Error("can not set states to empty");
        }
    }

    public getStartState(){
        return this.startState;
    }

    public setStartState(startState: string){
        this.startState = startState;
    }
/*
    public setStartIdx(startIdx: number){
        if (startIdx < 0 || startIdx > this.getStates().length -1) {
            throw new Error("startIdx must be within array of states");
        }
        else{
            this.startIdx = startIdx;
        }
    }
*/
    public getComment(): string {
        return this.comment;
    }

    public setComment(comment: string): void {
        this.comment = comment;
    }

    public getVersion(): string {
        return this.version;
    }

    public setVersion(version: string): void {
        this.version = version;
    }

    public getTimeoutSeconds(): number|undefined {
        return this.timeoutSeconds;
    }

    public setTimeoutSeconds(timeoutSeconds: number): void {
        this.timeoutSeconds = timeoutSeconds;
    }
} 