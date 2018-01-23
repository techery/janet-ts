import { CommandsService } from "./CommandsService";
import {ActionHolder, BaseAction, failAction, finishAction, startAction} from "./Action";
import { isJanetAction } from "./ActionDecorator";
import { IService } from "./Service";
import { dispatch } from "./ServiceDispatcher";

export type ActionMiddleware = (actionPromise: Promise<BaseAction<any>>, store: any) => Promise<BaseAction<any>>;

// tslint:disable-next-line:readonly-array
export const janetMiddleware = (services: ReadonlyArray<IService>, ...actionMiddlewares: ActionMiddleware[]) => {

  const defaultServices: IService[] = [];
  defaultServices.push(new CommandsService());

  const allServices = services.concat(...defaultServices);

  return (store: any) => {

    const dispatcherAction = (actionHolder: any) => {
      //noinspection JSIgnoredPromiseFromCall
      store.dispatch(actionHolder);
    };

    const executeActionHolder = (actionHolder: ActionHolder<BaseAction<any>, any>): Promise<any> => {
      const actionPromise = dispatch(allServices, actionHolder);

      if (actionPromise) {

        const wrappedActionPromise = actionMiddlewares.reduce((promise, middleware) => {
          return middleware(promise, store);
        }, actionPromise);

        wrappedActionPromise.then((result) => {
          dispatcherAction(finishAction(actionHolder.action, result));
        }).catch((error: Error) => {
          dispatcherAction(failAction(actionHolder.action, error));
        });

        return wrappedActionPromise;
      } else {
        return Promise.resolve(true);
      }
    };

    const executeAction = (action: BaseAction<any>) : Promise<any> => {
      const actionHolder = startAction(action);

      dispatcherAction(actionHolder);

      return executeActionHolder(actionHolder);
    };

    const stateProvider = () => {
      return store.getState();
    };

    allServices.forEach((service) => {
      service.connect(dispatcherAction, executeAction, stateProvider);
    });

    return (next: any) => (action: any) => {

      if (isJanetAction(action)) {
        const actionHolder = startAction(action);
        const returnValue = next(actionHolder);

        //noinspection JSIgnoredPromiseFromCall
        executeActionHolder(actionHolder);

        return returnValue;
      } else {
        return next(action);
      }
    };
  };
};
