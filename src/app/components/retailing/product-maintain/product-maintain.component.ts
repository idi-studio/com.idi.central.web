import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, TagService, IProduct, ITag } from '../../../services';
import { BaseComponent, PageHeader, Maintain } from '../../../core';
import 'rxjs/add/operator/toPromise';

const PROD_NAME_REGEX = /^[A-Za-z0-9]+$/;
const PROD_CODE_REGEX = /^[A-Za-z0-9]+$/;
const PROD_TAG_REGEX = /^[A-Za-z0-9]+$/;

@Component({
    templateUrl: './product-maintain.component.html',
    styleUrls: ['product-maintain.component.css']
})
export class ProductMaintainComponent extends BaseComponent implements OnInit {

    header: PageHeader;// = new PageHeader("Product", ["Retailing", "Product", "Maintain"])
    formControlProdCtg = new FormControl('', [Validators.required])
    formControlProdName = new FormControl('', [Validators.required, Validators.pattern(PROD_NAME_REGEX)])
    formControlProdCode = new FormControl('', [Validators.required, Validators.pattern(PROD_CODE_REGEX)])
    formControlProdTag = new FormControl('', [Validators.required, Validators.pattern(PROD_TAG_REGEX)])

    mode: Maintain;
    selectedCategory: string
    current: IProduct = { id: "", name: "", code: "", tags: [], active: false }
    tags: ITag[]
    chips: ITag[] = []

    constructor(private product: ProductService, private tag: TagService, private route: ActivatedRoute, private snackBar: MdSnackBar,
        protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(router, loading, dialog)
    }

    ngOnInit(): void {
        this.mode = this.route.snapshot.paramMap.has('id') ? Maintain.Edit : Maintain.Add

        switch (this.mode) {
            case Maintain.Add:
                this.header = new PageHeader("Product", ["Retailing", "Product", "Add"])
                break;
            case Maintain.Edit:
                this.header = new PageHeader("Product", ["Retailing", "Product", "Edit"])
                break;
            default:
                break;
        }

        this.filter();
    }

    async filter(): Promise<void> {
        this.load();

        try {
            this.tags = await this.tag.all().toPromise()
            this.selectedCategory = this.tags.length > 0 ? this.tags[0].key : ""

            if (this.mode == Maintain.Edit) {
                let id = this.route.snapshot.paramMap.get('id');
                this.current = await this.product.single(id).toPromise()
                this.chips = this.current.tags
            }
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

        let tags = this.chips.filter(e => e.key == category)

        if (tags.length > 0) {
            this.show(`Duplicated Tag - ${tags[0].name}`)
            return
        }

        let item = this.tags.filter(e => e.key == category)[0];

        this.chips.push({ key: item.key, name: item.name, value: tag });
        this.formControlProdTag.setValue("");
        this.formControlProdTag.reset();
    }

    async submit(): Promise<void> {
        if (!this.valid)
            return;

        try {

            let result: any;
            this.current.tags = this.chips

            switch (this.mode) {
                case Maintain.Add:
                    result = await this.product.add(this.current).toPromise()
                    break;
                case Maintain.Edit:
                    result = await this.product.update(this.current).toPromise()
                    break;
                default:
                    return;
            }

            this.show(result.message)
        }
        catch (error) {
            this.tags = [];
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }

}