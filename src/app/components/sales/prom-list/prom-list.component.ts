import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent, MatPaginatorIntl } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { PromotionService } from '../../../services';
import { BaseComponent, PageHeader, Status, Grade, GirdView } from '../../../core';
import { List } from 'linqts'
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './prom-list.component.html'
})
export class PromotionListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Promotions', ['Sales', 'Promotions']);
    gridview: GirdView

    constructor(private prom: PromotionService, private dataTable: TdDataTableService, private paginator: MatPaginatorIntl,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.gridview = new GirdView(this.dataTable, this.paginator)
        this.gridview.sortBy = 'subject'
        this.gridview.columns = [
            { name: 'subject', label: 'Subject', filter: true },
            { name: 'pname', label: 'Product', filter: true, width: 300 },
            { name: 'start', label: 'Date', filter: true, width: 300 },
            { name: 'id', label: '', filter: false, width: 20 }
        ]
        this.bind();
    }

    async bind(): Promise<void> {
        this.load();

        try {
            let source = await this.prom.all().toPromise()
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
        this.navigate('/central/prom/info/add')
    }

    edit(id: string): void {
        this.navigate(`/central/prom/info/edit/${id}`)
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
            let result = await this.prom.remove(id).toPromise()

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