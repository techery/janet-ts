import "reflect-metadata";
import {ActionsRegistry} from "./ActionsRegistry";
import {getFullClassNameFromClass} from "./ClassHelpers";

const actionsRegistry: ActionsRegistry = new ActionsRegistry();

export const isJanetAction = (action: any) => {
  return action.constructor.isJanetAction === true;
};

export function action(target: any): any {
  const className = getFullClassNameFromClass(target).join("/");

  target.className = className;
  target.isJanetAction = true;

  actionsRegistry.registerClass(className, target);

  return target;
}

export function getClassByActionType(type: string): any {
  return actionsRegistry.getClassByActionType(type);
}
