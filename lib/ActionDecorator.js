"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var ClassHelpers_1 = require("./ClassHelpers");
exports.isJanetAction = function (decoratedAction) {
    return decoratedAction.constructor.isJanetAction === true;
};
function action(target) {
    target.className = ClassHelpers_1.getFullClassNameComponentsFromClass(target).join("/");
    target.isJanetAction = true;
    return target;
}
exports.action = action;
