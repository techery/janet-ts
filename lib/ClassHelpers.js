"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClassName(constructor) {
    var funcNameRegex = new RegExp("function (\\w+)\\(");
    var results = (funcNameRegex).exec(constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
}
function getFullClassName(target) {
    var classNames = [];
    var obj = Object.getPrototypeOf(target);
    var className = getClassName(target);
    while (className !== "Object") {
        classNames.push(className);
        obj = Object.getPrototypeOf(obj);
        className = getClassName(obj.constructor);
    }
    return classNames.filter(function (name) { return name !== "Entity"; });
}
exports.getFullClassName = getFullClassName;
function getFullClassNameFromClass(target) {
    var classNames = [];
    var obj = target.prototype;
    var className = getClassName(target);
    while (className !== "Object") {
        classNames.push(className);
        obj = Object.getPrototypeOf(obj);
        className = getClassName(obj.constructor);
    }
    return classNames.filter(function (name) { return name !== "Entity"; });
}
exports.getFullClassNameFromClass = getFullClassNameFromClass;
