import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, PageEvent, MatPaginatorIntl } from '@angular/material';
import { TdDialogService, TdLoadingService, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { OrderService, IOrder, VoucherService, IVoucher } from '../../../services';
import { BaseComponent, PageHeader, Status, OrderStatus, GirdView } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './order-list.component.html'
})
export class OrderListComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Orders', ['Sales', 'Orders']);
    gridview: GirdView

    constructor(private order: OrderService, private voucher: VoucherService, private dataTable: TdDataTableService, private paginator: MatPaginatorIntl,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.gridview = new GirdView(this.dataTable, this.paginator)
        this.gridview.sortBy = 'sn'
        this.gridview.columns = [
            { name: 'sn', label: 'SN', filter: true, width: 200 },
            { name: 'statusdesc', label: 'Status', filter: true, width: 120 },
            { name: 'custname', label: 'Customer', filter: true, width: 200 },
            { name: 'date', label: 'Date', filter: true },
            { name: 'id', label: '', filter: false, width: 20 }
        ]
        this.bind()
    }

    async bind(): Promise<void> {
        this.load()

        try {
            let source = await this.order.all().toPromise()
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

    async add(): Promise<any> {
        try {
            let order = { cid: null, remark: 'N/A' }

            let result = await this.order.add(order).toPromise()

            if (result.status == Status.Success) {
                this.navigate(`/central/order/edit/${result.details.oid}`)
            }
            else {
                this.alert(result.message)
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    edit(id: string): void {
        this.navigate(`/central/order/edit/${id}`)
    }

    view(id: string): void {
        this.navigate(`/central/order/view/${id}`)
    }

    deliver(id: string): void {
        this.navigate(`/central/deliver/${id}`)
    }

    async govoucher(id: string): Promise<void> {
        try {
            const vchr: IVoucher = { id: '', tn: '', status: 0, sn: '', date: '', paymethod: 0, payment: 0, payable: 0, remark: '', oid: id, doc: '' }
            let result = await this.voucher.add(vchr).toPromise()
            this.show(result.message)

            if (result.status === Status.Success) {
                this.navigate(`/central/vchr/${result.details.vchrid}`)
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
            let result = await this.order.remove(id).toPromise()
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

    display(menu: string, status: OrderStatus): boolean {

        if (menu === "view" || menu === "voucher")
            return true

        if (menu === "edit" && status == OrderStatus.Pending)
            return true

        if (menu === "remove" && status == OrderStatus.Pending)
            return true

        if (menu === "deliver" && (status == OrderStatus.Paid || status == OrderStatus.Shipped || status == OrderStatus.Received || status == OrderStatus.Traded))
            return true

        return false
    }


}