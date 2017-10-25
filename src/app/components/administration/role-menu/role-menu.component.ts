import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { RoleService, IRole } from '../../../services';
import { BaseComponent, PageHeader } from '../../../core';
import { List } from 'linqts'
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './role-menu.component.html'
})
export class RoleMenuComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Menu', ['Administration', 'Role', 'Menu']);

    name: string
    menus: any[]
    data: any

    constructor(private role: RoleService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.binding();
    }

    async binding(): Promise<void> {
        this.load();

        try {
            let name = this.routeParams("name")
            this.data = await this.role.menus(name).toPromise()
            this.name = this.data.role;
            this.menus = this.data.menus;
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    back(): void {
        this.navigate('/central/role/list')
    }

    async submit(): Promise<void> {
        try {

            var list: any[] = this.menus

            this.menus.forEach(menu => { list = list.concat(menu.sub) });

            let menus = new List(list).Where(p => p.checked).Select(p => p.sn).ToArray();

            let result = await this.role.authorizeMenu({ role: this.name, menus: menus }).toPromise()

            this.show(result.message)
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }
}