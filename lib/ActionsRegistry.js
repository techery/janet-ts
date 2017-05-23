"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionsRegistry = (function () {
    function ActionsRegistry() {
        this.actionsMapping = {};
    }
    ActionsRegistry.prototype.getClassByActionType = function (type) {
        return this.actionsMapping[type];
    };
    ActionsRegistry.prototype.registerClass = function (className, type) {
        this.actionsMapping[className] = type;
    };
    return ActionsRegistry;
}());
exports.ActionsRegistry = ActionsRegistry;
