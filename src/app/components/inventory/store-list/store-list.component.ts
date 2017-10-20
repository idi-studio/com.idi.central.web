import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent, MatPaginatorIntl } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { StoreService } from '../../../services';
import { BaseComponent, PageHeader, Regex, Status, GirdView } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './store-list.component.html'
})
export class StoreListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Stores', ['Inventory', 'Stores'])
    gridview: GirdView
    editable: boolean = false
    current: any = { id: '', name: '', active: true }
    formControlStoreName = new FormControl('', [Validators.required, Validators.pattern(Regex.LETTERS_NUMBER_CHINESE_SPACES)])

    constructor(private store: StoreService, private dataTable: TdDataTableService, private paginator: MatPaginatorIntl,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.gridview = new GirdView(this.dataTable, this.paginator)
        this.gridview.sortBy = 'name'
        this.gridview.columns = [
            { name: 'name', label: 'Name', filter: true },
            { name: 'active', label: 'Active?', filter: true, width: 100 },
            { name: 'id', label: '', filter: false, width: 50, sortable: false },
        ]
        this.bind();
    }

    async bind(): Promise<void> {
        this.load();

        try {
            let source = await this.store.all().toPromise()
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

    details(id: string): void {
        this.navigate(`/central/store/details/${id}`)
    }

    add(): void {
        this.editable = true
    }

    edit(value: any): void {
        this.current = value
        this.editable = true
    }

    cancel(): void {
        this.current = { id: '', name: '', active: true }
        this.editable = false
    }

    valid(): boolean {
        return this.formControlStoreName.valid
    }

    async submit(): Promise<void> {
        if (!this.valid())
            return;

        try {
            var result

            if (this.current.id == "")
                result = await this.store.add(this.current).toPromise()
            else
                result = await this.store.update(this.current).toPromise()

            if (result.status == Status.Success) {
                this.cancel()
                this.bind()
            }
            else {
                this.show(result.message)
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
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
            let result = await this.store.remove(id).toPromise()
            this.show(result.message)
            this.bind()
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }
}