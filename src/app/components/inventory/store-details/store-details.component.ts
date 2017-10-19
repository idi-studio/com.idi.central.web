import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { StoreService, CategoryService, IOption } from '../../../services';
import { BaseComponent, PageHeader, GirdView, ObjectValidator, Status, Regex } from '../../../core';
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
    current: any = { name: '', stocks: {} }
    stock: any = { pid: '', name: '', bin: '', qty: 0 }
    stocks: any[] = []
    options: IOption[] = []
    filteredOptions: Observable<IOption[]>
    formControlProduct = new FormControl('', [Validators.required, ObjectValidator()])
    formControlBin = new FormControl('', [Validators.required, Validators.pattern(Regex.LETTERS_NUMBER)])
    formControlQuantity = new FormControl('', [Validators.required, Validators.min(0.01)])

    constructor(private store: StoreService, private category: CategoryService, private dataTable: TdDataTableService,
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

            this.options = await this.category.options("product").toPromise()
            this.filteredOptions = this.formControlProduct.valueChanges.startWith(null)
                .map(option => option && typeof option === 'object' ? option.name : option)
                .map(name => name ? this.filter(name) : this.options.slice());
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    filter(name: string): IOption[] {
        return this.options.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    display(option: IOption): string {
        return option ? option.name : '';
    }

    add(): void {
        this.editable = true
    }

    cancel(): void {
        this.formControlProduct.reset()
        this.stock = { pid: '', name: '', bin: '', qty: 0 }
        this.stocks = []
        this.editable = false
    }

    valid(): boolean {

        if (this.formControlProduct.valid) {
            var option = this.formControlProduct.value as IOption
            this.stock.pid = option.id
            this.stock.name = option.name
        }
        else {
            this.stock.id = ''
            this.stock.name = ''
        }

        return this.formControlProduct.valid && this.formControlQuantity.valid && this.formControlBin.valid
    }

    back(): void {
        this.navigate('/central/store/list')
    }

    addstock(): void {
        if (!this.valid())
            return

        let index = this.stocks.findIndex(e => e.pid === this.stock.pid && e.bin === this.stock.bin)

        if (index >= 0) {
            this.stocks[index].qty += this.stock.qty
        }
        else {
            this.stocks.push(this.stock)
            this.stock = { pid: '', name: '', bin: '', qty: 0 }
            this.formControlProduct.reset()
        }

    }

    removestock(id: string): void {
        let index = this.stocks.findIndex(e => e.pid == id)
        this.stocks.splice(index, 1)
    }

    async submit(): Promise<void> {
        this.load();

        try {
            let result = await this.store.instore(this.current.id, this.stocks).toPromise()

            if (result.status == Status.Success) {
                this.cancel()
                this.bind()
            }

            this.show(result.message)
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }
}