export enum ActionState {
    CREATED,
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

export default class StatefulAction<T> extends BaseAction {
    state: ActionState = ActionState.CREATED;
    error: Error | null = null;
    result: T | null = null;
}
