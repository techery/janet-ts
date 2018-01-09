"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClassName(constructor) {
    var funcNameRegex = new RegExp("function (\\w+)\\(");
    var results = (funcNameRegex).exec(constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
}
exports.getClassName = getClassName;
function getFullClassNameComponentsFromClass(target) {
    var classNames = [];
    var obj = target.prototype;
    var className = getClassName(target);
    while (className !== "Object") {
        classNames.push(className);
        obj = Object.getPrototypeOf(obj);
        className = getClassName(obj.constructor);
    }
    classNames.push("@@janet");
    return classNames.reverse();
}
exports.getFullClassNameComponentsFromClass = getFullClassNameComponentsFromClass;
function getActionName(obj) {
    if (obj.type !== undefined) {
        return obj.type;
    }
    else if (typeof obj === "object") {
        return getFullClassNameComponentsFromClass(obj.constructor).join("/");
    }
    else if (typeof obj === "function") {
        return getFullClassNameComponentsFromClass(obj).join("/");
    }
    else {
        throw new Error("Invalid action type:" + JSON.stringify(obj));
    }
}
exports.getActionName = getActionName;
