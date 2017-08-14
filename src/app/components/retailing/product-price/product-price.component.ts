import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, ProductPriceService, IProduct, IProductPrice } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, PriceCategory } from '../../../core';
import 'rxjs/add/operator/toPromise';

const PROD_NAME_REGEX = /^[A-Za-z0-9]+$/;
const PROD_CODE_REGEX = /^[A-Za-z0-9]+$/;
const PROD_TAG_REGEX = /^[A-Za-z0-9]+$/;

@Component({
    templateUrl: './product-price.component.html',
    styleUrls: ['product-price.component.css']
})
export class ProductPriceComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    formControlProdCtg = new FormControl('', [Validators.required])
    formControlProdName = new FormControl('', [Validators.required, Validators.pattern(PROD_NAME_REGEX)])
    formControlProdCode = new FormControl('', [Validators.required, Validators.pattern(PROD_CODE_REGEX)])
    formControlProdTag = new FormControl('', [Validators.required, Validators.pattern(PROD_TAG_REGEX)])

    mode: Command;
    currentProduct: IProduct = { id: "", name: "", code: "", tags: [], active: false }
    current: IProductPrice = { id: "", category: PriceCategory.Cost, amount: 0.00, grade: 0, startdate: null, duedate: null, pid: "", active: false }

    constructor(private product: ProductService, private price: ProductPriceService, private snackBar: MdSnackBar,
        protected route: ActivatedRoute, protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, loading, dialog)
    }

    ngOnInit(): void {
        this.mode = this.getMode();

        switch (this.mode) {
            case Command.Create:
                this.header = new PageHeader("Product", ["Retailing", "Product", "Price", "Add"])
                break;
            case Command.Update:
                this.header = new PageHeader("Product", ["Retailing", "Product", "Price", "Edit"])
                break;
            default:
                this.back()
                break;
        }

        this.filter();
    }

    async filter(): Promise<void> {
        this.load();

        try {
            let id = this.getParam('id');

            if (this.mode == Command.Create) {
                this.currentProduct = await this.product.single(id).toPromise()
            }

            if (this.mode == Command.Update) {
                this.current = await this.price.single(id).toPromise()
                this.currentProduct = await this.product.single(this.current.pid).toPromise()
            }

            this.header.title = `Product - ${this.currentProduct.name}`
        }
        catch (error) {
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
        this.navigate(`central/product/prices/${this.currentProduct.id}`)
    }

    // remove(key: string): void {
    //     let index = this.chips.findIndex(chip => chip.key == key)
    //     this.chips.splice(index, 1)
    // }

    // add(category: string, tag: string) {
    //     if (this.formControlProdTag.invalid || this.selectedCategory == null) {
    //         return
    //     }

    //     let tags = this.chips.filter(e => e.key == category)

    //     if (tags.length > 0) {
    //         this.alert(`Duplicated Tag - ${tags[0].name}`)
    //         return
    //     }

    //     let item = this.tags.filter(e => e.key == category)[0];

    //     this.chips.push({ key: item.key, name: item.name, value: tag });
    //     this.formControlProdTag.setValue("");
    //     this.formControlProdTag.reset();
    // }

    async submit(): Promise<void> {
        if (!this.valid)
            return;

        try {

            let result: any;
            // this.current.tags = this.chips

            switch (this.mode) {
                case Command.Create:
                    result = await this.price.add(this.current).toPromise()
                    break;
                case Command.Update:
                    result = await this.price.update(this.current).toPromise()
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
            // this.tags = [];
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }

}