export abstract class State {
  private name: string;
  private type: string;
  private comment?: string;

  constructor (
    name: string, 
    type: string, 
    comment?: string
  ){
    if (this.validateName(name)) this.name = name; else this.name = "";
    this.type = type;
    this.setComment(comment);
  }

  public validateName(name: string): Boolean{
    if (name.trim().length == 0 || name.length > 128) throw new Error("name must be <= 128 char");
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

  private setType(type: string): void {
    this.type = type;
  }

  public getComment(): string | undefined {
    return this.comment;
  }

  public setComment(comment: string | undefined): void {
    this.comment = comment;
  }
  
  public abstract isTerminal(): Boolean; /*{
    if (this.getType() == "Succeed" || this.getType() == "Fail") return true;
    return false; 
  }*/
}