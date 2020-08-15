import { State } from "./State";
import { StateMachine } from "./StateMachine";

export class MapIterator extends StateMachine{
  constructor(states: State[], startState: string, comment?: string, version: string="1.0", timeoutSeconds?: number) {
    super(states, startState, comment, version, timeoutSeconds);
  }
}