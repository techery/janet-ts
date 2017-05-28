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
