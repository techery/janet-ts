import {ActionDispatcher, ActionExecutor, StateProvider, ActionHolder, BaseAction, IService} from "./index";

export abstract class Command<T> extends BaseAction<T> {
  public abstract async run(executor: ActionExecutor, dispatcher: ActionDispatcher, stateProvider: StateProvider): Promise<T>;
}

export class CommandsService implements IService {

  // tslint:disable:readonly-keyword
  private executor: ActionExecutor;
  private dispatcher: ActionDispatcher;
  private stateProvider: StateProvider;

  public connect(dispatcher: ActionDispatcher, executor: ActionExecutor, stateProvider: StateProvider): void {
    this.executor = executor;
    this.dispatcher = dispatcher;
    this.stateProvider = stateProvider;
  }

  public dispatch(actionHolder: ActionHolder<Command<any>, any>): Promise<any> {
    const action = actionHolder.action;
    return action.run(this.executor, this.dispatcher, this.stateProvider);
  }

  public accepts(action: any): boolean {
    return action instanceof Command;
  }
}
