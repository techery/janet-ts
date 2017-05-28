import {ActionState, StatefulAction} from "./Action";
import {IService} from "./Service";

export class ServiceDispatcher {

  private services: IService[] = [];

  constructor(private actionDispatcher: any) {

  }

  dispatch(action: StatefulAction<any>): void {
    if (action.state === ActionState.RUNNING) {
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
