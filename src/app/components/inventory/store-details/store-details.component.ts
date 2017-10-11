import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { StoreService } from '../../../services';
import { BaseComponent, PageHeader, GirdView } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './store-details.component.html'
})
export class StoreDetailsComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Details', ['Inventory', 'Store']);
    gridview: GirdView
    current: any;

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
            { name: 'bin', label: 'Bin', filter: true },
            { name: 'qty', label: 'Qty.', numeric: true, format: v => v.toFixed(2), filter: true },
            { name: 'frz', label: 'Frozen', numeric: true, format: v => v.toFixed(2), filter: true },
            { name: 'avl', label: 'Available', numeric: true, format: v => v.toFixed(2), filter: true },
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
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    back(): void {
        this.navigate('/central/store/list')
    }
}