"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClassName(constructor) {
    var funcNameRegex = new RegExp("function (\\w+)\\(");
    var results = (funcNameRegex).exec(constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
}
function getFullClassNameFromClass(target) {
    var classNames = [];
    var obj = target.prototype;
    var className = getClassName(target);
    while (className !== "Object") {
        classNames.push(className);
        obj = Object.getPrototypeOf(obj);
        className = getClassName(obj.constructor);
    }
    classNames.push("@@janet");
    return classNames.filter(function (name) { return name !== "Entity"; }).reverse();
}
exports.getFullClassNameFromClass = getFullClassNameFromClass;
function getActionName(obj) {
    if (obj._name !== undefined) {
        return obj._name;
    }
    else if (obj.className !== undefined) {
        return obj.className;
    }
    else {
        return getFullClassNameFromClass(obj).join("/");
    }
}
exports.getActionName = getActionName;
