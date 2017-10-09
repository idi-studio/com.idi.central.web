import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { CustomerService, AddressService, ICustomer, IAddress } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex, Grade } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './cust.component.html'
})
export class CustomerComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    formControlCustName = new FormControl('', [Validators.required, Validators.pattern(Regex.CUST_NAME)])
    formControlPhone = new FormControl('', [Validators.required, Validators.pattern(Regex.PHONE_NUM)])
    formControlGrade = new FormControl({ value: '0' }, [Validators.required, Validators.min(0), Validators.max(100)])

    formControlReceiver = new FormControl('', [Validators.required, Validators.pattern(Regex.CUST_NAME)])
    formControlContactNo = new FormControl('', [Validators.required, Validators.pattern(Regex.PHONE_NUM)])
    formControlProvince = new FormControl('', [Validators.required])
    formControlCity = new FormControl('', [Validators.required])
    formControlArea = new FormControl('', [Validators.required])
    formControlStreet = new FormControl('', [Validators.required])
    formControlDetail = new FormControl('', [Validators.required])
    formControlPostcode = new FormControl('', [Validators.required])

    mode: Command
    cmd: Command = Command.Create
    grade = Grade
    enabled: boolean = false
    current: ICustomer = { id: '', name: '', gender: 0, grade: 0, phone: '', date: '', verified: false, shippings: [] }
    shipping: IAddress = { id: '', cid: '', receiver: '', contactno: '', province: '', city: '', area: '', street: '', detail: '', postcode: '', default: false, }

    constructor(private customer: CustomerService, private address: AddressService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.mode = this.command()

        switch (this.mode) {
            case Command.Create:
                this.header = new PageHeader('Customer', ['Sales', 'Customer', 'Add'])
                break;
            case Command.Update:
                this.header = new PageHeader('Customer', ['Sales', 'Customer', 'Edit'])
                break;
            default:
                this.back()
                break;
        }

        this.bind()
    }

    async bind(): Promise<void> {
        try {

            if (this.mode == Command.Update) {
                let id = this.routeParams('id');
                this.current = await this.customer.single(id).toPromise()
                this.shipping.receiver = this.current.name
                this.shipping.contactno = this.current.phone
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

    check(): boolean {
        return this.formControlReceiver.valid && this.formControlContactNo.valid && this.formControlProvince.valid && this.formControlCity.valid &&
            this.formControlArea.valid && this.formControlStreet.valid && this.formControlDetail.valid && this.formControlPostcode.valid
    }

    back(): void {
        this.navigate('central/cust/list')
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

    async save(): Promise<void> {
        if (!this.check())
            return

        try {

            let result: any;

            switch (this.cmd) {
                case Command.Create:
                    result = await this.address.add(this.shipping).toPromise()
                    break;
                case Command.Update:
                    result = await this.address.update(this.shipping).toPromise()
                    break;
                default:
                    return;
            }

            this.show(result.message)

            if (result.status === Status.Success) {
                this.bind()
                this.close()
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
        this.confirm('Are you sure to delete this record?', (accepted) => {
            if (accepted) {
                this.deleteHandle(id)
            }
        })
    }

    async deleteHandle(id: string): Promise<void> {
        try {
            let result = await this.address.remove(id).toPromise()

            this.show(result.message)

            if (result.status == Status.Success) {
                this.bind()
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    create(): void {
        this.cmd = Command.Create
        this.shipping = { id: '', cid: '', receiver: '', contactno: '', province: '', city: '', area: '', street: '', detail: '', postcode: '', default: false, }
        if (this.mode == Command.Update) {
            this.shipping.cid = this.current.id
            this.shipping.receiver = this.current.name
            this.shipping.contactno = this.current.phone
        }
        this.enabled = true
    }

    edit(value: IAddress): void {
        this.cmd = Command.Update
        this.shipping = value
        this.enabled = true
    }

    close(): void {
        this.enabled = false
    }
}