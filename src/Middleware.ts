import {ActionHolder, startAction} from "./Action";
import {isJanetAction} from "./ActionDecorator";
import {serializeActionHolder} from "./Serializatiion";
import {IService} from "./Service";
import {dispatch} from "./ServiceDispatcher";

export const janetMiddleware = (services: IService[]) => {
  return (store: any) => {

    const actionDispatcher = store.dispatch.bind(store);

    return (next: any) => (action: any) => {

      if (isJanetAction(action)) {
        const actionHolder = startAction(action);

        dispatch(services, actionHolder, actionDispatcher);

        return next(serializeActionHolder(actionHolder));
      } else if (action instanceof ActionHolder) {
        next(serializeActionHolder(action));
      } else {
        return next(action);
      }
    };
  };
};
