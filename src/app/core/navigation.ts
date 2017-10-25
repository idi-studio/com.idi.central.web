import { Runtime } from './runtime';

export class MenuItem {
    name: string;
    icon: string;
    action: string;
    sub: MenuItem[];

    constructor(name: string, action?: string, icon?: string, sub?: MenuItem[]) {
        this.name = name;
        this.action = action && action || '';
        this.icon = icon && icon || '';
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

    public init() {

        this.help = [
            new MenuItem('User Guide', null, 'fa fa-book', [
                new MenuItem('Come soon...')
            ])]

        this.main = []

        let profile = JSON.parse(Runtime.instance.get('profile'))

        if (!profile)
            return

        profile.menus.forEach(element => {
            var menu = new MenuItem(element.name, element.action, element.icon)
            if (element.sub.length > 0)
                element.sub.forEach(item => {
                    menu.sub.push(new MenuItem(item.name, item.action))
                });
            this.main.push(menu)
        });

        // this.main = [
        //     new MenuItem('Dashboard', 'dashboard', 'zmdi zmdi-view-dashboard'),
        //     new MenuItem('Administration', null, 'zmdi zmdi-accounts-list-alt', [
        //         new MenuItem('Roles', 'role/list'),
        //         new MenuItem('Users', 'user/list')
        //     ]),
        //     new MenuItem('Basic Info', null, 'zmdi zmdi-apps zmdi-hc-fw', [
        //         new MenuItem('Products', 'product/list')
        //     ]),
        //     new MenuItem('Sales', null, 'zmdi zmdi-labels', [
        //         new MenuItem('Orders', 'order/list'),
        //         new MenuItem('Customers', 'cust/list')
        //     ]),
        //     // new MenuItem('Purchase', null, 'zmdi zmdi-truck', null, [
        //     //     new MenuItem('Come soon...')
        //     // ]),
        //     new MenuItem('Inventory', null, 'zmdi zmdi-store', [
        //         new MenuItem('Stores', 'store/list'),
        //     ])
        // ];
    }
}