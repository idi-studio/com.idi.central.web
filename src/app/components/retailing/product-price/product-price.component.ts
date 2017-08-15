import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, ProductPriceService, CategoryService, IProduct, IProductPrice, TypeNames } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex, PriceCategory } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product-price.component.html',
    styleUrls: ['product-price.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ProductPriceComponent extends BaseComponent implements OnInit {

    header: PageHeader
    mode: Command
    priceCategory: any[]
    minDate = new Date(2010, 0, 1)
    maxDate = new Date(2030, 11, 31)
    currentProduct: IProduct = { id: "", name: "", code: "", tags: [], active: false }
    current: IProductPrice = { id: "", category: PriceCategory.Cost, amount: 0.00, grade: 0, startdate: null, duedate: null, pid: "", active: false }

    formControlCategory = new FormControl('', [Validators.required])
    formControlAmount = new FormControl('', [Validators.required])
    formControlGrade = new FormControl({ value: "", disabled: true }, [Validators.required])
    formControlStart = new FormControl('', [Validators.required, Validators.pattern(Regex.DATE)])
    formControlDue = new FormControl('', [Validators.required, Validators.pattern(Regex.DATE)])

    constructor(private product: ProductService, private price: ProductPriceService, private category: CategoryService, private snackBar: MdSnackBar,
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

            this.priceCategory = await this.category.all(TypeNames.PriceCategory).toPromise()

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
        return this.formControlAmount.valid && this.formControlGrade.valid && this.formControlStart.valid && this.formControlDue.valid
    }

    back(): void {
        this.navigate(`central/product/prices/${this.currentProduct.id}`)
    }

    async submit(): Promise<void> {

        console.log(this.current)

        if (!this.valid)
            return

        try {

            let result: any;

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
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }

}