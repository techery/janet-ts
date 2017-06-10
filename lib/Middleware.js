"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
var ActionDecorator_1 = require("./ActionDecorator");
var Serializatiion_1 = require("./Serializatiion");
var ServiceDispatcher_1 = require("./ServiceDispatcher");
exports.janetMiddleware = function (services) {
    return function (store) {
        var actionDispatcher = function (action) {
            store.dispatch(action);
        };
        var actionExecutor = function (action) {
            var actionHolder = Action_1.startAction(action);
            var actionPromise = ServiceDispatcher_1.dispatch(services, actionHolder);
            if (actionPromise) {
                actionPromise.then(function (result) {
                    actionDispatcher(Action_1.finishAction(actionHolder.action, result));
                }).catch(function (error) {
                    actionDispatcher(Action_1.failAction(actionHolder.action, error));
                });
                return actionPromise;
            }
            else {
                return Promise.resolve(true);
            }
        };
        services.forEach(function (service) {
            service.connect(actionDispatcher, actionExecutor);
        });
        return function (next) { return function (action) {
            if (ActionDecorator_1.isJanetAction(action)) {
                var actionHolder = Action_1.startAction(action);
                var returnValue = next(Serializatiion_1.serializeActionHolder(actionHolder));
                actionExecutor(action);
                return returnValue;
            }
            else if (action instanceof Action_1.ActionHolder) {
                return next(Serializatiion_1.serializeActionHolder(action));
            }
            else {
                return next(action);
            }
        }; };
    };
};
