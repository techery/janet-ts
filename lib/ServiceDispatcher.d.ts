import { ActionHolder, BaseAction } from "./Action";
import { ActionDispatcher, IService } from "./Service";
export declare type AnyActionHolder = ActionHolder<BaseAction<any>, any>;
export declare function dispatch(services: IService[], actionHolder: AnyActionHolder, actionDispatcher: ActionDispatcher): void;
