export enum ActionState {
    RUNNING,
    FINISHED,
    FAILED
}

export class BaseAction {
    set<K extends keyof this>(key: K, value: this[K]): this {
        return this;
    }

    get<K extends keyof this>(key: K): this[K] {
        return this[key];
    }
}

export class StatefulAction<T> extends BaseAction {
    state: ActionState = ActionState.RUNNING;
    error: Error | null = null;
    result: T | null = null;
}
