import { ActionHolder, BaseAction } from "./Action";
import { IService } from "./Service";
export declare type AnyActionHolder = ActionHolder<BaseAction<any>, any>;
export declare function dispatch(services: IService[], actionHolder: AnyActionHolder): Promise<any>;
