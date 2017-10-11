import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, TagService, IProduct, ITag } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product.component.html'
})
export class ProductComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    formControlProdCtg = new FormControl('', [Validators.required])
    formControlProdName = new FormControl('', [Validators.required, Validators.pattern(Regex.PROD_NAME)])
    formControlProdCode = new FormControl('', [Validators.required, Validators.pattern(Regex.IDENTIFIER)])
    formControlProdTag = new FormControl('', [Validators.required, Validators.pattern(Regex.PROD_TAG)])

    cmd: Command;
    selectedCategory: string
    current: IProduct = { id: '', name: '', code: '', tags: [], images: [], active: false, onshelf: false }
    tags: ITag[]
    chips: ITag[] = []

    constructor(private product: ProductService, private tag: TagService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.cmd = this.command()

        switch (this.cmd) {
            case Command.Create:
                this.header = new PageHeader('Product', ['Basic Info', 'Product', 'Add'])
                break;
            case Command.Update:
                this.header = new PageHeader('Product', ['Basic Info', 'Product', 'Edit'])
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
            this.selectedCategory = this.tags.length > 0 ? this.tags[0].key : ''

            if (this.cmd == Command.Update) {
                let id = this.routeParams('id');
                this.current = await this.product.single(id).toPromise()
                this.chips = this.current.tags
            }
        }
        catch (error) {
            this.tags = [];
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    editable(): boolean {
        return this.cmd == Command.Update
    }

    valid(): boolean {
        return this.formControlProdName.valid && this.formControlProdCode.valid
    }

    back(): void {
        this.navigate('central/product/list')
    }

    setPrice(): void {
        this.navigate(`central/product/prices/${this.current.id}`)
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
        this.formControlProdTag.setValue('');
        this.formControlProdTag.reset();
    }

    async submit(): Promise<void> {
        if (!this.valid())
            return;

        try {

            let result: any;
            this.current.tags = this.chips

            switch (this.cmd) {
                case Command.Create:
                    result = await this.product.add(this.current).toPromise()
                    break;
                case Command.Update:
                    result = await this.product.update(this.current).toPromise()
                    break;
                default:
                    return;
            }

            this.show(result.message)
        }
        catch (error) {
            this.tags = [];
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

}