import {getActionName} from "./ClassHelpers";
import {serializeAction} from "./Serializatiion";
import {IService} from "./Service";
import {ServiceDispatcher} from "./ServiceDispatcher";

const isJanetAction = (action: any) => {
  return getActionName(action).startsWith("@@janet");
};

export const janetMiddleware = (services: IService[]) => {
  return (store: any) => {

    const serviceMiddleware = new ServiceDispatcher(store.dispatch.bind(store), services);

    return (next: any) => (action: any) => {

      if (isJanetAction(action)) {
        serviceMiddleware.dispatch(action);
      }

      return next(serializeAction(action));
    };
  };
};
