import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export interface IProductPrice {
    id: string;
    category: number;
    categoryname: string;
    amount: number;
    grade: number;
    startdate: Date;
    duedate: Date;
    pid: string;
    active: boolean;
}

@Injectable()
export class ProductPriceService extends RESTService {

    constructor(http: Http) { super(http) }

    add(value: IProductPrice): Observable<any> {
        return super.post('/api/product/price', value).map((res: Response) => {
            return res.json();
        });
    }

    update(value: IProductPrice): Observable<any> {
        return super.put(`/api/product/price/${value.id}`, value).map((res: Response) => {
            return res.json();
        });
    }

    remove(id: string): Observable<any> {
        return super.delete(`/api/product/price/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    single(id: string): Observable<IProductPrice> {
        return super.get(`/api/product/price/${id}`).map((res: Response) => {
            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return null;
        });
    }

    all(id: string): Observable<Array<IProductPrice>> {

        return super.get(`/api/product/prices/${id}`).map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<IProductPrice>()
        });
    }
}