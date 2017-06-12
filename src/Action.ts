import Base = Mocha.reporters.Base;
import {getFullClassNameFromClass} from "./ClassHelpers";
export enum ActionState {
  RUNNING,
  FINISHED,
  FAILED
}

export class ActionHolder<A extends BaseAction<R>, R> {
  readonly action: A;
  readonly state: ActionState;
  readonly error: Error | null;
  readonly result: R | null;

  constructor(action: A, state: ActionState, error: Error | any, result: any | R) {
    this.action = action;
    this.state = state;
    this.error = error;
    this.result = result;
  }
}

export const startAction = <A extends BaseAction<R>, R>(action: A): ActionHolder<A, R> => {
  return new ActionHolder<A, R>(action, ActionState.RUNNING, null, null);
};

export const finishAction = <A extends BaseAction<R>, R>(action: A, result: R): ActionHolder<A, R> => {
  return new ActionHolder<A, R>(action, ActionState.FINISHED, null, result);
};

export const failAction = <A extends BaseAction<R>, R>(action: A, error: Error): ActionHolder<A, R> => {
  return new ActionHolder<A, R>(action, ActionState.FAILED, error.message, null);
};

const actionIds: any = {};

const nextActionId = (action: any): string => {
  const actionName = getFullClassNameFromClass(action.constructor).join("/");

  if (actionIds[actionName] === undefined) {
    actionIds[actionName] = 1;
  }

  const actionId = actionIds[actionName]++;

  return `${actionName}-${actionId}`;
};

export class BaseAction<T> {
  protected readonly __genericStub__DO_NOT_USE: T;
  private __id = nextActionId(this);
}
