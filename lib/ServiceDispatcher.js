"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
var ServiceDispatcher = (function () {
    function ServiceDispatcher(actionDispatcher, services) {
        var _this = this;
        this.actionDispatcher = actionDispatcher;
        this.services = services;
        services.forEach(function (service) {
            service.setDispatcher(_this.actionDispatcher);
        });
    }
    ServiceDispatcher.prototype.dispatch = function (action) {
        if (action.state === Action_1.ActionState.RUNNING) {
            var service = this.findService(action);
            if (service) {
                service.dispatch(action);
            }
        }
    };
    ServiceDispatcher.prototype.findService = function (action) {
        return this.services.find(function (service) { return service.accepts(action); });
    };
    return ServiceDispatcher;
}());
exports.ServiceDispatcher = ServiceDispatcher;
