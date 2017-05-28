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
  if (obj._name !== undefined) {
    return obj._name;
  } else if (obj.className !== undefined) {
    return obj.className;
  } else {
    return getFullClassNameFromClass(obj).join("/");
  }
}
