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
    return new ActionHolder(action, ActionState.FAILED, {
        message: error.message,
        name: error.name,
        stack: error.stack,
    }, null);
};
var actionIds = {};
var nextActionId = function (action) {
    var actionName = ClassHelpers_1.getFullClassNameFromClass(action.constructor).join("/");
    if (actionIds[actionName] === undefined) {
        actionIds[actionName] = 1;
    }
    var actionId = actionIds[actionName]++;
    return actionName + "-" + actionId;
};
var BaseAction = (function () {
    function BaseAction() {
        this.__id = nextActionId(this);
    }
    return BaseAction;
}());
exports.BaseAction = BaseAction;
