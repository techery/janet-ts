import "reflect-metadata";
import {getFullClassNameComponentsFromClass} from "./ClassHelpers";

export const isJanetAction = (decoratedAction: any) => {
  return decoratedAction.constructor.isJanetAction === true;
};

export function action(target: any): any {

  target.className = getFullClassNameComponentsFromClass(target).join("/");
  target.isJanetAction = true;

  return target;
}
