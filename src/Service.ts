import {ActionHolder, BaseAction} from "./Action";

export type ActionDispatcher = (action: BaseAction<any>) => void;

export interface IService {
  dispatch(actionHolder: ActionHolder<any, any>, dispatcher: ActionDispatcher): void;
  accepts(action: any): boolean;
}


