import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService, IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { OrderService, OrderItemService, ProductService, CustomerService, IOrder, IOrderItem, IProductSell, INewOrderItem, IPrice, ICustomer } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex, PriceCategory, OrderStatus, ObjectValidator } from '../../../core';
import { List } from 'linqts'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: './order.component.html'
})
export class OrderComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    mode: Command;
    current: IOrder = { id: '', custid: '', sn: '', status: 0, statusdesc: '', date: '', remark: '', items: [] }
    orderId: string;
    options: ICustomer[] = []
    filteredOptions: Observable<ICustomer[]>
    formControlCustomer = new FormControl('', [Validators.required, ObjectValidator()])
    formControlRemark = new FormControl({ value: 'N/A' }, [Validators.required, ObjectValidator()])

    data: IProductSell[] = []

    columns: ITdDataTableColumn[] = [
        { name: 'name', label: 'Name', filter: true },
        { name: 'code', label: 'Code', filter: true, hidden: true },
        { name: 'desc', label: 'Description', filter: true, hidden: true },
        { name: 'tags', label: 'Tags', filter: false },
        { name: 'price', label: 'Price', filter: false },
        { name: 'id', label: '', filter: false, hidden: false },
    ];

    showlist: boolean = false;
    clickable: boolean = true;
    selectable: boolean = false;
    filteredData: any[] = this.data;
    filteredTotal: number = this.data.length;
    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 5;
    sortBy: string = 'name';
    selectedRows: any[] = [];
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    constructor(private order: OrderService, private orderItem: OrderItemService,
        private product: ProductService, private customer: CustomerService, private dataTable: TdDataTableService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MdSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.bindView();
        this.bindTable();

        this.filteredOptions = this.formControlCustomer.valueChanges.startWith(null)
            .map(cust => cust && typeof cust === 'object' ? cust.name : cust)
            .map(name => name ? this.filter(name) : this.options.slice());
    }

    filter(name: string): ICustomer[] {
        return this.options.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    display(cust: ICustomer): string {
        return cust ? cust.name : '';
    }

    async bindView(): Promise<void> {
        this.load();

        try {
            this.mode = this.command()
            this.orderId = this.routeParams('id');
            this.current = await this.order.single(this.orderId).toPromise()
            this.options = await this.customer.all().toPromise()

            let cust = new List(this.options).FirstOrDefault(e => e.id == this.current.custid)
            this.formControlCustomer.setValue(cust)

            if (!this.editable()) {
                this.formControlRemark.disable()
                this.formControlCustomer.disable()
            }

            switch (this.mode) {
                case Command.View:
                    this.header = new PageHeader('Order', ['Sales', 'Order', 'View'])
                    break;
                case Command.Update:
                    this.header = new PageHeader('Order', ['Sales', 'Order', 'Edit'])
                    break;
                default:
                    this.back();
                    break;
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    async bindTable(): Promise<void> {
        this.load();

        try {
            this.mode = this.command()
            this.orderId = this.routeParams('id');
            this.current = await this.order.single(this.orderId).toPromise()
            this.data = await this.product.selling(this.current.custid).toPromise()
        }
        catch (error) {
            this.data = []
            this.handle(error)
        }
        finally {
            this.unload()

            let newData: IProductSell[] = this.data;

            let excludedColumns: string[] = this.columns
                .filter((column: ITdDataTableColumn) => {
                    return ((column.filter === undefined && column.hidden === true) || (column.filter !== undefined && column.filter === false));
                }).map((column: ITdDataTableColumn) => {
                    return column.name;
                });

            newData = this.dataTable.filterData(newData, this.searchTerm, true, excludedColumns);
            this.filteredTotal = newData.length;
            newData = this.dataTable.sortData(newData, this.sortBy, this.sortOrder);
            newData = this.dataTable.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
            this.filteredData = newData;
        }
    }

    total(): number {
        return new List(this.current.items).Sum(e => e.unitprice * e.qty);
    }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.bindTable();
    }

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.bindTable();
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.bindTable();
    }

    editable(): boolean {
        if (this.mode == Command.View)
            return false

        return this.current.status === OrderStatus.Pending
    }

    back(): void {
        this.navigate('central/order/list')
    }

    shopping(): void {
        this.showlist = true;
    }

    valid(): boolean {
        var valid = this.formControlCustomer.valid

        if (valid) {
            var cust = this.formControlCustomer.value as ICustomer
            this.current.custid = cust.id
        }
        else {
            this.current.custid = ''
        }

        return valid;
    }

    async done(): Promise<void> {

        if (!this.valid() || this.current.items.length === 0) {
            this.show("Incompleted order.")
            return
        }

        this.confirm('Are you sure to confirm this order?', (accepted) => {
            if (accepted) {
                this.doneHandle()
            }
        })
    }

    async doneHandle(): Promise<void> {

        if (!this.valid())
            return

        try {
            let result = await this.order.confirm(this.current.id).toPromise()

            this.show(result.message)

            if (result.status == Status.Success) {
                this.bindView()
                this.bindTable()
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    async save(): Promise<void> {

        if (!this.valid())
            return

        try {
            let result = await this.order.update(this.current).toPromise()

            this.show(result.message)

            if (result.status == Status.Success) {
                this.bindTable()
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    async add(pid: string, priceid: string): Promise<void> {
        try {
            let item: INewOrderItem = { oid: this.orderId, pid: pid, priceid: priceid, qty: 1 }
            let result = await this.orderItem.add(item).toPromise()

            if (result.status == Status.Success) {
                this.show('Order updated.')
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

    cancel(): void {
        this.showlist = false;
        this.bindTable();
    }

    delete(): void {

        this.confirm('Are you confirm to delete this order?', (accepted) => {
            if (accepted) {
                this.deleteHandle()
            }
        })
    }

    async deleteHandle(): Promise<void> {
        try {
            let result = await this.order.remove(this.current.id).toPromise()
            this.show(result.message)
            if (result.status == Status.Success) {
                this.back()
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    deleteItem(id: string): void {

        this.confirm('Are you confirm to delete this record?', (accepted) => {
            if (accepted) {
                this.deleteItemHandle(id)
            }
        })
    }

    async deleteItemHandle(id: string): Promise<void> {
        try {
            let result = await this.orderItem.remove(id).toPromise()
            this.alert(result.message)
            this.bindTable();
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }
}

