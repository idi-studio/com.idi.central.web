import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent, MatPaginatorIntl } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { ProductService, ProductPriceService, IProduct, IProductPrice } from '../../../services';
import { BaseComponent, PageHeader, PriceCategory, GirdView } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product-price-list.component.html'
})
export class ProductPriceListComponent extends BaseComponent implements OnInit {


    header: PageHeader = new PageHeader('Product', ['Basic Info', 'Product', 'Prices']);
    gridview: GirdView
    current: IProduct = { id: '', name: '', code: '', tags: [], images: [], active: false, onshelf: false, skid: '', sku: 1, ss: 0, unit: 'PCS', bin: 'P001' }

    constructor(private product: ProductService, private price: ProductPriceService, private dataTable: TdDataTableService, private paginator: MatPaginatorIntl,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.gridview = new GirdView(this.dataTable, this.paginator)
        this.gridview.sortBy = 'category'
        this.gridview.columns = [
            { name: 'category', label: 'Category', filter: true, hidden: true },
            { name: 'categoryname', label: 'Category', filter: true },
            { name: 'amount', label: 'Amount', numeric: true, format: v => v.toFixed(2), filter: true },
            { name: 'grade', label: 'Grade', filter: true, width: 80 },
            { name: 'startdate', label: 'Expiration Date', filter: false, width: 400 },
            { name: 'id', label: '', filter: false, hidden: false, width: 50 },
        ]
        this.bind()
    }

    async bind(): Promise<void> {
        this.load();

        try {
            let id = this.routeParams('id')
            let source = await this.price.all(id).toPromise()
            this.current = await this.product.single(id).toPromise()
            this.header.title = this.current.name
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

    back(): void {
        this.navigate('/central/product/list')
    }

    add(): void {
        this.navigate(`/central/product/price/add/${this.current.id}`)
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
            this.bind();
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }
}