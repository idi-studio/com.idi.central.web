import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, IProductRow } from '../../../services';
import { BaseComponent, PageHeader } from '../../../core';
import 'rxjs/add/operator/toPromise';

const PROD_NAME_REGEX = /^[A-Za-z0-9]+$/;
const PROD_CODE_REGEX = /^[A-Za-z0-9]+$/;
const PROD_TAG_REGEX = /^[A-Za-z0-9]+$/;

@Component({
    templateUrl: './prod-edit.component.html',
    styleUrls: ['prod-edit.component.css']
})
export class ProdEditComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader("Product", ["Retailing", "Product", "Edit"]);

    formControlProdName = new FormControl('', [Validators.required, Validators.pattern(PROD_NAME_REGEX)]);
    formControlProdCode = new FormControl('', [Validators.required, Validators.pattern(PROD_CODE_REGEX)]);
    formControlProdTag = new FormControl('', [Validators.required, Validators.pattern(PROD_TAG_REGEX)]);

    tag: any = { key: "Model", value: "Model" }
    tags: [any] = [{ key: "Model", value: "Model" }, { key: "Color", value: "Color" }, { key: "Year", value: "Year" }]

    constructor(private product: ProductService, private route: ActivatedRoute, private snackBar: MdSnackBar,
        protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(router, loading, dialog)
    }

    ngOnInit(): void {

    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    back(): void {
        this.navigate("central/prod/list")
    }
}