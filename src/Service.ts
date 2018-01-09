import {ActionHolder, BaseAction} from "./Action";

export type ActionDispatcher = (action: any) => void;
export type ActionExecutor = <R>(action: BaseAction<R>) => Promise<R>;

export interface IService {
  connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void;

  dispatch(actionHolder: ActionHolder<any, any>): Promise<any>;

  accepts(action: any): boolean;
}
