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
var ActionState;
(function (ActionState) {
    ActionState[ActionState["CREATED"] = 0] = "CREATED";
    ActionState[ActionState["RUNNING"] = 1] = "RUNNING";
    ActionState[ActionState["FINISHED"] = 2] = "FINISHED";
    ActionState[ActionState["FAILED"] = 3] = "FAILED";
})(ActionState = exports.ActionState || (exports.ActionState = {}));
var BaseAction = (function () {
    function BaseAction() {
    }
    BaseAction.prototype.set = function (key, value) {
        return this;
    };
    BaseAction.prototype.get = function (key) {
        return this[key];
    };
    return BaseAction;
}());
exports.BaseAction = BaseAction;
var StatefulAction = (function (_super) {
    __extends(StatefulAction, _super);
    function StatefulAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = ActionState.CREATED;
        _this.error = null;
        _this.result = null;
        return _this;
    }
    return StatefulAction;
}(BaseAction));
exports.StatefulAction = StatefulAction;
