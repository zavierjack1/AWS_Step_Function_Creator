export interface NextOrEnd{
  getNextStateName() : string | undefined;
  setNextStateName(nextStateName : string | undefined): void;

  isEndState() : Boolean;
  setEndState(endState : Boolean): void;
  isTerminal() : Boolean;
  validateNextStateName() : Boolean;
}