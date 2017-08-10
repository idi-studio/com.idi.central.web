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

    add(name: string, code: string, tags: ITag[]): Observable<any> {
        return super.post('/api/products', { name: name, code: code, tags: tags }).map((res: Response) => {
            return res.json();
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