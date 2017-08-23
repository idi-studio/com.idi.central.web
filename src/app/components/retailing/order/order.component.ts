import { Component, OnInit } from '@angular/core';
// import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { OrderService, OrderItemService, IOrder, IOrderItem } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex } from '../../../core';
import { List } from 'linqts'
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './order.component.html',
    styleUrls: ['order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    mode: Command;
    current: IOrder = { id: "", customerid: "", sn: "", status: "", statusdesc: "", date: "", remark: "", items: [] }

    constructor(private order: OrderService, private orderitem: OrderItemService, private snackBar: MdSnackBar,
        protected route: ActivatedRoute, protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, loading, dialog)
    }

    ngOnInit(): void {
        this.mode = this.getMode()

        switch (this.mode) {
            case Command.Update:
                this.header = new PageHeader("Order", ["Retailing", "Order", "Edit"])
                break;
            default:
                this.back();
                break;
        }

        this.filter();
    }

    async filter(): Promise<void> {
        this.load();

        try {
            let id = this.getParam("id");
            this.current = await this.order.single(id).toPromise()

            // this.current.items.push({ id: "1", name: "iPhone7", unitprice: 5484.00, qty: 2, newunitprice: null, oid: this.current.id, pid: "1" })
            // this.current.items.push({ id: "2", name: "iPhone6", unitprice: 4866.07, qty: 3, newunitprice: null, oid: this.current.id, pid: "2" })
        }
        catch (error) {
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }

    total(): number {
        return new List(this.current.items).Sum(e => e.unitprice * e.qty);
    }

    back(): void {
        this.navigate("central/order/list")
    }

    add(id: string): void {
        this.navigate(`central/order/item/add/${id}`)
    }

    delete(id: string): void {

        this.confirm("Are you confirm to delete this record?", (accepted) => {
            if (accepted) {
                this.handleDelete(id)
            }
        })
    }

    async handleDelete(id: string): Promise<void> {
        try {
            let result = await this.orderitem.remove(id).toPromise()
            this.alert(result.message)
            this.filter();
        }
        catch (error) {
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }
}