function getClassName(constructor: any): string {
  const funcNameRegex = new RegExp("function (\\w+)\\(");
  const results = (funcNameRegex).exec(constructor.toString());
  return (results && results.length > 1) ? results[1] : "";
}

export function getFullClassNameFromClass(target: any): string[] {

  const classNames = [];
  let obj = target.prototype;
  let className: string = getClassName(target);

  while (className !== "Object") {
    classNames.push(className);
    obj = Object.getPrototypeOf(obj);
    className = getClassName(obj.constructor);
  }

  classNames.push("@@janet");

  return classNames.filter((name) => name !== "Entity").reverse();
}

export function getActionName(obj: any): string {
  if (obj.type !== undefined) {
    return obj.type;
  } else if (obj._name !== undefined) {
    return obj._name;
  } else if (obj.className !== undefined) {
    return obj.className;
  } else if (typeof obj === "object") {
    return getFullClassNameFromClass(obj.constructor).join("/");
  } else if (typeof obj === "function") {
    return getFullClassNameFromClass(obj).join("/");
  } else {
    return null;
  }
}
