"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var ActionsRegistry_1 = require("./ActionsRegistry");
var ClassHelpers_1 = require("./ClassHelpers");
var actionsRegistry = new ActionsRegistry_1.ActionsRegistry();
exports.isJanetAction = function (action) {
    return action.constructor.isJanetAction === true;
};
function action(target) {
    var className = ClassHelpers_1.getFullClassNameFromClass(target).join("/");
    var actionConstructor = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var instance = new (target.bind.apply(target, [void 0].concat(args)))();
        return Object.freeze(instance);
    };
    actionConstructor.className = className;
    target.className = className;
    target.isJanetAction = true;
    actionsRegistry.registerClass(className, target);
    return actionConstructor;
}
exports.action = action;
function getClassByActionType(type) {
    return actionsRegistry.getClassByActionType(type);
}
exports.getClassByActionType = getClassByActionType;
