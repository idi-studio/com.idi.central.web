import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService, TdFileService, IUploadOptions, } from '@covalent/core';
import { VoucherService, CategoryService, IVoucher, TypeNames } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex, TradeStatus } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './vchr.component.html'
})
export class VoucherComponent extends BaseComponent implements OnInit {

    header: PageHeader
    mode: Command
    paymethods: any[]
    statuses: any[]
    files: Array<File> = []
    current: IVoucher = { id: '', tn: '', status: 0, sn: '', date: '', paymethod: 0, payment: 0, payable: 0, remark: '', oid: '' }
    formControlPayment = new FormControl({value: '', disabled: true}, [Validators.required,Validators.min(0.01)])
    formControlPaymethod = new FormControl({value: '', disabled: true}, [Validators.required])

    constructor(private voucher: VoucherService, private category: CategoryService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MdSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.mode = this.getMode()

        this.init()

        switch (this.mode) {
            case Command.View:
                this.header = new PageHeader('Voucher', ['Retailing', 'Customer', 'View'])
                break;
            case Command.Update:
                this.header = new PageHeader('Voucher', ['Retailing', 'Voucher', 'Edit'])
                break;
            default:
                this.back();
                break;
        }
    }

    async init(): Promise<void> {

        this.load();

        try {
            let id = this.getParam('id');
            this.paymethods = await this.category.all(TypeNames.PayMethod).toPromise()
            this.statuses = await this.category.all(TypeNames.TradeStatus).toPromise()
            this.current = await this.voucher.single(id).toPromise()

            if (this.editable()) {
                this.formControlPayment.enable()
                this.formControlPaymethod.enable()
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    valid(): boolean {
        return this.formControlPayment.valid
    }

    back(): void {
        this.navigate('central/order/list')
    }

    equalamount(): boolean {
        return this.current.payment === this.current.payable
    }

    async done(): Promise<void> {

        if (!this.valid()) {
            this.show("Invalid voucher.")
            return
        }

        this.confirm('Are you sure to confirm this voucher?', (accepted) => {
            if (accepted) {
                this.doneHandle()
            }
        })
    }

    async doneHandle(): Promise<void> {

        if (!this.valid())
            return

        try {
            let result = await this.voucher.paid(this.current.id).toPromise()

            this.show(result.message)

            if (result.status == Status.Success) {
                this.init()
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
            return;

        try {

            let result: any;

            result = await this.voucher.update(this.current).toPromise()

            this.show(result.message)
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    editable(): boolean {
        if (this.mode != Command.Update)
            return false

        return this.current.status === TradeStatus.InProcess
    }

    selectEvent(files: FileList | File): void {
        if (files instanceof File) {
            this.attach([files]);
        } else {
            this.show("Please select a voucher image.")
        }
    };

    async attach(files: Array<File>): Promise<void> {

        this.load();

        try {
            let result = await this.voucher.attach(this.current.id, files).toPromise()

            this.show(result.message);

            if (result.status === Status.Success) {
                this.init();
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.files = []
            this.unload()
        }
    }

}