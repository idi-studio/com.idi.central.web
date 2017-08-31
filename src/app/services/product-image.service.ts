import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { TdFileService, IUploadOptions } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export interface IProductImage {
    id: string
    pid: string
    sn: number
    name: string
    category: number
    filename: string
    url:string
    date: string
}

@Injectable()
export class ProductImageService extends RESTService {

    constructor(http: Http, file: TdFileService) { super(http, file) }

    add(pid: string, files: File[]): Observable<any> {
        let formData = new FormData()
        formData.append("pid", pid)
        return this.upload("/api/product/picture", files, formData)
    }

    batch(pid: string, images: IProductImage[]): Observable<any> {
        return super.put(`/api/product/picture/${pid}`, { images: images }).map((res: Response) => {
            return res.json();
        });
    }

    remove(id: string): Observable<any> {
        return super.delete(`/api/product/picture/${id}`).map((res: Response) => {
            return res.json();
        });
    }
}