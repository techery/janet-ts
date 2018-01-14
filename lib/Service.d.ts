import { ActionHolder, BaseAction } from "./Action";
export declare type ActionDispatcher = (action: any) => void;
export declare type ActionExecutor = <R>(action: BaseAction<R>) => Promise<R>;
export declare type StateProvider = () => any;
export interface IService {
    connect(dispatcher: ActionDispatcher, executor: ActionExecutor, stateProvider: StateProvider): void;
    dispatch(actionHolder: ActionHolder<any, any>): Promise<any>;
    accepts(action: any): boolean;
}
