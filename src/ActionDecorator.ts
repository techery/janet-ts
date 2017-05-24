import {Record} from "immutable";
import "reflect-metadata";
import {ActionsRegistry} from "./ActionsRegistry";
import {getFullClassNameFromClass} from "./ClassHelpers";

const actionsRegistry: ActionsRegistry = new ActionsRegistry();

export function action(target: any): any {
  const className = getFullClassNameFromClass(target).join("/");

  const actionConstructor: any = (...args: any[]) => {
    const instance = new target(...args);

    const record: any = Record(instance, className);

    return record(instance);
  };

  actionConstructor.className = className;

  actionsRegistry.registerClass(className, target);

  return actionConstructor;
}

export function getClassByActionType(type: string): any {
  return actionsRegistry.getClassByActionType(type);
}
