import { ActionHolder, BaseAction } from "./Action";
export declare type ActionDispatcher = (action: BaseAction<any>) => void;
export interface IService {
    setDispatcher(dispatcher: ActionDispatcher): void;
    dispatch(actionHolder: ActionHolder<any, any>, dispatcher: ActionDispatcher): void;
    accepts(action: any): boolean;
}
