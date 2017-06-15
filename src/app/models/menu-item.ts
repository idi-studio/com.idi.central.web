export class MenuItem {
    name: string;
    icon: string;
    action: string;
    actived: boolean;
    sub: MenuItem[];

    constructor(name: string, icon?: string, action?: string, actived?: boolean, sub?: MenuItem[]) {
        this.name = name;
        this.icon = icon && icon || "";
        this.action = action && action || "";
        this.actived = actived && actived || false;
        this.sub = sub && sub || [];
    }

    hasSub() {
        return this.sub.length > 0;
    }
}