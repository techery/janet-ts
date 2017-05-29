import { StatefulAction } from "./Action";
import { ActionDispatcher, IService } from "./Service";
export declare class ServiceDispatcher {
    private actionDispatcher;
    private services;
    constructor(actionDispatcher: ActionDispatcher, services: IService[]);
    dispatch(action: StatefulAction<any>): void;
    private findService(action);
}
