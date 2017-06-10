"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
function dispatch(services, actionHolder, actionDispatcher) {
    if (actionHolder.state === Action_1.ActionState.RUNNING) {
        var service = services.find(function (service) { return service.accepts(actionHolder.action); });
        if (service) {
            service.dispatch(actionHolder).then(function (result) {
                actionDispatcher(Action_1.finishAction(actionHolder.action, result));
            }).catch(function (error) {
                actionDispatcher(Action_1.failAction(actionHolder.action, error));
            });
        }
    }
}
exports.dispatch = dispatch;
