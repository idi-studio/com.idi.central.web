import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, IProduct } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product-image.component.html',
})
export class ProductImageComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    mode: Command;
    pid: string;
    current: IProduct = { id: "", name: "", code: "", tags: [], active: false, onshelf: false }

    constructor(private product: ProductService, private snackBar: MdSnackBar,
        protected route: ActivatedRoute, protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, loading, dialog)
    }

    ngOnInit(): void {
        this.header = new PageHeader("Product", ["Retailing", "Product", "Image"])
        this.pid = this.getParam("id")
        this.filter();
    }

    async filter(): Promise<void> {
        this.load();

        try {
            this.current = await this.product.single(this.pid).toPromise()

            this.header.title = `Product - ${this.current.name}`
        }
        catch (error) {
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }

    back(): void {
        this.navigate("central/product/list")
    }

    fileSelectMultipleMsg: string = 'No file(s) selected yet.';
    fileUploadMultipleMsg: string = 'No file(s) uploaded yet.';

    selectMultipleEvent(files: FileList | File): void {
        if (files instanceof FileList) {
            let names: string[] = [];
            for (let i: number = 0; i < files.length; i++) {
                names.push(files[i].name);
            }
            this.fileSelectMultipleMsg = names.join(',');
        } else {
            this.fileSelectMultipleMsg = files.name;
        }
    }

    uploadMultipleEvent(files: FileList | File): void {
        if (files instanceof FileList) {
            let names: string[] = [];
            for (let i: number = 0; i < files.length; i++) {
                names.push(files[i].name);
            }
            this.fileUploadMultipleMsg = names.join(',');
        } else {
            this.fileUploadMultipleMsg = files.name;
        }
    }

    cancelMultipleEvent(): void {
        this.fileSelectMultipleMsg = 'No file(s) selected yet.';
        this.fileUploadMultipleMsg = 'No file(s) uploaded yet.';
    }
}