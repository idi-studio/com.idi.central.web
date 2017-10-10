import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

@Injectable()
export class StoreService extends RESTService {

    constructor(http: Http) { super(http) }

    // add(value: any): observable<any> {
    //     return super.post('/api/product', value).map((res: response) => {
    //         return res.json();
    //     });
    // }

    // update(value: iproduct): observable<any> {
    //     return super.put(`/api/product/${value.id}`, value).map((res: response) => {
    //         return res.json();
    //     });
    // }

    // remove(id: string): observable<any> {
    //     return super.delete(`/api/product/${id}`).map((res: response) => {
    //         return res.json();
    //     });
    // }

    single(id: string): Observable<any> {
        return super.get(`/api/store/${id}`).map((res: Response) => {
            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return null;
        });
    }

    all(): Observable<Array<any>> {

        return super.get('/api/store/list').map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<any>()
        });
    }
}