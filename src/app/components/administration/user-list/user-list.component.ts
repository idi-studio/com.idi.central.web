import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent, MatPaginatorIntl } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { UserService, IUser } from '../../../services';
import { BaseComponent, PageHeader, GirdView } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './user-list.component.html'
})
export class UserListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Users', ['Administration', 'Users']);
    gridview: GirdView

    constructor(private user: UserService, private dataTable: TdDataTableService, private paginator: MatPaginatorIntl,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.gridview = new GirdView(this.dataTable, this.paginator)
        this.gridview.sortBy = 'username'
        this.gridview.columns = [
            { name: 'photo', label: 'Photo', tooltip: 'Photo', width: 100 },
            { name: 'username', label: 'User ID', filter: true },
            { name: 'name', label: 'Name', filter: true },
            { name: 'gender', label: 'Gender', width: 100 },
            { name: 'birthday', label: 'Birthday', filter: true, width: 150 },
            { name: 'active', label: 'Active?', filter: true, width: 100 },
            { name: 'id', label: '', filter: false, width: 20 },
        ]
        this.bind();
    }

    async bind(): Promise<void> {

        this.load();

        try {
            let source = await this.user.all().toPromise()
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

    role(username: string): void {
        this.navigate(`/central/user/${username}/role`)
    }
}