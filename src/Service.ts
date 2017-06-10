import {ActionHolder, BaseAction} from "./Action";

export type ActionDispatcher = (action: ActionHolder<any, any>) => void;

export interface IService {
  setDispatcher(dispatcher: ActionDispatcher): void;
  dispatch(actionHolder: ActionHolder<any, any>): Promise<any>;
  accepts(action: any): boolean;
}


