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

    isLink() {
        return this.action.length > 0;
    }
}

export class Navigation {

    public static readonly instance: Navigation = new Navigation();

    main: MenuItem[]

    help: MenuItem[]

    constructor() {
        this.init();
    }

    private init() {
        this.main = [
            new MenuItem("Dashboard", "dashboard", "zmdi zmdi-view-dashboard", true),
            new MenuItem("Administration", null, "zmdi zmdi-accounts-list-alt", false, [
                new MenuItem("Roles", "role/list"),
                new MenuItem("Users", "user/list")
            ]),
            new MenuItem("Retailing", null, "zmdi zmdi-labels", null, [
                new MenuItem("Products", "product/list"),
                new MenuItem("Orders", "order/list")
            ]),
            new MenuItem("Purchase", null, "zmdi zmdi-truck", null, [
                new MenuItem("Come soon...")
            ]),
            new MenuItem("Inventory ", null, "zmdi zmdi-store", null, [
                new MenuItem("Come soon...")
            ])
        ];

        this.help = [
            new MenuItem("User Guide", null, "fa fa-book", null, [
                new MenuItem("Come soon...")
            ])];
    }
}