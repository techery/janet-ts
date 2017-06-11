import { ActionHolder, BaseAction } from "./Action";
export declare type ActionDispatcher = (action: ActionHolder<any, any>) => void;
export declare type ActionExecutor = <T extends BaseAction<R>, R>(action: T) => Promise<R>;
export interface IService {
    connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void;
    dispatch(actionHolder: ActionHolder<any, any>): Promise<any>;
    accepts(action: any): boolean;
}
