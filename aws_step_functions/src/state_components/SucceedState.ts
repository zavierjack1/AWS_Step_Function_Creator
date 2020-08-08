import { State } from "./State";
import { InputOutputPath } from "./InputOutputPath";

export class SucceedState extends State implements InputOutputPath{
  private inputPath?: string;
  private outputPath?: string;

  constructor (
    name: string,  
		comment?: string,
		inputPath?: string, 
		outputPath?: string
  ){
    super(name, "Succeed", comment);
		this.inputPath = inputPath;
		this.outputPath = outputPath;
  }

  public getInputPath(): string | undefined{
    return this.inputPath;
  }

  public setInputPath(inputPath: string | undefined): void {
    //if json invalid parse will throw SyntaxError
    this.inputPath = inputPath;
  }

  public getOutputPath(): string | undefined{
    return this.outputPath;
  }

  public setOutputPath(outputPath: string | undefined): void {
    //if json invalid parse will throw SyntaxError
    if (outputPath && JSON.parse(outputPath)) this.outputPath = outputPath;
  }

	public isTerminal(): Boolean {
		return true;
	}
  public toString() : string{
    return '"'+this.getName()+'":'
      +'{'
        +'"Type":"'+this.getType()+'"'
        + ( (this.getComment()) ? ',"Comment":"'+this.getComment()+'"': '') 
        + ( (this.isTerminal()) ? ',"End":'+this.isTerminal() : '') 
				+ ( (this.getInputPath()) ? ',"InputPath":"'+this.getInputPath()+'"' : '') 
				+ ( (this.getOutputPath()) ? ',"OutputPath":"'+this.getInputPath()+'"' : '') 
      + '}';
  }
} 