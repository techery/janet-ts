import {ActionHolder, BaseAction} from "./Action";

export type ActionDispatcher = (action: ActionHolder<any, any>) => void;
export type ActionExecutor = (action: ActionHolder<any, any>) => Promise<any>;

export interface IService {
  connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void;
  dispatch(actionHolder: ActionHolder<any, any>): Promise<any>;
  accepts(action: any): boolean;
}


