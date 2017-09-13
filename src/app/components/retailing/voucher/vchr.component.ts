import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
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
    current: IVoucher = { id: '', tn: '', sn: '', date: '', paymethod: 0, payamount: 0, orderamount: 0, remark: '', oid: '' }
    formControlPayAmount = new FormControl('', [Validators.required])
    // formControlPhone = new FormControl('', [Validators.required, Validators.pattern(Regex.PHONE_NUM)])
    // formControlGrade = new FormControl({ value: '0' }, [Validators.required, Validators.min(0), Validators.max(100)])

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

}