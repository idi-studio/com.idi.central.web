import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, TagService, IProductRow, ITag } from '../../../services';
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

    header: PageHeader = new PageHeader("Product", ["Retailing", "Product", "Edit"])

    formControlProdName = new FormControl('', [Validators.required, Validators.pattern(PROD_NAME_REGEX)])
    formControlProdCode = new FormControl('', [Validators.required, Validators.pattern(PROD_CODE_REGEX)])
    formControlProdCtg = new FormControl('', [Validators.required])
    formControlProdTag = new FormControl('', [Validators.required, Validators.pattern(PROD_TAG_REGEX)])

    selectedCategory: string;
    tags: [ITag] = [{ key: "Model", value: "Model" }, { key: "Color", value: "Color" }, { key: "Year", value: "Year" }]
    chips: ITag[];

    constructor(private product: ProductService, private route: ActivatedRoute, private snackBar: MdSnackBar,
        protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(router, loading, dialog)
    }

    ngOnInit(): void {
        this.chips = []
    }

    valid(): boolean {
        return this.formControlProdName.valid && this.formControlProdCode.valid
    }

    back(): void {
        this.navigate("central/prod/list")
    }

    remove(key: string): void {
        let index = this.chips.findIndex(chip => chip.key == key)
        this.chips.splice(index, 1)
    }

    add(category: string, tag: string) {
        if (this.formControlProdTag.invalid || this.selectedCategory == null) {
            return
        }

        this.chips.push({ key: category, value: tag });
        this.selectedCategory = "";
        this.formControlProdTag.setValue("");
        this.formControlProdTag.reset();
    }

}