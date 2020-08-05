export interface InputOutputPath{
    getInputPath(): string | undefined;
    setInputPath(inputPath: string | undefined): void;
    
    getOutputPath(): string | undefined;
    setOutputPath(outputPath: string | undefined): void;
}