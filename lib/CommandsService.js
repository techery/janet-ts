"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var Command = (function (_super) {
    __extends(Command, _super);
    function Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Command;
}(index_1.BaseAction));
exports.Command = Command;
var CommandsService = (function () {
    function CommandsService() {
    }
    CommandsService.prototype.connect = function (dispatcher, executor) {
        this.executor = executor;
        this.dispatcher = dispatcher;
    };
    CommandsService.prototype.dispatch = function (actionHolder) {
        var action = actionHolder.action;
        return action.run(this.executor, this.dispatcher);
    };
    CommandsService.prototype.accepts = function (action) {
        return action instanceof Command;
    };
    return CommandsService;
}());
exports.CommandsService = CommandsService;
