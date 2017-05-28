import { IService } from "./Service";
export declare const janetMiddleware: (services: IService[]) => (store: any) => (next: any) => (action: any) => any;
