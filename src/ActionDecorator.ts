import "reflect-metadata";
import {ActionsRegistry} from "./ActionsRegistry";
import {getFullClassNameFromClass} from "./ClassHelpers";

const actionsRegistry: ActionsRegistry = new ActionsRegistry();

export const isJanetAction = (action: any) => {
  return action.constructor.isJanetAction === true;
};

export function action(target: any): any {
  const className = getFullClassNameFromClass(target).join("/");

  const actionConstructor: any = (...args: any[]) => {
    const instance = new target(...args);
    return Object.freeze(instance);
  };

  actionConstructor.className = className;
  target.className = className;
  target.isJanetAction = true;

  actionsRegistry.registerClass(className, target);

  return actionConstructor;
}

export function getClassByActionType(type: string): any {
  return actionsRegistry.getClassByActionType(type);
}
