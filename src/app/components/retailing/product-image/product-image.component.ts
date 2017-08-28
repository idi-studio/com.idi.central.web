import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService, TdFileService, IUploadOptions } from '@covalent/core';
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
    files: FileList;
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
        }
        catch (error) {
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }

    delete(id: string): void {
        this.confirm("Are you confirm to delete this record?", (accepted) => {
            if (accepted) {
                this.handleDelete(id)
            }
        })
    }

    async handleDelete(id: string): Promise<void> {
        this.load();
        try {
            let result = await this.productImage.remove(id).toPromise()

            if (result.status == Status.Success) {
                let index = this.current.images.findIndex(image => image.id == id)
                this.current.images.splice(index, 1)
                this.snackBar.open("Product image(s) uploaded.", "", { duration: 2000, });
            }
            else {
                this.alert(result.message)
            }
        }
        catch (error) {
            this.handleError(error)
        }
        finally {
            this.unload()
        }
    }

    async upload(): Promise<void> {
        this.load();
        try {
            let result = await this.productImage.add(this.current.id, this.files).toPromise()

            if (result.status == Status.Success) {
                this.snackBar.open("Product image(s) uploaded.", "", { duration: 2000, });
                this.filter();
            }
            else {
                this.alert(result.message)
            }
        }
        catch (error) {
            this.handleError(error)
        }
        finally {
            this.files = null
            this.unload()
        }
    }

    back(): void {
        this.navigate("central/product/list")
    }

    selectEvent(files: FileList | File): void {
        if (files instanceof FileList) {
            for (var index = 0; index < files.length; index++) {
                var file = files[index];
                console.log(`filename:${file.name} ${file.size} ${file.type}`)
            }
        }
        else {
            console.log(`filename:${files.name} ${files.size} ${files.type}`)
        }
    };
}