"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionState;
(function (ActionState) {
    ActionState[ActionState["RUNNING"] = 0] = "RUNNING";
    ActionState[ActionState["FINISHED"] = 1] = "FINISHED";
    ActionState[ActionState["FAILED"] = 2] = "FAILED";
})(ActionState = exports.ActionState || (exports.ActionState = {}));
var ActionHolder = (function () {
    function ActionHolder(action, state, error, result) {
        this.action = action;
        this.state = state;
        this.error = error;
        this.result = result;
    }
    return ActionHolder;
}());
exports.ActionHolder = ActionHolder;
exports.startAction = function (action) {
    return new ActionHolder(action, ActionState.RUNNING, null, null);
};
exports.finishAction = function (action, result) {
    return new ActionHolder(action, ActionState.FINISHED, null, result);
};
exports.failAction = function (action, error) {
    return new ActionHolder(action, ActionState.FAILED, error, null);
};
var BaseAction = (function () {
    function BaseAction() {
    }
    return BaseAction;
}());
exports.BaseAction = BaseAction;
