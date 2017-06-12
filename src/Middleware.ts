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

    const actionExecutor = (action: any): Promise<any> | null => {
      const actionHolder = startAction(action);
      const actionPromise = dispatch(services, actionHolder);

      if (actionPromise) {

        actionPromise.then((result) => {
          actionDispatcher(finishAction(actionHolder.action, result));
        }).catch((error: Error) => {
          actionDispatcher(failAction(actionHolder.action, error));
        });

        return actionPromise;
      } else {
        return Promise.resolve(true);
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
