import {ActionHolder, failAction, finishAction, startAction} from "./Action";
import {isJanetAction} from "./ActionDecorator";
import {serializeActionHolder} from "./Serializatiion";
import {IService} from "./Service";
import {dispatch} from "./ServiceDispatcher";

export const janetMiddleware = (services: IService[]) => {
  return (store: any) => {

    const actionDispatcher = (action: any) => {
      //noinspection JSIgnoredPromiseFromCall
      store.dispatch(action);
    };

    const actionExecutor = (action: any): Promise<any> => {
      const actionHolder = startAction(action);
      const actionPromise = dispatch(services, actionHolder);

      if (actionPromise) {
        return actionPromise.then((result) => {
          actionDispatcher(finishAction(actionHolder.action, result));
        }).catch((error) => {
          actionDispatcher(failAction(actionHolder.action, error));
        });
      } else {
        return Promise.reject("Can't handle action:" + action);
      }
    };

    services.forEach((service) => {
      service.connect(actionDispatcher, actionExecutor);
    });

    return (next: any) => (action: any) => {

      if (isJanetAction(action)) {
        const actionHolder = startAction(action);
        const returnValue = next(serializeActionHolder(actionHolder));

        //noinspection JSIgnoredPromiseFromCall
        actionExecutor(action);

        return returnValue;
      } else if (action instanceof ActionHolder) {
        return next(serializeActionHolder(action));
      } else {
        return next(action);
      }
    };
  };
};
