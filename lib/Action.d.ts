export declare enum ActionState {
    CREATED = 0,
    RUNNING = 1,
    FINISHED = 2,
    FAILED = 3,
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
