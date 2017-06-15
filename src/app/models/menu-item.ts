export class MenuItem {
    name: string;
    icon: string;
    action: string;
    actived: boolean;
    sub: MenuItem[];

    constructor(name: string, action?: string, icon?: string, actived?: boolean, sub?: MenuItem[]) {
        this.name = name;
        this.action = action && action || "";
        this.icon = icon && icon || "";
        this.actived = actived && actived || false;
        this.sub = sub && sub || [];
    }

    hasSub() {
        return this.sub.length > 0;
    }
}