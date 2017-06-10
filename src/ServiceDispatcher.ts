import {ActionHolder, ActionState, BaseAction, failAction, finishAction} from "./Action";
import {ActionDispatcher, IService} from "./Service";

export type AnyActionHolder = ActionHolder<BaseAction<any>, any>;

export function dispatch(services: IService[], actionHolder: AnyActionHolder, actionDispatcher: ActionDispatcher): void {
  if (actionHolder.state === ActionState.RUNNING) {
    const service = services.find((service) => service.accepts(actionHolder.action));

    if (service) {
      service.dispatch(actionHolder).then((result) => {
        actionDispatcher(finishAction(actionHolder.action, result));
      }).catch((error) => {
        actionDispatcher(failAction(actionHolder.action, error));
      });
    }
  }
}
