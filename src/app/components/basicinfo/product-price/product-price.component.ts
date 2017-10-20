import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSelect, MatSelectChange } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, ProductPriceService, CategoryService, IProduct, IProductPrice, TypeNames } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex, PriceCategory } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product-price.component.html'
})
export class ProductPriceComponent extends BaseComponent implements OnInit {

    header: PageHeader
    cmd: Command
    categorys: any[]
    minDate = new Date(2010, 0, 1)
    maxDate = new Date(2030, 11, 31)
    currentProduct: IProduct = { id: '', name: '', code: '', tags: [], images: [], active: false, onshelf: false, skid: '', sku: 1, ss: 0, unit: 'PCS', bin: 'P001' }
    current: IProductPrice = { id: '', category: PriceCategory.Cost, categoryname: '', amount: 0.00, grade: 0, gradeto: 0, startdate: null, duedate: null, pid: '', active: false }

    formControlCategory = new FormControl('', [Validators.required])
    formControlAmount = new FormControl('', [Validators.required])
    formControlGrade = new FormControl({ value: '0' }, [Validators.required, Validators.min(0), Validators.max(100)])
    formControlGradeTo = new FormControl({ value: '0' }, [Validators.required, Validators.min(0), Validators.max(100)])
    formControlStart = new FormControl('', [Validators.required])
    formControlDue = new FormControl('', [Validators.required])

    constructor(private product: ProductService, private price: ProductPriceService, private category: CategoryService, private snackBar: MatSnackBar,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.cmd = this.command();

        switch (this.cmd) {
            case Command.Create:
                this.header = new PageHeader('Product', ['Basic Info', 'Product', 'Price', 'Add'])
                break;
            case Command.Update:
                this.header = new PageHeader('Product', ['Basic Info', 'Product', 'Price', 'Edit'])
                break;
            default:
                this.back()
                break;
        }

        this.filter();
    }

    async filter(): Promise<void> {
        this.load()

        try {
            let id = this.routeParams('id');

            this.categorys = await this.category.enums(TypeNames.PriceCategory).toPromise()

            if (this.cmd == Command.Create) {
                this.currentProduct = await this.product.single(id).toPromise()
                this.current.pid = this.currentProduct.id
            }

            if (this.cmd == Command.Update) {
                let data = await this.price.single(id).toPromise()
                this.current = data
                this.current.startdate = new Date(data.startdate)
                this.current.duedate = new Date(data.duedate)
                this.currentProduct = await this.product.single(this.current.pid).toPromise()
            }

            this.initUI()
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    valid(): boolean {
        let valid: boolean = true

        if (this.hasGrade(this.current.category)) {
            valid = this.formControlGrade.valid && this.formControlGradeTo.valid && this.current.grade <= this.current.gradeto
        }

        if (this.hasTerm(this.current.category)) {
            valid = valid && this.formControlStart.valid && this.formControlDue.valid
        }

        return valid && this.formControlCategory.valid && this.formControlAmount.valid
    }

    back(): void {
        this.navigate(`central/product/prices/${this.currentProduct.id}`)
    }

    onCategoryChanged(event: MatSelectChange): void {
        this.initUI();
    }

    hasTerm(category: number): boolean {
        switch (category) {
            case PriceCategory.Discount:
                return true
            default:
                return false
        }
    }

    hasGrade(category: number): boolean {
        switch (category) {
            case PriceCategory.Discount:
                return true
            default:
                return false
        }
    }

    initUI(): void {
        // this.header.title = this.currentProduct.name

        if (this.hasGrade(this.current.category)) {
            this.formControlGrade.enable()
        }
        else {
            this.formControlGrade.setValue(0)
            this.formControlGrade.disable()
        }
    }

    async submit(): Promise<void> {
        if (!this.valid())
            return

        try {

            let result: any;

            switch (this.cmd) {
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
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

}