import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { StoreService, IStockOption } from '../../../services';
import { BaseComponent, PageHeader, GirdView, ObjectValidator } from '../../../core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: './store-details.component.html'
})
export class StoreDetailsComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Stocks', ['Inventory', 'Store'])
    gridview: GirdView
    editable: boolean = false
    products: any[] = []
    current: any = { name: '', stocks: {} }
    stock: any = { pid: '', bin: '', qty: 0 }
    options: IStockOption[] = []
    filteredOptions: Observable<IStockOption[]>
    formControlProduct = new FormControl('', [Validators.required, ObjectValidator()])

    constructor(private store: StoreService, private dataTable: TdDataTableService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.gridview = new GirdView(this.dataTable)
        this.gridview.sortBy = 'product'
        this.gridview.columns = [
            { name: 'product', label: 'Product', filter: true },
            { name: 'store', label: 'Store', filter: true },
            { name: 'bin', label: 'Bin', filter: true, width: 100 },
            { name: 'qty', label: 'Qty.', numeric: true, format: v => v.toFixed(2), filter: true, width: 100 },
            { name: 'frz', label: 'Frozen', numeric: true, format: v => v.toFixed(2), filter: true, width: 100 },
            { name: 'avl', label: 'Available', numeric: true, format: v => v.toFixed(2), filter: true, width: 100 },
            // { name: 'id', label: '', filter: false },
        ]
        this.bind();
    }

    async bind(): Promise<void> {
        this.load();

        try {
            let id = this.routeParams('id')
            this.current = await this.store.single(id).toPromise()
            this.gridview.bind(this.current.stocks)

            this.options = await this.store.stockOptions().toPromise()
            this.filteredOptions = this.formControlProduct.valueChanges.startWith(null)
                .map(prod => prod && typeof prod === 'object' ? prod.name : prod)
                .map(name => name ? this.filter(name) : this.options.slice());
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    filter(name: string): IStockOption[] {
        return this.options.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    add(): void {
        this.editable = true
    }

    cancel(): void {
        this.editable = false
    }

    valid(): boolean {
        return this.formControlProduct.valid
    }

    back(): void {
        this.navigate('/central/store/list')
    }
}