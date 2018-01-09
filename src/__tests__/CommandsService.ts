import { ActionDispatcher, ActionExecutor, startAction } from "janet-ts";
import { BaseAction } from "janet-ts/Action";
import "jest";
import { Command, CommandsService } from "../CommandsService";

describe("CommandsService", () => {

  let testExecutor: any;
  let sut: CommandsService;

  class TestCommand extends Command<any> {

    constructor(public executorChecker: any) {
      super();
    }

    public run(executor: ActionExecutor, dispatcher: ActionDispatcher): Promise<any> {
      this.executorChecker(executor);
      return Promise.resolve(true);
    }
  }

  beforeEach(() => {
    testExecutor = jest.fn();
    sut = new CommandsService();
    sut.connect(jest.fn(), testExecutor);
  });

  describe("#dispatch", () => {
    it("should run command with executor", () => {
      const executorChecker = jest.fn();

      sut.dispatch(startAction(new TestCommand(executorChecker)));

      expect(executorChecker).toHaveBeenCalledTimes(1);
      expect(executorChecker).toHaveBeenCalledWith(testExecutor);
    });
  });

  describe("#accepts", () => {
    it("should accept command actions", () => {
      expect(sut.accepts(new TestCommand(null))).toBeTruthy();
    });

    it("should not accept other actions", () => {
      expect(sut.accepts(new BaseAction())).toBeFalsy();
    });
  });
});
