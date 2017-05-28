import {getActionName} from "./ClassHelpers";
import {serializeAction} from "./Serializatiion";
import {IService} from "./Service";
import {ServiceDispatcher} from "./ServiceDispatcher";

const isJanetAction = (action: any) => {
  return getActionName(action).startsWith("@@janet");
};

export const janetMiddleware = (services: IService[]) => {
  return (store: any) => {
    const serviceMiddleware: ServiceDispatcher = new ServiceDispatcher((action: any) => {
      const serializedAction = serializeAction(action);
      store.dispatch(serializedAction);
    });

    services.forEach(serviceMiddleware.registerService.bind(serviceMiddleware));

    return (next: any) => (action: any) => {
      const returnValue = next(serializeAction(action));

      if (isJanetAction(action)) {
        serviceMiddleware.dispatch(action);
      }

      return returnValue;
    };
  };
};
