export declare enum ActionState {
    INITIAL = 0,
    RUNNING = 1,
    FINISHED = 2,
    FAILED = 3,
}
export interface ActionHolder<A extends BaseAction<R>, R> {
    readonly type: string;
    readonly action: A;
    readonly state: ActionState;
    readonly error: Error | null;
    readonly result: R | null;
}
export interface StartedActionHolder<A extends BaseAction<R>, R> {
    readonly action: A;
}
export interface SucceededActionHolder<A extends BaseAction<R>, R> {
    readonly action: A;
    readonly result: R;
}
export interface FailedActionHolder<A extends BaseAction<R>, R> {
    readonly action: A;
    readonly error: Error;
}
export declare const emptyActionHolder: <A extends BaseAction<R>, R>(type?: string) => ActionHolder<A, R>;
export declare const startAction: <A extends BaseAction<R>, R>(action: A) => ActionHolder<A, R>;
export declare const finishAction: <A extends BaseAction<R>, R>(action: A, result: R) => ActionHolder<A, R>;
export declare const failAction: <A extends BaseAction<R>, R>(action: A, error: Error) => ActionHolder<A, R>;
export declare class BaseAction<T> {
    protected readonly __genericStub__DO_NOT_USE: T;
    __targetKey?: string;
}
