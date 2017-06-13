import { IService } from "./Service";
export interface ErrorInterceptor {
    (error: Error): void;
}
export declare const janetMiddleware: (services: IService[], errorInterceptor?: ErrorInterceptor) => (store: any) => (next: any) => (action: any) => any;
