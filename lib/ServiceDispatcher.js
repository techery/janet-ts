"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
function dispatch(services, actionHolder) {
    if (actionHolder.state === Action_1.ActionState.RUNNING) {
        var service = services.find(function (service) { return service.accepts(actionHolder.action); });
        if (service) {
            return service.dispatch(actionHolder);
        }
        else {
            return Promise.reject(new Error("Can't find service for action:" + actionHolder.action.constructor.name));
        }
    }
    else {
        return Promise.reject(new Error("Action is already running:" + actionHolder.action.constructor.name));
    }
}
exports.dispatch = dispatch;
