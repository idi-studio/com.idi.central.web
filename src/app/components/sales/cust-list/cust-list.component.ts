import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent, MatPaginatorIntl } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { CustomerService, ICustomer } from '../../../services';
import { BaseComponent, PageHeader, Status, Grade, GirdView } from '../../../core';
import { List } from 'linqts'
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './cust-list.component.html'
})
export class CustomerListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Customers', ['Sales', 'Customers']);
    gridview: GirdView

    constructor(private cust: CustomerService, private dataTable: TdDataTableService, private paginator: MatPaginatorIntl,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.gridview = new GirdView(this.dataTable, this.paginator)
        this.gridview.sortBy = 'name'
        this.gridview.columns = [
            { name: 'name', label: 'Name', filter: true },
            { name: 'gender', label: 'Gender', filter: true, width: 100 },
            { name: 'grade', label: 'Grade', filter: true, width: 100 },
            { name: 'phone', label: 'Phone', filter: true },
            { name: 'date', label: 'Date', filter: true, width: 120 },
            { name: 'id', label: '', filter: false, width: 20 }
        ]
        this.bind();
    }

    async bind(): Promise<void> {
        this.load();

        try {
            let source = await this.cust.all().toPromise()
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
        this.navigate('/central/cust/info/add')
    }

    edit(id: string): void {
        this.navigate(`/central/cust/info/edit/${id}`)
    }

    delete(id: string): void {
        this.confirm('Are you confirm to delete this record?', (accepted) => {
            if (accepted) {
                this.handleDelete(id)
            }
        })
    }

    gradedesc(key: number): string {
        return new List(Grade).FirstOrDefault(e => e.key == key).name || '';
    }

    async handleDelete(id: string): Promise<void> {
        try {
            let result = await this.cust.remove(id).toPromise()

            this.show(result.message)

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