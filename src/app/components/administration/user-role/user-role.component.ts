import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { UserService } from '../../../services';
import { BaseComponent, PageHeader } from '../../../core';
import { List } from 'linqts'
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './user-role.component.html'
})
export class UserRoleComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Role', ['Administration', 'User', 'Role']);

    username: string
    roles: any[]
    data: any

    constructor(private user: UserService,
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
            let username = this.routeParams("username")
            this.data = await this.user.role(username).toPromise()
            this.username = this.data.username;
            this.roles = this.data.roles;
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    back(): void {
        this.navigate('/central/user/list')
    }

    async submit(): Promise<void> {
        try {

            let roles = new List(this.roles).Where(e => e.checked).Select(e => e.name).ToArray();

            let result = await this.user.authorize({ username: this.username, roles: roles }).toPromise()

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