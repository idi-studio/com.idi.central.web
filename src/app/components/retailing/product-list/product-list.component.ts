import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    TdDialogService, TdLoadingService, IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent
} from '@covalent/core';
import { ProductService, IProduct } from '../../../services';
import { BaseComponent, PageHeader } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product-list.component.html',
})
export class ProductListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader("Products", ["Retailing", "Products"]);

    data: IProduct[] = [];

    columns: ITdDataTableColumn[] = [
        { name: 'name', label: 'Name', filter: true },
        { name: 'code', label: 'Code', filter: true, hidden: true },
        { name: 'description', label: 'Description', filter: true, hidden: true },
        { name: 'tags', label: 'Tags', filter: false },
        { name: 'active', label: 'Active?', filter: true },
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
    selectedRows: any[] = [];
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    constructor(private product: ProductService, private route: ActivatedRoute, private dataTable: TdDataTableService,
        protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(router, loading, dialog)
    }

    ngOnInit(): void {
        this.filter();
    }

    async filter(): Promise<void> {
        this.load();

        try {
            this.data = await this.product.all().toPromise()
        }
        catch (error) {
            this.data = [];
            this.handleError(error)
        }
        finally {
            this.unload()

            let newData: IProduct[] = this.data;

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

    add(): void {
        this.navigate("/central/product/add")
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

    rowClick(clickEvent: ITdDataTableRowClickEvent): void {
        this.show(clickEvent.row.name);
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    }
}