import {ActionHolder, ActionState, BaseAction} from "./Action";
import {IService} from "./Service";

export type AnyActionHolder = ActionHolder<BaseAction<any>, any>;

export function dispatch(services: IService[], actionHolder: AnyActionHolder): Promise<any> | null {
  if (actionHolder.state === ActionState.RUNNING) {
    const service = services.find((service) => service.accepts(actionHolder.action));

    if (service) {
      return service.dispatch(actionHolder);
    } else {
      return null;
    }
  } else {
    return null;
  }
}
