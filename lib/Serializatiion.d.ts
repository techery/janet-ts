import { ActionHolder } from "./Action";
export declare type SerializedAction = any;
export declare const serializeAction: (obj: any) => any;
export declare const serializeActionHolder: (actionHolder: ActionHolder<any, any>) => any;
