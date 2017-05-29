import { StatefulAction } from "./Action";
export declare type ActionDispatcher = (action: StatefulAction<any>) => void;
export interface IService {
    setDispatcher(dispatcher: ActionDispatcher): void;
    dispatch(action: any): void;
    accepts(action: any): boolean;
}
