import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../core';
import { ITag } from '../services';

export interface IProduct {
    id: string;
    name: string;
    code: string;
    tags: Array<ITag>;
    active: boolean;
}

@Injectable()
export class ProductService extends RESTService {

    constructor(http: Http) { super(http) }

    add(value: IProduct): Observable<any> {
        return super.post('/api/products', value).map((res: Response) => {
            return res.json();
        });
    }

    update(value: IProduct): Observable<any> {
        return super.put(`/api/products/${value.id}`, value).map((res: Response) => {
            return res.json();
        });
    }

    single(id: string): Observable<IProduct> {
        return super.get(`/api/products/${id}`).map((res: Response) => {
            var result = res.json();

            if (result.status == 1)
                return result.data

            return null;
        });
    }

    all(): Observable<Array<IProduct>> {

        return super.get('/api/products').map((res: Response) => {

            var result = res.json();

            if (result.status == 1)
                return result.data

            return new Array<IProduct>()
        });
    }
}