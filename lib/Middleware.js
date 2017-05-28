"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassHelpers_1 = require("./ClassHelpers");
var Serializatiion_1 = require("./Serializatiion");
var ServiceDispatcher_1 = require("./ServiceDispatcher");
var isJanetAction = function (action) {
    return ClassHelpers_1.getActionName(action).startsWith("@@janet");
};
exports.janetMiddleware = function (services) {
    return function (store) {
        var serviceMiddleware = new ServiceDispatcher_1.ServiceDispatcher(function (action) {
            var serializedAction = Serializatiion_1.serializeAction(action);
            store.dispatch(serializedAction);
        });
        services.forEach(serviceMiddleware.registerService.bind(serviceMiddleware));
        return function (next) { return function (action) {
            var returnValue = next(Serializatiion_1.serializeAction(action));
            if (isJanetAction(action)) {
                serviceMiddleware.dispatch(action);
            }
            return returnValue;
        }; };
    };
};
