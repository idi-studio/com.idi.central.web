export class RoleItem {
    id: number;
    name: string;
    describe: string;
    actived: boolean;
    constructor(id: number, name: string, actived: boolean) {
        this.id = id;
        this.name = name;
        this.describe = "The describe of " + name;
        this.actived = actived;
    }
}