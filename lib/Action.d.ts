export declare enum ActionState {
    RUNNING = 0,
    FINISHED = 1,
    FAILED = 2,
}
export declare class BaseAction {
    set<K extends keyof this>(key: K, value: this[K]): this;
    get<K extends keyof this>(key: K): this[K];
}
export declare class StatefulAction<T> extends BaseAction {
    state: ActionState;
    error: Error | null;
    result: T | null;
}
