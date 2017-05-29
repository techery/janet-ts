import {ActionState, StatefulAction} from "./Action";
import {ActionDispatcher, IService} from "./Service";

export class ServiceDispatcher {

  constructor(private actionDispatcher: ActionDispatcher, private services: IService[]) {
    services.forEach((service) => {
      service.setDispatcher(this.actionDispatcher);
    });
  }

  dispatch(action: StatefulAction<any>): void {
    if (action.state === ActionState.RUNNING) {
      const service = this.findService(action);

      if (service) {
        service.dispatch(action);
      }
    }
  }

  private findService(action: any): IService | undefined {
    return this.services.find((service) => service.accepts(action));
  }
}
