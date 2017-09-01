import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { CustomerService, ICustomer } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './cust.component.html',
    styleUrls: ['cust.component.css']
})
export class CustomerComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    formControlCustName = new FormControl('', [Validators.required, Validators.pattern(Regex.CUST_NAME)])
    formControlPhone = new FormControl('', [Validators.required, Validators.pattern(Regex.PHONE_NUM)])
    formControlGrade = new FormControl({ value: "0" }, [Validators.required, Validators.min(0), Validators.max(100)])

    mode: Command;
    current: ICustomer = { id: "", name: "", gender: 0, grade: 0, phone: "", date: "", verified: false }

    constructor(private customer: CustomerService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MdSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.mode = this.getMode()

        switch (this.mode) {
            case Command.Create:
                this.header = new PageHeader("Customer", ["Retailing", "Customer", "Add"])
                break;
            case Command.Update:
                this.header = new PageHeader("Customer", ["Retailing", "Customer", "Edit"])
                break;
            default:
                this.back();
                break;
        }

        this.filter();
    }

    async filter(): Promise<void> {
        try {

            if (this.mode == Command.Update) {
                let id = this.getParam('id');
                this.current = await this.customer.single(id).toPromise()
            }
        }
        catch (error) {
            this.handle(error)
        }
    }

    editable(): boolean {
        return this.mode == Command.Update
    }

    valid(): boolean {
        return this.formControlCustName.valid && this.formControlPhone.valid && this.formControlGrade.valid
    }

    back(): void {
        this.navigate("central/cust/list")
    }

    async submit(): Promise<void> {
        if (!this.valid())
            return;

        try {

            let result: any;

            switch (this.mode) {
                case Command.Create:
                    result = await this.customer.add(this.current).toPromise()
                    break;
                case Command.Update:
                    result = await this.customer.update(this.current).toPromise()
                    break;
                default:
                    return;
            }

            this.show(result.message)
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

}