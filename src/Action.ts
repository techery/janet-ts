import Base = Mocha.reporters.Base;
export enum ActionState {
  RUNNING,
  FINISHED,
  FAILED
}

export interface ActionHolder<A extends BaseAction<R>, R> {
  action: A;
  state: ActionState;
  error: Error | null;
  result: R | null;
}

export const startAction = <A extends BaseAction<R>, R>(action: A): ActionHolder<A, R> => {
  return {
    action: action,
    state: ActionState.RUNNING,
    error: null,
    result: null,
  };
};

export const finishAction = <A extends BaseAction<R>, R>(action: A, result: R): ActionHolder<A, R> => {
  return {
    action: action,
    state: ActionState.FINISHED,
    error: null,
    result: result,
  };
};

export const failAction = <A extends BaseAction<R>, R>(action: A, error: Error): ActionHolder<A, R> => {
  return {
    action: action,
    state: ActionState.FAILED,
    error: error,
    result: null,
  };
};

export class BaseAction<T> {

}
