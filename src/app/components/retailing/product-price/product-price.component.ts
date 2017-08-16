import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar, MdSelect, MdSelectChange } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, ProductPriceService, CategoryService, IProduct, IProductPrice, TypeNames } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex, PriceCategory } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product-price.component.html',
    styleUrls: ['product-price.component.css'],
})
export class ProductPriceComponent extends BaseComponent implements OnInit {

    header: PageHeader
    mode: Command
    priceCategory: any[]
    minDate = new Date(2010, 0, 1)
    maxDate = new Date(2030, 11, 31)
    currentProduct: IProduct = { id: "", name: "", code: "", tags: [], active: false }
    current: IProductPrice = { id: "", category: PriceCategory.Cost, categoryname: "", amount: 0.00, grade: 0, startdate: null, duedate: null, pid: "", active: false }

    formControlCategory = new FormControl('', [Validators.required])
    formControlAmount = new FormControl('', [Validators.required])
    formControlGrade = new FormControl({ value: "0", disabled: true }, [Validators.required, Validators.min(0), Validators.max(100)])
    formControlStart = new FormControl('', [Validators.required])
    formControlDue = new FormControl('', [Validators.required])
    // formControlStart = new FormControl('', [Validators.required, Validators.pattern(Regex.DATE)])
    // formControlDue = new FormControl('', [Validators.required, Validators.pattern(Regex.DATE)])

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
                this.current.pid = this.currentProduct.id
            }

            if (this.mode == Command.Update) {
                let data = await this.price.single(id).toPromise()
                this.current = data
                this.current.startdate = new Date(data.startdate)
                this.current.duedate = new Date(data.startdate)
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
        if (this.current.category == PriceCategory.VIP) {
            return this.formControlCategory.valid && this.formControlAmount.valid && this.formControlGrade.valid && this.formControlStart.valid && this.formControlDue.valid
        }
        return this.formControlCategory.valid && this.formControlAmount.valid && this.formControlStart.valid && this.formControlDue.valid
    }

    back(): void {
        this.navigate(`central/product/prices/${this.currentProduct.id}`)
    }

    onCategoryChanged(event: MdSelectChange): void {
        if (event.value == PriceCategory.VIP) {
            this.formControlGrade.enable()
        }
        else {
            this.formControlGrade.setValue(0)
            this.formControlGrade.disable()
        }
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