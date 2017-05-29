"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassHelpers_1 = require("./ClassHelpers");
var toJson = function (obj) {
    if (obj) {
        if (obj.toJS !== undefined) {
            return obj.toJS();
        }
        else {
            return obj;
        }
    }
    else {
        return null;
    }
};
exports.serializeAction = function (obj) {
    if (obj.type !== undefined) {
        return obj;
    }
    else {
        return {
            payload: toJson(obj),
            type: ClassHelpers_1.getActionName(obj),
        };
    }
};
exports.serializeActionHolder = function (actionHolder) {
    return {
        payload: {
            action: toJson(actionHolder.action),
            state: actionHolder.state,
            result: toJson(actionHolder.result),
            error: toJson(actionHolder.error),
        },
        type: ClassHelpers_1.getActionName(actionHolder.action),
    };
};
