"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandsService_1 = require("./CommandsService");
var Action_1 = require("./Action");
var ActionDecorator_1 = require("./ActionDecorator");
var ServiceDispatcher_1 = require("./ServiceDispatcher");
exports.janetMiddleware = function (services) {
    var actionMiddlewares = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        actionMiddlewares[_i - 1] = arguments[_i];
    }
    var defaultServices = [];
    defaultServices.push(new CommandsService_1.CommandsService());
    var allServices = services.concat.apply(services, defaultServices);
    return function (store) {
        var actionDispatcher = function (actionHolder) {
            store.dispatch(actionHolder);
        };
        var actionExecutor = function (action) {
            var actionHolder = Action_1.startAction(action);
            var actionPromise = ServiceDispatcher_1.dispatch(allServices, actionHolder);
            if (actionPromise) {
                var wrappedActionPromise = actionMiddlewares.reduce(function (promise, middleware) {
                    return middleware(promise, store);
                }, actionPromise);
                wrappedActionPromise.then(function (result) {
                    actionDispatcher(Action_1.finishAction(actionHolder.action, result));
                }).catch(function (error) {
                    actionDispatcher(Action_1.failAction(actionHolder.action, error));
                });
                return wrappedActionPromise;
            }
            else {
                return Promise.resolve(true);
            }
        };
        var stateProvider = function () {
            return store.getState();
        };
        allServices.forEach(function (service) {
            service.connect(actionDispatcher, actionExecutor, stateProvider);
        });
        return function (next) { return function (action) {
            if (ActionDecorator_1.isJanetAction(action)) {
                var actionHolder = Action_1.startAction(action);
                var returnValue = next(actionHolder);
                actionExecutor(action);
                return returnValue;
            }
            else {
                return next(action);
            }
        }; };
    };
};
