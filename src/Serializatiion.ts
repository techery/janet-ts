import {ActionHolder} from "./Action";
import {getActionName} from "./ClassHelpers";

export type SerializedAction = any;

const toJson = (obj: any) => {
  if (obj) {
    if (obj.toJS !== undefined) {
      return obj.toJS();
    } else {
      return JSON.parse(JSON.stringify(obj));
    }
  } else {
    return null;
  }
};

export const serializeAction = (obj: any): SerializedAction => {
  if (obj.type !== undefined) {
    return obj;
  } else {
    return {
      payload: toJson(obj),
      type: getActionName(obj),
    };
  }
};

export const serializeActionHolder = (actionHolder: ActionHolder<any, any>): any => {
  return {
    action: toJson(actionHolder.action),
    state: actionHolder.state,
    result: toJson(actionHolder.result),
    error: toJson(actionHolder.error),
    type: getActionName(actionHolder.action),
  };
};
