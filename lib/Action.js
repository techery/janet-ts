"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassHelpers_1 = require("./ClassHelpers");
var ActionState;
(function (ActionState) {
    ActionState[ActionState["INITIAL"] = 0] = "INITIAL";
    ActionState[ActionState["RUNNING"] = 1] = "RUNNING";
    ActionState[ActionState["FINISHED"] = 2] = "FINISHED";
    ActionState[ActionState["FAILED"] = 3] = "FAILED";
})(ActionState = exports.ActionState || (exports.ActionState = {}));
exports.emptyActionHolder = function (type) {
    if (type === void 0) { type = "empty_action_holder"; }
    return {
        type: type,
        action: null,
        state: ActionState.INITIAL,
        result: null,
        error: null,
    };
};
exports.startAction = function (action) {
    return {
        type: ClassHelpers_1.getActionName(action),
        action: action,
        state: ActionState.RUNNING,
        result: null,
        error: null,
    };
};
exports.finishAction = function (action, result) {
    return {
        type: ClassHelpers_1.getActionName(action),
        action: action,
        state: ActionState.FINISHED,
        result: result,
        error: null,
    };
};
exports.failAction = function (action, error) {
    return {
        type: ClassHelpers_1.getActionName(action),
        action: action,
        state: ActionState.FAILED,
        result: null,
        error: error,
    };
};
var BaseAction = (function () {
    function BaseAction() {
    }
    return BaseAction;
}());
exports.BaseAction = BaseAction;
