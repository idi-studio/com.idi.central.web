import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import {
    TdDialogService, TdLoadingService, IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent
} from '@covalent/core';
import { ProductService, ProductPriceService, IProduct, IProductPrice } from '../../../services';
import { BaseComponent, PageHeader, PriceCategory } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product-price-list.component.html'
})
export class ProductPriceListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Product', ['Sales', 'Product', 'Prices']);

    current: IProduct = { id: '', name: '', code: '', tags: [], images: [], active: false, onshelf: false }
    data: IProductPrice[] = [];

    columns: ITdDataTableColumn[] = [
        { name: 'category', label: 'Category', filter: true, hidden: true },
        { name: 'categoryname', label: 'Category', filter: true },
        { name: 'amount', label: 'Amount', numeric: true, format: v => v.toFixed(2), filter: true },
        { name: 'grade', label: 'Grade', filter: true },
        { name: 'startdate', label: 'Expiration Date', filter: false },
        { name: 'id', label: '', filter: false, hidden: false },
    ];

    clickable: boolean = true;
    selectable: boolean = false;
    filteredData: any[] = this.data;
    filteredTotal: number = this.data.length;
    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 5;
    sortBy: string = 'category';
    selectedRows: any[] = [];
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    constructor(private product: ProductService, private price: ProductPriceService, private dataTable: TdDataTableService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MdSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.filter();
    }

    async filter(): Promise<void> {
        this.load();

        try {
            let id = this.getParam('id')
            this.current = await this.product.single(id).toPromise()
            this.data = await this.price.all(id).toPromise()
            this.header.title = this.current.name
        }
        catch (error) {
            this.data = [];
            this.handle(error)
        }
        finally {
            this.unload()

            let newData: IProductPrice[] = this.data;

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

    back(): void {
        this.navigate('/central/product/list')
    }

    add(): void {
        this.navigate(`/central/product/price/add/${this.current.id}`)
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

    hasTerm(category: number): boolean {
        switch (category) {
            case PriceCategory.Discount:
                return true
            default:
                return false
        }
    }

    hasGrade(category: number): boolean {
        switch (category) {
            case PriceCategory.Discount:
                return true
            default:
                return false
        }
    }

    edit(id: string): void {
        this.navigate(`/central/product/price/edit/${id}`)
    }

    delete(id: string): void {

        this.confirm('Are you confirm to delete this record?', (accepted) => {
            if (accepted) {
                this.handleDelete(id)
            }
        })
    }

    async handleDelete(id: string): Promise<void> {
        try {
            let result = await this.price.remove(id).toPromise()
            this.alert(result.message)
            this.filter();
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }
}