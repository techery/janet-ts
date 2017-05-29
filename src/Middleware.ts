import {startAction} from "./Action";
import {isJanetAction} from "./ActionDecorator";
import {serializeAction} from "./Serializatiion";
import {IService} from "./Service";
import {dispatch} from "./ServiceDispatcher";

export const janetMiddleware = (services: IService[]) => {
  return (store: any) => {

    const actionDispatcher = store.dispatch.bind(store);

    return (next: any) => (action: any) => {

      if (isJanetAction(action)) {
        const actionHolder = startAction(action);

        dispatch(services, actionHolder, actionDispatcher);

        return next(serializeAction(actionHolder));
      } else {
        return next(action);
      }
    };
  };
};
