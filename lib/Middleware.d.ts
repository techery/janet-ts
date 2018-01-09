import { BaseAction } from "./Action";
import { IService } from "./Service";
export declare type ActionMiddleware = (actionPromise: Promise<BaseAction<any>>, store: any) => Promise<BaseAction<any>>;
export declare const janetMiddleware: (services: ReadonlyArray<IService>, ...actionMiddlewares: ActionMiddleware[]) => (store: any) => (next: any) => (action: any) => any;
