import {BaseAction} from "janet-ts/Action";
import "jest";
import {getActionName, getClassName, getFullClassNameComponentsFromClass} from "../ClassHelpers";

describe("ClassHelpers", () => {

  describe("#getClassName", () => {
    it("should return class name", () => {
      class TestClass {

      }

      expect(getClassName(TestClass)).toBe("TestClass");
    });
  });

  describe("#getFullClassNameComponentsFromClass", () => {
    it("should return full class name", () => {
      class TestClass extends BaseAction<any> {

      }

      expect(getFullClassNameComponentsFromClass(TestClass)).toEqual(["@@janet", "BaseAction", "TestClass"]);
    });
  });

  describe("#getActionName", () => {
    it("should return action type name", () => {
      class TestClass extends BaseAction<any> {

      }

      expect(getActionName(TestClass)).toEqual("@@janet/BaseAction/TestClass");
      expect(getActionName(BaseAction)).toEqual("@@janet/BaseAction");
    });

    it("should return action type name from plain object action", () => {
      expect(getActionName({
        type: "test",
      })).toEqual("test");
    });

    it("should throw an exception for invalid action types", () => {
      expect(() => {
        getActionName(1);
      }).toThrowError(/Invalid action type:.*/);

      expect(() => {
        getActionName("asdad");
      }).toThrowError(/Invalid action type:.*/);
    });
  });
});
