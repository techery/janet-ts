import "jest";
import {BaseAction} from "../Action";
import {action, isJanetAction} from "../ActionDecorator";

describe("#isJanetAction", () => {

  @action
  class TestAction extends BaseAction<any> {

  }

  class Bla {

  }

  it("should detect Janet actions", () => {
    const testAction = new TestAction();

    expect(isJanetAction(testAction)).toBeTruthy();
  });

  it("should not detect other classes as Janet actions", () => {
    const notAction = new Bla();

    expect(isJanetAction(notAction)).toBeFalsy();
  });
});

describe("#action", () => {

  it("should set full className on class", () => {
    class TestClass {

    }

    const actionClass = action(TestClass);

    expect(actionClass.className).toBe("@@janet/TestClass");
  });

  it("should set isJanetAction flag on class", () => {
    class TestClass {

    }

    const actionClass = action(TestClass);

    expect(actionClass.isJanetAction).toBeTruthy();
  });
});
