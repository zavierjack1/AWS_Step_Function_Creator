export interface RetryOrCatch{
  getRetries() : any[];
  addRetry(retry: any) : void;

  getCatches() : any[];
  addCatch(catch_: any) : void;
}