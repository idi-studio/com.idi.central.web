import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { DeliverService, IDeliver } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './deliver.component.html'
})
export class DeliverComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    formControlCourierNo = new FormControl('', [Validators.required, Validators.pattern(Regex.LETTERS_NUMBER)])

    current: IDeliver = { id: '', sn: '', cn: '' }

    constructor(private deliver: DeliverService, 
        protected route: ActivatedRoute, protected router: Router, protected snack: MdSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.header = new PageHeader('Order', ['Sales', 'Order', 'Deliver'])

        this.bind();
    }

    async bind(): Promise<void> {
        this.load();

        try {

        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    valid(): boolean {
        return this.formControlCourierNo.valid
    }

    back(): void {
        this.navigate('central/order/list')
    }

    async search(): Promise<void> {
        if (!this.valid())
            return
    }

}