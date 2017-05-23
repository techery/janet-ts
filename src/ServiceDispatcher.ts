import {Record} from "immutable";
import StatefulAction, {ActionState} from "./Action";
import {IService} from "./Service";

export type SerializedAction = {
    type: string;
    payload: any;
};

export default class ServiceDispatcher {

    private services: IService[] = [];

    constructor(private actionDispatcher: any) {

    }

    dispatch(serializedAction: SerializedAction): void {
        const action: StatefulAction<any> = new (Record(serializedAction.payload, serializedAction.type)) as any;

        if (action.state === ActionState.CREATED) {
            const service = this.findService(action);

            if (service) {
                service.dispatch(action);
            }
        }
    }

    registerService(service: IService): void {
        service.setDispatcher(this.actionDispatcher);
        this.services.push(service);
    }

    private findService(action: any): IService | undefined {
        return this.services.find((service) => service.accepts(action));
    }
}