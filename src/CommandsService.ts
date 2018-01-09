import {ActionDispatcher, ActionExecutor, ActionHolder, BaseAction, IService} from "./index";

export abstract class Command<T> extends BaseAction<T> {
  public abstract async run(executor: ActionExecutor, dispatcher: ActionDispatcher): Promise<T>;
}

export class CommandsService implements IService {

  // tslint:disable:readonly-keyword
  private executor: ActionExecutor;
  private dispatcher: ActionDispatcher;

  public connect(dispatcher: ActionDispatcher, executor: ActionExecutor): void {
    this.executor = executor;
    this.dispatcher = dispatcher;
  }

  public dispatch(actionHolder: ActionHolder<Command<any>, any>): Promise<any> {
    const action = actionHolder.action;
    return action.run(this.executor, this.dispatcher);
  }

  public accepts(action: any): boolean {
    return action instanceof Command;
  }
}
