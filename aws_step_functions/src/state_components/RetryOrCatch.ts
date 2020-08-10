import { Catcher } from "./Catcher";

export interface RetryOrCatch{
  getRetries() : any[];
  setRetries(retries: any[]) : void;
  addRetry(retry: any) : void;

  getCatchers() : any[];
  setCatchers(cathers: Catcher[]) : void;
  addCatcher(catch_: any) : void;
}