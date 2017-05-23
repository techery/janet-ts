export default class ActionsRegistry {
    actionsMapping: any = {};

    getClassByActionType(type: string): any {
        return this.actionsMapping[type];
    }

    registerClass(className: string, type: any): any {
        this.actionsMapping[className] = type;
    }
}
