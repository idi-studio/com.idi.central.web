import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, TagService, IProduct, ITag } from '../../../services';
import { BaseComponent, PageHeader } from '../../../core';
import 'rxjs/add/operator/toPromise';

const PROD_NAME_REGEX = /^[A-Za-z0-9]+$/;
const PROD_CODE_REGEX = /^[A-Za-z0-9]+$/;
const PROD_TAG_REGEX = /^[A-Za-z0-9]+$/;

@Component({
    templateUrl: './product-edit.component.html',
    styleUrls: ['product-edit.component.css']
})
export class ProductEditComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader("Product", ["Retailing", "Product", "Add"])

    formControlProdName = new FormControl('', [Validators.required, Validators.pattern(PROD_NAME_REGEX)])
    formControlProdCode = new FormControl('', [Validators.required, Validators.pattern(PROD_CODE_REGEX)])
    formControlProdCtg = new FormControl('', [Validators.required])
    formControlProdTag = new FormControl('', [Validators.required, Validators.pattern(PROD_TAG_REGEX)])

    name: string; code: string; selectedCategory: string;
    tags: ITag[];
    chips: ITag[] = [];

    constructor(private product: ProductService, private tag: TagService, private route: ActivatedRoute, private snackBar: MdSnackBar,
        protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(router, loading, dialog)
    }

    ngOnInit(): void {
        this.filter();
    }

    async filter(): Promise<void> {
        this.load();

        try {
            this.tags = await this.tag.all().toPromise()
        }
        catch (error) {
            this.tags = [];
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }

    valid(): boolean {
        return this.formControlProdName.valid && this.formControlProdCode.valid
    }

    back(): void {
        this.navigate("central/product/list")
    }

    remove(key: string): void {
        let index = this.chips.findIndex(chip => chip.key == key)
        this.chips.splice(index, 1)
    }

    add(category: string, tag: string) {
        if (this.formControlProdTag.invalid || this.selectedCategory == null) {
            return
        }

        let item = this.tags.filter(e => e.key == category)[0];

        this.chips.push({ key: item.key, name: item.name, value: tag });
        this.selectedCategory = "";
        this.formControlProdTag.setValue("");
        this.formControlProdTag.reset();
    }

    async submit(): Promise<void> {
        if (!this.valid)
            return;

        try {
            let result = await this.product.add(this.name, this.code, this.chips).toPromise()

            this.show(result.message)
        }
        catch (error) {
            this.tags = [];
            this.handleError(error)
        }
        finally {
            this.name = ""
            this.code = ""
            this.formControlProdName.reset();
            this.formControlProdCode.reset();
            this.unload()
        }
    }

}