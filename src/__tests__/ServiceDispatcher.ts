import {ActionHolder, BaseAction, finishAction, startAction} from "janet-ts/Action";
import {dispatch} from "janet-ts/ServiceDispatcher";
import "jest";
import {action} from "../ActionDecorator";
import {ActionDispatcher, ActionExecutor, IService} from "../Service";

// tslint:disable:no-shadowed-variable

describe("ServiceDispatcher#dispatch", () => {
  it("should dispatch action to appropriate service", () => {

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

    @action
    class ActionB extends BaseAction<any> {

    }

    const serviceBCall = jest.fn();

    class ServiceB implements IService {
      public connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void {
        // Empty
      }

      public dispatch(actionHolder: ActionHolder<any, any>): Promise<any> {
        serviceBCall(actionHolder);
        return Promise.resolve(actionHolder);
      }

      public accepts(receivedAction: any): boolean {
        return receivedAction instanceof ActionB;
      }
    }

    const services = [new ServiceA(), new ServiceB()];
    const actionHolder = startAction(new ActionB());

    const result = dispatch(services, actionHolder);

    expect(result).not.toBeNull();

    expect(serviceACall).toHaveBeenCalledTimes(0);
    expect(serviceBCall).toHaveBeenCalledTimes(1);
    expect(serviceBCall).toHaveBeenLastCalledWith(actionHolder);
  });

  it("should return null if action is already running", () => {
    @action
    class ActionA extends BaseAction<any> {

    }

    @action
    class ActionB extends BaseAction<any> {

    }

    const serviceBCall = jest.fn();

    class ServiceB implements IService {
      public connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void {
        // Empty
      }

      public dispatch(actionHolder: ActionHolder<any, any>): Promise<any> {
        serviceBCall(actionHolder);
        return Promise.resolve(actionHolder);
      }

      public accepts(receivedAction: any): boolean {
        return receivedAction instanceof ActionB;
      }
    }

    const services = [new ServiceB()];
    const actionHolder = finishAction(new ActionA(), null);

    const result = dispatch(services, actionHolder);

    expect(result).toBeNull();
    expect(serviceBCall).toHaveBeenCalledTimes(0);
  });

  it("should return null if not service can be found for action", () => {
    @action
    class ActionA extends BaseAction<any> {

    }

    @action
    class ActionB extends BaseAction<any> {

    }

    const serviceBCall = jest.fn();

    class ServiceB implements IService {
      public connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void {
        // Empty
      }

      public dispatch(actionHolder: ActionHolder<any, any>): Promise<any> {
        serviceBCall(actionHolder);
        return Promise.resolve(actionHolder);
      }

      public accepts(receivedAction: any): boolean {
        return receivedAction instanceof ActionB;
      }
    }

    const services = [new ServiceB()];
    const actionHolder = startAction(new ActionA());

    const result = dispatch(services, actionHolder);

    expect(result).toBeNull();
    expect(serviceBCall).toHaveBeenCalledTimes(0);
  });
});
