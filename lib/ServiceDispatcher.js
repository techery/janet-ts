"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
var ServiceDispatcher = (function () {
    function ServiceDispatcher(actionDispatcher) {
        this.actionDispatcher = actionDispatcher;
        this.services = [];
    }
    ServiceDispatcher.prototype.dispatch = function (action) {
        if (action.state === Action_1.ActionState.RUNNING) {
            var service = this.findService(action);
            if (service) {
                service.dispatch(action);
            }
        }
    };
    ServiceDispatcher.prototype.registerService = function (service) {
        service.setDispatcher(this.actionDispatcher);
        this.services.push(service);
    };
    ServiceDispatcher.prototype.findService = function (action) {
        return this.services.find(function (service) { return service.accepts(action); });
    };
    return ServiceDispatcher;
}());
exports.ServiceDispatcher = ServiceDispatcher;
