import {ActionHolder} from "./Action";
import {getActionName} from "./ClassHelpers";

export type SerializedAction = {
  type: string;
  payload: any;
};

const toJson = (obj: any) => {
  if (obj.toJS !== undefined) {
    return obj.toJS();
  } else {
    return obj;
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

export const serializeActionHolder = (actionHolder: ActionHolder<any, any>): SerializedAction => {
  return {
    payload: {
      action: toJson(actionHolder.action),
      state: actionHolder.state,
      result: toJson(actionHolder.result),
      error: toJson(actionHolder.error),
    },
    type: getActionName(actionHolder.action),
  };
};
