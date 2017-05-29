import { ActionHolder } from "./Action";
export declare type SerializedAction = {
    type: string;
    payload: any;
};
export declare const serializeAction: (obj: any) => SerializedAction;
export declare const serializeActionHolder: (actionHolder: ActionHolder<any, any>) => SerializedAction;
