import {ActionDispatcher, ActionExecutor, IService} from "janet-ts/Service";
import "jest";
import {ActionHolder, ActionState, BaseAction, startAction} from "../Action";
import {action} from "../ActionDecorator";
import {janetMiddleware} from "../Middleware";

describe("#janetMiddleware", () => {
  const store: any = {
    getState: jest.fn(),
    dispatch: jest.fn(),
  };

  it("should execute Janet actions", () => {
    @action
    class ActionA extends BaseAction<any> {

    }

    const serviceACall = jest.fn();

    class ServiceA implements IService {
      public connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void {
        // Empty
      }

      public dispatch(actionHolder: ActionHolder<any, any>): Promise<any> {
        serviceACall(actionHolder);
        return Promise.resolve(actionHolder);
      }

      public accepts(receivedAction: any): boolean {
        return receivedAction instanceof ActionA;
      }
    }

    const services: any[] = [new ServiceA()];
    const next = (value: any) => {
      return value;
    };

    const testAction = new ActionA();

    const nextHandler = janetMiddleware(services)(store);
    const actionHandler = nextHandler(next);
    const result = actionHandler(testAction);

    expect(result).toMatchObject({
      action: {},
      error: null,
      result: null,
      state: ActionState.RUNNING,
      type: "@@janet/BaseAction/ActionA",
    });

    expect(serviceACall).toHaveBeenLastCalledWith(startAction(testAction));
  });
});
