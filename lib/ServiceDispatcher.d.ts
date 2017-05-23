import { IService } from "./Service";
export declare type SerializedAction = {
    type: string;
    payload: any;
};
export declare class ServiceDispatcher {
    private actionDispatcher;
    private services;
    constructor(actionDispatcher: any);
    dispatch(serializedAction: SerializedAction): void;
    registerService(service: IService): void;
    private findService(action);
}
