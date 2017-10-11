import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { ProductService, IProduct } from '../../../services';
import { BaseComponent, PageHeader, GirdView } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product-list.component.html'
})
export class ProductListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Products', ['Basic Info', 'Products'])
    gridview: GirdView

    constructor(private product: ProductService, private dataTable: TdDataTableService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.gridview = new GirdView(this.dataTable)
        this.gridview.sortBy = 'name'
        this.gridview.columns = [
            { name: 'name', label: 'Name', filter: true },
            { name: 'code', label: 'Code', filter: true, hidden: true },
            { name: 'description', label: 'Description', filter: true, hidden: true },
            { name: 'tags', label: 'Tags', hidden: true },
            { name: 'active', label: 'Active?', filter: false, hidden: true },
            { name: 'onshelf', label: 'OnShelf?', filter: false, hidden: false, width: 100 },
            { name: 'id', label: '', filter: false, hidden: false, width: 20 },
        ]
        this.bind();
    }

    async bind(): Promise<void> {
        this.load();

        try {
            let source = await this.product.all().toPromise()
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

    add(): void {
        this.navigate('/central/product/info/add')
    }

    edit(id: string): void {
        this.navigate(`/central/product/info/edit/${id}`)
    }

    showPrices(id: string): void {
        this.navigate(`/central/product/prices/${id}`)
    }

    showImages(id: string): void {
        this.navigate(`/central/product/images/${id}`)
    }

    async shelf(product: IProduct): Promise<void> {
        product.onshelf = !product.onshelf;
        try {
            let result = await this.product.update(product).toPromise()
            this.alert(result.message)
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
            this.bind();
        }
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
            let result = await this.product.remove(id).toPromise()
            // this.show(result);
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