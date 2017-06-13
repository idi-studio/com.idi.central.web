import { Component } from '@angular/core';

import { Menu } from '../../../models/menu';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    menus: Menu[] = [
        { name: "Dashboard", action: "dashboard", actived: true },
        { name: "menu-2", action: "action-2", actived: false },
        { name: "menu-3", action: "action-3", actived: false },
        { name: "menu-4", action: "action-4", actived: false }
    ];

    selectedMenu: Menu;

    onSelected(item: Menu): void {
        this.selectedMenu = item;
    };
}