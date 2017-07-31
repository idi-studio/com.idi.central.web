import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../core';

export interface IProductRow {
    id: string;
    name: string;
    code: string;
    profile: any;
    active: boolean;
}

@Injectable()
export class ProductService extends RESTService {

    constructor(http: Http) { super(http) }

    all(): Observable<Array<IProductRow>> {

        return super.get('/api/products').map((res: Response) => {

            var result = res.json();

            if (result.status == 1)
                return result.data.rows

            return new Array<IProductRow>()
        });
    }
}