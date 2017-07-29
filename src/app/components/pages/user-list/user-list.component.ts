import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../../models/page-header';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService, TdLoadingService, IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { UserService, IUserRow } from '../../../services';
import { BaseComponent } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './user-list.component.html',
})
export class UserListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader("Users", ["Administration", "Users"]);

    data: IUserRow[] = [];

    columns: ITdDataTableColumn[] = [
        { name: 'photo', label: 'Photo', tooltip: 'Photo' },
        { name: 'username', label: 'User ID', filter: true },
        { name: 'name', label: 'Name', filter: true },
        { name: 'gender', label: 'Gender' },
        { name: 'birthday', label: 'Birthday', filter: true },
        { name: 'active', label: 'Active?', filter: true },
    ];

    filteredData: any[] = this.data;
    filteredTotal: number = this.data.length;
    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 5;
    sortBy: string = 'username';
    selectedRows: any[] = [];
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    constructor(private user: UserService, private route: ActivatedRoute, private dataTable: TdDataTableService,
        protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(router, loading, dialog)
    }

    ngOnInit(): void {
        this.filter();
    }

    async filter(): Promise<void> {

        this.load();

        try {
            this.data = await this.user.all().toPromise()
        }
        catch (error) {
            this.data = [];
            this.handleError(error)
        }
        finally {
            this.unload()
        }

        let newData: IUserRow[] = this.data;

        let excludedColumns: string[] = this.columns
            .filter((column: ITdDataTableColumn) => {
                return ((column.filter === undefined && column.hidden === true) || (column.filter !== undefined && column.filter === false));
            }).map((column: ITdDataTableColumn) => {
                return column.name;
            });

        newData = this.dataTable.filterData(newData, this.searchTerm, true, excludedColumns);
        this.filteredTotal = newData.length;
        newData = this.dataTable.sortData(newData, this.sortBy, this.sortOrder);
        newData = this.dataTable.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredData = newData;
    }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.filter();
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    }
}