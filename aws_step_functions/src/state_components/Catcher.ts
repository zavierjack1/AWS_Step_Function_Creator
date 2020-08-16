export class Catcher
{
  private nextStateName: string;
  private errorEquals: string[];

  constructor (
    nextStateName: string
    //errorEquals: string[] = ['States.ALL'] //for now only support this error
  ){
    this.nextStateName = nextStateName;
    this.errorEquals = ['States.ALL'];
  };

  public getNextStateName(): string | undefined{
    return this.nextStateName;
  }

  public setNextStateName(nextStateName: string): void {
    this.nextStateName = nextStateName;
  }

  public getErrorEquals(): string[]{
    return this.errorEquals;
  }
  
  public toString() : string{
    return '{'+
      '"ErrorEquals": ["States.ALL"],'+
      '"Next": "'+this.getNextStateName()+'"'+
    '}';
  }
}