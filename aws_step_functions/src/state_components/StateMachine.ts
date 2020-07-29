import { State } from './State';

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

    public setStates(states: State[]){
        if (states.length > 0) {
            this.states = states;
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