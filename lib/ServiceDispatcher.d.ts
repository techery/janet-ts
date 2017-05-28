import { StatefulAction } from "./Action";
import { IService } from "./Service";
export declare class ServiceDispatcher {
    private actionDispatcher;
    private services;
    constructor(actionDispatcher: any);
    dispatch(action: StatefulAction<any>): void;
    registerService(service: IService): void;
    private findService(action);
}
