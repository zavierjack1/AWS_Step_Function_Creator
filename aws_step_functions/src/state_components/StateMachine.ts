import { State } from './State';
import { runInThisContext } from 'vm';

export class StateMachine {
    private states: State[] = [];
    private startIdx: number; 
    private comment: string;
    private version: string;
    private timeoutSeconds?: number;
    constructor(states: State[] = [], startIdx: number, comment: string = "", version: string="1.0", timeoutSeconds?: number){
        if (states.length == 0) throw new Error("states must not be empty");
        if (startIdx < 0 || startIdx > states.length -1) throw new Error("startIdx must be within array");
        this.states = states;
        this.startIdx = startIdx;
        this.comment = comment;
        this.version = version;
        this.timeoutSeconds = timeoutSeconds;
    }

    public getStates(): State[]{
        return this.states;
    }

    public addState(state: State){
        this.getStates().push(state);
    }

    /*ADD ME TO STATE MACHINE COMPILATION
    public addState(state: State) {
        //check that the addState's nextState matches the name of a current state in the Machine
        //or that the state is terminal
        if (
            this.getStates().some(
                function containsNextState(element, index, array) { 
                    return (element.getName() == state.getNextState());           
                } 
            )
            ||
            state.isTerminal()
        ) {
            this.getStates().push(state);
        }
        else{
            throw new Error("non-terminal states added to a StateMachine must have a nextState that already exists in the machine");
        }
    }
    */
    public setStates(states: State[]){
        if (states.length > 0) {
            this.states = [];
            states.forEach( (s) => this.addState(s));
        }
        else{
            throw new Error("can not set states to empty");
        }
    }

    public getStartIdx(){
        return this.startIdx;
    }

    public setStartIdx(startIdx: number){
        if (startIdx < 0 || startIdx > this.getStates().length -1) {
            throw new Error("startIdx must be within array of states");
        }
        else{
            this.startIdx = startIdx;
        }
    }

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