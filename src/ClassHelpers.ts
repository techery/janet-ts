export function getClassName(constructor: any): string {
  const funcNameRegex = new RegExp("function (\\w+)\\(");
  const results = (funcNameRegex).exec(constructor.toString());
  return (results && results.length > 1) ? results[1] : "";
}

export function getFullClassNameComponentsFromClass(target: any): ReadonlyArray<string> {

  const classNames = [];
  let obj = target.prototype;
  let className: string = getClassName(target);

  while (className !== "Object") {
    classNames.push(className);
    obj = Object.getPrototypeOf(obj);
    className = getClassName(obj.constructor);
  }

  classNames.push("@@janet");

  return classNames.reverse();
}

export function getActionName(obj: any): string {
  if (obj.type !== undefined) {
    return obj.type;
  } else if (typeof obj === "object") {
    return getFullClassNameComponentsFromClass(obj.constructor).join("/");
  } else if (typeof obj === "function") {
    return getFullClassNameComponentsFromClass(obj).join("/");
  } else {
    throw new Error(`Invalid action type:${JSON.stringify(obj)}`);
  }
}
