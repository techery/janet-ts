import { ActionDispatcher, ActionExecutor, ActionHolder, BaseAction, IService } from "./index";
export declare abstract class Command<T> extends BaseAction<T> {
    abstract run(executor: ActionExecutor, dispatcher: ActionDispatcher): Promise<T>;
}
export declare class CommandsService implements IService {
    private executor;
    private dispatcher;
    connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void;
    dispatch(actionHolder: ActionHolder<Command<any>, any>): Promise<any>;
    accepts(action: any): boolean;
}
