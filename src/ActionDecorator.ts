import {Record} from "immutable";
import "reflect-metadata";
import {ActionsRegistry} from "./ActionsRegistry";
import {getFullClassNameFromClass} from "./ClassHelpers";

const actionsRegistry: ActionsRegistry = new ActionsRegistry();

export const isJanetAction = (action: any) => {
  return action.prototype.isJanetAction === true;
};

export function action(target: any): any {
  const className = getFullClassNameFromClass(target).join("/");

  const actionConstructor: any = (...args: any[]) => {
    const instance = new target(...args);

    const record: any = Record(instance, className);

    return record(instance);
  };

  actionConstructor.className = className;
  actionConstructor.isJanetAction = true;

  actionsRegistry.registerClass(className, target);

  return actionConstructor;
}

export function getClassByActionType(type: string): any {
  return actionsRegistry.getClassByActionType(type);
}
