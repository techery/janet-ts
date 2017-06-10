import { ActionHolder } from "./Action";
export declare type ActionDispatcher = (action: ActionHolder<any, any>) => void;
export declare type ActionExecutor = (action: ActionHolder<any, any>) => Promise<any>;
export interface IService {
    connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void;
    dispatch(actionHolder: ActionHolder<any, any>): Promise<any>;
    accepts(action: any): boolean;
}
