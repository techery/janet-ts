"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
function dispatch(services, actionHolder) {
    if (actionHolder.state === Action_1.ActionState.RUNNING) {
        var service = services.find(function (s) { return s.accepts(actionHolder.action); });
        if (service) {
            return service.dispatch(actionHolder);
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}
exports.dispatch = dispatch;
