import { ActionDispatcher, ActionExecutor, StateProvider, ActionHolder, BaseAction, IService } from "./index";
export declare abstract class Command<T> extends BaseAction<T> {
    abstract run(executor: ActionExecutor, dispatcher: ActionDispatcher, stateProvider: StateProvider): Promise<T>;
}
export declare class CommandsService implements IService {
    private executor;
    private dispatcher;
    private stateProvider;
    connect(dispatcher: ActionDispatcher, executor: ActionExecutor, stateProvider: StateProvider): void;
    dispatch(actionHolder: ActionHolder<Command<any>, any>): Promise<any>;
    accepts(action: any): boolean;
}
