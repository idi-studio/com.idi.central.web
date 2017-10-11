import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { StoreService } from '../../../services';
import { BaseComponent, PageHeader } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './store-list.component.html'
})
export class StoreListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Stores', ['Inventory', 'Stores']);

    data: any[] = [];

    columns: ITdDataTableColumn[] = [
        { name: 'name', label: 'Name', filter: true },
        { name: 'inactive', label: '', filter: true, hidden: true },
        { name: 'id', label: '', filter: false, width: 50, sortable: false },
    ];

    clickable: boolean = true;
    selectable: boolean = false;
    filteredData: any[] = this.data;
    filteredTotal: number = this.data.length;
    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 5;
    sortBy: string = 'name';
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    constructor(private store: StoreService, private dataTable: TdDataTableService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.filter();
    }

    async filter(): Promise<void> {
        this.load();

        try {
            this.data = await this.store.all().toPromise()
        }
        catch (error) {
            this.data = [];
            this.handle(error)
        }
        finally {
            this.unload()

            let newData = this.data;

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

    page(e: PageEvent): void {
        this.currentPage = e.pageIndex + 1;
        this.pageSize = e.pageSize;
        this.fromRow = e.pageIndex * e.pageSize + 1
        this.filter();
    }

    details(id: string): void {
        this.navigate(`/central/store/details/${id}`)
    }

    submit(): void { }
    
    cancel(): void { }
    // async shelf(product: IProduct): Promise<void> {
    //     product.onshelf = !product.onshelf;
    //     try {
    //         let result = await this.product.update(product).toPromise()
    //         this.alert(result.message)
    //     }
    //     catch (error) {
    //         this.handle(error)
    //     }
    //     finally {
    //         this.unload()
    //         this.filter();
    //     }
    // }

    // delete(id: string): void {

    //     this.confirm('Are you confirm to delete this record?', (accepted) => {
    //         if (accepted) {
    //             this.handleDelete(id)
    //         }
    //     })
    // }

    // async handleDelete(id: string): Promise<void> {
    //     try {
    //         let result = await this.product.remove(id).toPromise()
    //         // this.show(result);
    //         this.alert(result.message)
    //         this.filter();
    //     }
    //     catch (error) {
    //         this.handle(error)
    //     }
    //     finally {
    //         this.unload()
    //     }
    // }
}