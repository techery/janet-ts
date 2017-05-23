export interface IService {
    setDispatcher(dispatcher: any): void;
    dispatch(action: any): void;
    accepts(action: any): boolean;
}


