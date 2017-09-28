import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { RoleService, IRole } from '../../../services';
import { BaseComponent, PageHeader } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './role-permission.component.html'
})
export class RolePermissionComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Permission', ['Administration', 'Role', 'Permission']);

    name: string
    modules: any[]
    data: any

    constructor(private role: RoleService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MdSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.binding();
    }

    async binding(): Promise<void> {
        this.load();

        try {
            let name = this.getParam("name")
            this.data = await this.role.permission(name).toPromise()
            this.name = this.data.role;
            this.modules = this.data.modules;
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    async save(): Promise<void> {
        try {

            // let result: any;

            // switch (this.mode) {
            //     case Command.Create:
            //         result = await this.price.add(this.current).toPromise()
            //         break;
            //     case Command.Update:
            //         result = await this.price.update(this.current).toPromise()
            //         break;
            //     default:
            //         return;
            // }

            // this.alert(result.message)

            // if (result.status == Status.Success) {
            //     this.back()
            // }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }
}