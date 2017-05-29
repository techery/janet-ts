"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassHelpers_1 = require("./ClassHelpers");
var toJson = function (obj) {
    return JSON.parse(JSON.stringify(obj));
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
        action: toJson(actionHolder.action),
        state: actionHolder.state,
        result: toJson(actionHolder.result),
        error: toJson(actionHolder.error),
        type: ClassHelpers_1.getActionName(actionHolder.action),
    };
};
