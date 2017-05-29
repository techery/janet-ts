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
    if (obj.type !== undefined) {
        return obj.type;
    }
    else if (obj._name !== undefined) {
        return obj._name;
    }
    else if (obj.className !== undefined) {
        return obj.className;
    }
    else if (typeof obj === "object") {
        return getFullClassNameFromClass(obj.constructor).join("/");
    }
    else if (typeof obj === "function") {
        return getFullClassNameFromClass(obj).join("/");
    }
    else {
        return null;
    }
}
exports.getActionName = getActionName;
