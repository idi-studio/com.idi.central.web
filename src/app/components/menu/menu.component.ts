import { Component } from '@angular/core';

import { Menu } from '../../models/menu';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {
    menus: Menu[] = [
        { name: "menu-1", action: "action-1" },
        { name: "menu-2", action: "action-2" },
        { name: "menu-3", action: "action-3" },
        { name: "menu-4", action: "action-4" }
    ];

    selectedMenu: Menu;// = this.menus[0];

    onSelected(item: Menu): void {
        this.selectedMenu = item;
    };
}