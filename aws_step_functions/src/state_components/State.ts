export class State {
    private name: string;
    private type: string;
    private comment: string;
    private nextState: string;
    private endState: Boolean = false;
    constructor (name: string, type: string, comment: string = "", nextState: string = "", endState: Boolean = false){
        if (!name) throw new Error("all params required");
        if (!type) throw new Error("type required")
        if (this.validateName(name)){
            this.name = name;
        }
        else{
            this.name = "" //unreachable
        }
        this.type = type;
        this.comment = comment;
        this.nextState = nextState;
        this.setEndState(endState); 
    }

    public validateName(name: string): Boolean{
        if (name.length > 128) throw new Error("name must be <= 128 char");
        return true;
    }

    public getName(): string {
        return this.name;
    }
 
    public setName(name: string): void {
        if (this.validateName(name)) this.name = name;
    }

    public getType(): string {
        return this.type;
    }

    //public setType(type: string): void {
    //    this.type = type;
    //}

    public getComment(): string {
        return this.comment;
    }

    public setComment(comment: string): void {
        this.comment = comment;
    }

    public getNextState(): string {
        return this.nextState;
    }

    public setNextState(nextState: string): void {
        this.nextState = nextState;
    }

    public isEndState(): Boolean{
        return this.endState;
    }

    public setEndState(endState: Boolean): void{
        //Todo: if not type = choice, succeed, or fail. you may set EndState
        if (endState && !(this.getType() == "Choice" || this.getType() == "Succeed" || this.getType() == "Fail")){
            this.endState = endState;
        }
        else if (endState) {
            throw new Error("you can only set EndState if type == Choice, type == Succeed, or type == Fail");
        }
        else{
            this.endState = endState;
        }
    }

    public isTerminal(): Boolean{
        if (this.isEndState() || this.getType() == "Succeed" || this.getType() == "Fail") return true;
        return false; 
    }
}