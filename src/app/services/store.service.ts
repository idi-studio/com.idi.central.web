import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export interface IStockOption {
    id: string
    name: string
}

@Injectable()
export class StoreService extends RESTService {

    constructor(http: Http) { super(http) }

    add(value: any): Observable<any> {
        return super.post('/api/store', value).map((res: Response) => {
            return res.json();
        });
    }

    update(value: any): Observable<any> {
        return super.put(`/api/store/${value.id}`, value).map((res: Response) => {
            return res.json();
        });
    }

    remove(id: string): Observable<any> {
        return super.delete(`/api/store/${id}`).map((res: Response) => {
            return res.json();
        });
    }

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

    stockOptions(): Observable<Array<IStockOption>> {

        return super.get('/api/store/stock-options').map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<IStockOption>()
        });
    }
}