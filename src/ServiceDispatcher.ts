import {ActionHolder, ActionState, BaseAction} from "./Action";
import {IService} from "./Service";

export type AnyActionHolder = ActionHolder<BaseAction<any>, any>;

export function dispatch(services: ReadonlyArray<IService>, actionHolder: AnyActionHolder): Promise<any> | null {
  if (actionHolder.state === ActionState.RUNNING) {

    const service = services.find((s) => s.accepts(actionHolder.action));

    if (service) {
      return service.dispatch(actionHolder);
    } else {
      return null;
    }
  } else {
    return null;
  }
}
