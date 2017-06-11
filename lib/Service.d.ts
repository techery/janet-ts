import { ActionHolder, BaseAction } from "./Action";
export declare type ActionDispatcher = (action: ActionHolder<any, any>) => void;
export declare type ActionExecutor = <R>(action: BaseAction<R>) => Promise<R>;
export interface IService {
    connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void;
    dispatch(actionHolder: ActionHolder<any, any>): Promise<any>;
    accepts(action: any): boolean;
}
