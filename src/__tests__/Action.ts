import "jest";
import {ActionState, BaseAction, failAction, finishAction, startAction} from "../Action";

describe("ActionHolder", () => {
  const action = new BaseAction();
  const result = {};
  const error = new Error("test");

  describe("#startAction", () => {
    it("should create ActionHolder", () => {
      const actionHolder = startAction(action);

      expect(actionHolder.action).toBe(action);
      expect(actionHolder.result).toBe(null);
      expect(actionHolder.error).toBe(null);
      expect(actionHolder.state).toBe(ActionState.RUNNING);
    });
  });

  describe("#finishAction", () => {
    it("should create ActionHolder", () => {
      const actionHolder = finishAction(action, result);

      expect(actionHolder.action).toBe(action);
      expect(actionHolder.result).toBe(result);
      expect(actionHolder.error).toBe(null);
      expect(actionHolder.state).toBe(ActionState.FINISHED);
    });
  });

  describe("#failAction", () => {
    it("should create ActionHolder", () => {
      const actionHolder = failAction(action, error);

      expect(actionHolder.action).toBe(action);
      expect(actionHolder.result).toBe(null);
      expect(actionHolder.error!.name).toBe(error.name);
      expect(actionHolder.error!.stack).toBe(error.stack);
      expect(actionHolder.error!.message).toBe(error.message);
      expect(actionHolder.state).toBe(ActionState.FAILED);
    });
  });
});
