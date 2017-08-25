import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, TagService, IProduct, ITag } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product.component.html',
    styleUrls: ['product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    formControlProdCtg = new FormControl('', [Validators.required])
    formControlProdName = new FormControl('', [Validators.required, Validators.pattern(Regex.PROD_NAME)])
    formControlProdCode = new FormControl('', [Validators.required, Validators.pattern(Regex.IDENTIFIER)])
    formControlProdTag = new FormControl('', [Validators.required, Validators.pattern(Regex.PROD_TAG)])

    mode: Command;
    selectedCategory: string
    current: IProduct = { id: "", name: "", code: "", tags: [], active: false, onshelf: false }
    tags: ITag[]
    chips: ITag[] = []

    constructor(private product: ProductService, private tag: TagService, private snackBar: MdSnackBar,
        protected route: ActivatedRoute, protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, loading, dialog)
    }

    ngOnInit(): void {
        this.mode = this.getMode()

        switch (this.mode) {
            case Command.Create:
                this.header = new PageHeader("Product", ["Retailing", "Product", "Add"])
                break;
            case Command.Update:
                this.header = new PageHeader("Product", ["Retailing", "Product", "Edit"])
                break;
            default:
                this.back();
                break;
        }

        this.filter();
    }

    async filter(): Promise<void> {
        this.load();

        try {
            this.tags = await this.tag.all().toPromise()
            this.selectedCategory = this.tags.length > 0 ? this.tags[0].key : ""

            if (this.mode == Command.Update) {
                let id = this.getParam('id');
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

    editable(): boolean {
        return this.mode == Command.Update
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
            this.alert(`Duplicated Tag - ${tags[0].name}`)
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
                case Command.Create:
                    result = await this.product.add(this.current).toPromise()
                    break;
                case Command.Update:
                    result = await this.product.update(this.current).toPromise()
                    break;
                default:
                    return;
            }

            this.alert(result.message)

            if (result.status == Status.Success) {
                this.back()
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

}