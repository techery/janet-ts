export declare enum ActionState {
    RUNNING = 0,
    FINISHED = 1,
    FAILED = 2,
}
export interface ActionHolder<A, R> {
    action: A;
    state: ActionState;
    error: Error | null;
    result: R | null;
}
export declare const startAction: <A extends BaseAction<R>, R>(action: A) => ActionHolder<A, R>;
export declare const finishAction: <A extends BaseAction<R>, R>(action: A, result: R) => ActionHolder<A, R>;
export declare const failAction: <A extends BaseAction<R>, R>(action: A, error: Error) => ActionHolder<A, R>;
export declare class BaseAction<T> {
}
