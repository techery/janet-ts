"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionState;
(function (ActionState) {
    ActionState[ActionState["RUNNING"] = 0] = "RUNNING";
    ActionState[ActionState["FINISHED"] = 1] = "FINISHED";
    ActionState[ActionState["FAILED"] = 2] = "FAILED";
})(ActionState = exports.ActionState || (exports.ActionState = {}));
exports.startAction = function (action) {
    return {
        action: action,
        state: ActionState.RUNNING,
        error: null,
        result: null,
    };
};
exports.finishAction = function (action, result) {
    return {
        action: action,
        state: ActionState.FINISHED,
        error: null,
        result: result,
    };
};
exports.failAction = function (action, error) {
    return {
        action: action,
        state: ActionState.FAILED,
        error: error,
        result: null,
    };
};
var BaseAction = (function () {
    function BaseAction() {
    }
    return BaseAction;
}());
exports.BaseAction = BaseAction;
