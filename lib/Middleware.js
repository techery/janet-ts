"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
var ActionDecorator_1 = require("./ActionDecorator");
var Serializatiion_1 = require("./Serializatiion");
var ServiceDispatcher_1 = require("./ServiceDispatcher");
exports.janetMiddleware = function (services) {
    return function (store) {
        var actionDispatcher = store.dispatch.bind(store);
        return function (next) { return function (action) {
            if (ActionDecorator_1.isJanetAction(action)) {
                var actionHolder = Action_1.startAction(action);
                var returnValue = next(Serializatiion_1.serializeActionHolder(actionHolder));
                ServiceDispatcher_1.dispatch(services, actionHolder, actionDispatcher);
                return returnValue;
            }
            else if (action instanceof Action_1.ActionHolder) {
                next(Serializatiion_1.serializeActionHolder(action));
            }
            else {
                return next(action);
            }
        }; };
    };
};
