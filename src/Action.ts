import {getActionName} from "./ClassHelpers";

export enum ActionState {
  INITIAL,
  RUNNING,
  FINISHED,
  FAILED,
}

export interface ActionHolder<A extends BaseAction<R>, R> {
  readonly type: string;
  readonly action: A;
  readonly state: ActionState;
  readonly error: Error | null;
  readonly result: R | null;
}

export interface StartedActionHolder<A extends BaseAction<R>, R> {
  readonly action: A;
}

export interface SucceededActionHolder<A extends BaseAction<R>, R> {
  readonly action: A;
  readonly result: R;
}

export interface FailedActionHolder<A extends BaseAction<R>, R> {
  readonly action: A;
  readonly error: Error;
}

export const emptyActionHolder = <A extends BaseAction<R>, R>(type: string = "empty_action_holder"): ActionHolder<A, R> => {
  return {
    type: type,
    action: null as any,
    state: ActionState.INITIAL,
    result: null,
    error: null,
  };
};

export const startAction = <A extends BaseAction<R>, R>(action: A): ActionHolder<A, R> => {
  return {
    type: getActionName(action),
    action: action,
    state: ActionState.RUNNING,
    result: null,
    error: null,
  };
};

export const finishAction = <A extends BaseAction<R>, R>(action: A, result: R): ActionHolder<A, R> => {
  return {
    type: getActionName(action),
    action: action,
    state: ActionState.FINISHED,
    result: result,
    error: null,
  };
};

export const failAction = <A extends BaseAction<R>, R>(action: A, error: Error): ActionHolder<A, R> => {
  return {
    type: getActionName(action),
    action: action,
    state: ActionState.FAILED,
    result: null,
    error: error,
  };
};

export class BaseAction<T> {
  // @ts-ignore: noUnusedParameters
  protected readonly __genericStub__DO_NOT_USE: T;
  // tslint:disable-next-line:readonly-keyword
  public __targetKey?: string;
}
