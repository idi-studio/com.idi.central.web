import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { ProductService, ProductImageService, IProduct, IProductImage } from '../../../services';
import { BaseComponent, PageHeader, Command, Status, Regex } from '../../../core';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './product-image.component.html',
    styleUrls: ['product-image.component.css']
})
export class ProductImageComponent extends BaseComponent implements OnInit {

    header: PageHeader;
    mode: Command;
    pid: string;
    files: any;
    current: IProduct = { id: "", name: "", code: "", tags: [], images: [], active: false, onshelf: false }

    constructor(private product: ProductService, private productImage: ProductImageService, private snackBar: MdSnackBar,
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

            for (var index = 0; index < 6; index++) {
                this.current.images.push({ id: `${index + 1}`, name: `${index + 1}`, filename: `${index + 1}.jpg`, pid: this.current.id })
            }

        }
        catch (error) {
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }

    async delete(id: string): Promise<void> {
    }

    back(): void {
        this.navigate("central/product/list")
    }

    // fileSelectMultipleMsg: string = 'No file(s) selected yet.';
    // fileUploadMultipleMsg: string = 'No file(s) uploaded yet.';

    // selectMultipleEvent(files: FileList | File): void {
    //     if (files instanceof FileList) {
    //         let names: string[] = [];
    //         for (let i: number = 0; i < files.length; i++) {
    //             names.push(files[i].name);
    //         }
    //         this.fileSelectMultipleMsg = names.join(',');
    //     } else {
    //         this.fileSelectMultipleMsg = files.name;
    //     }
    // }

    // uploadMultipleEvent(files: FileList | File): void {
    //     if (files instanceof FileList) {
    //         let names: string[] = [];
    //         for (let i: number = 0; i < files.length; i++) {
    //             names.push(files[i].name);
    //         }
    //         this.fileUploadMultipleMsg = names.join(',');
    //     } else {
    //         this.fileUploadMultipleMsg = files.name;
    //     }
    // }

    // cancelMultipleEvent(): void {
    //     this.fileSelectMultipleMsg = 'No file(s) selected yet.';
    //     this.fileUploadMultipleMsg = 'No file(s) uploaded yet.';
    // }
}