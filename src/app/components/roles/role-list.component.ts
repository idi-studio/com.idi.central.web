import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../models/page-header';
import { RoleItem } from '../../models/role';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { RolesService, IRole } from '../../services/roles.service';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Component({
    templateUrl: './role-list.component.html',
    viewProviders: [RolesService],
})
export class RoleListComponent implements OnInit {

    header: PageHeader = new PageHeader("Roles", ["Administrators", "Roles"]);

    roles: Array<IRole> = [];
    // roles: Array<RoleItem> = [
    //     new RoleItem(1, "Administrators", true),
    //     new RoleItem(2, "Manager", true),
    //     new RoleItem(3, "Finance", true),
    //     new RoleItem(4, "Staff", true),
    // ];

    constructor(private _rolesService: RolesService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _loadingService: TdLoadingService,
        private _dialogService: TdDialogService) { }


    ngOnInit(): void {

        this.load();

        $(function () {
            $('#datatable').DataTable();

            var table = $('#datatable-buttons').DataTable({
                lengthChange: false,
                buttons: ['copy', 'excel', 'pdf', 'colvis']
            });

            table.buttons().container().appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
        });
    }

    async load(): Promise<void> {
        console.log("->load");
        try {
            this._loadingService.register('role.list')
            this.roles = await this._rolesService.getAll().toPromise()
            console.log(this.roles)
        } catch (error) {
            this.roles = []
        } finally {
            // this.roles = []
            // this.filteredUsers = Object.assign([], this.users);
            this._loadingService.resolve('role.list');
        }
    }

}