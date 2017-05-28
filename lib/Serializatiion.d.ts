export declare type SerializedAction = {
    type: string;
    payload: any;
};
export declare const serializeAction: (obj: any) => SerializedAction;
