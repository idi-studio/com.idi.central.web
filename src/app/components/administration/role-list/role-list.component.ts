import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { RoleService, IRole } from '../../../services';
import { BaseComponent, PageHeader, GirdView } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './role-list.component.html'
})
export class RoleListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Roles', ['Administration', 'Roles']);
    gridview: GirdView

    constructor(private role: RoleService, private dataTable: TdDataTableService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.gridview = new GirdView(this.dataTable)
        this.gridview.sortBy = 'name'
        this.gridview.columns = [
            { name: 'name', label: 'Name', filter: true },
            { name: 'descrition', label: 'Descrition' },
            { name: 'active', label: 'Active?', filter: true, width: 100 },
            { name: 'id', label: '', filter: false, width: 20 },
        ]
        this.bind();
    }

    async bind(): Promise<void> {
        this.load();

        try {
            let source = await this.role.all().toPromise()
            this.gridview.bind(source)
        }
        catch (error) {
            this.gridview.bind()
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    permission(name: string): void {
        this.navigate(`/central/role/permission/${name.toLowerCase()}`)
    }
}