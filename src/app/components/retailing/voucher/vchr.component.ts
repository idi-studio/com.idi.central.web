import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService, TdFileService, IUploadOptions, } from '@covalent/core';
import { VoucherService, CategoryService, IVoucher, TypeNames } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './vchr.component.html'
})
export class VoucherComponent extends BaseComponent implements OnInit {

    header: PageHeader
    mode: Command
    paymethods: any[]
    files: Array<File> = []
    current: IVoucher = { id: '', tn: '', sn: '', date: '', paymethod: 0, payamount: 0, orderamount: 0, remark: '', oid: '' }
    formControlPayAmount = new FormControl('', [Validators.required])

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
            this.paymethods = await this.category.all(TypeNames.PayMethod).toPromise()

            if (this.mode == Command.Update) {
                let id = this.getParam('id');
                this.current = await this.voucher.single(id).toPromise()
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    editable(): boolean {
        return this.mode == Command.Update
    }

    valid(): boolean {
        return this.formControlPayAmount.valid
    }

    back(): void {
        this.navigate('central/order/list')
    }

    equalamount(): boolean {
        return this.current.payamount === this.current.orderamount
    }

    async submit(): Promise<void> {
        if (!this.valid())
            return;

        try {

            let result: any;

            result = await this.voucher.update(this.current).toPromise()

            this.show(result.message)

            if (result.status === Status.Success) {
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
            console.log(files);

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