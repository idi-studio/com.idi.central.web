import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';
import { ITag } from '../services';

export interface IOrderItem {
    id: string
    name: string
    oid: string
    pid: string
    unitprice: number
    qty: number
}

export interface INewOrderItem {
    oid: string
    pid: string
    unitprice: number
    qty: number
}

@Injectable()
export class OrderItemService extends RESTService {

    constructor(http: Http) { super(http) }

    add(value: INewOrderItem): Observable<any> {
        return super.post('/api/order/item', value).map((res: Response) => {
            return res.json();
        });
    }

    update(value: IOrderItem): Observable<any> {
        return super.put(`/api/order/item/${value.id}`, value).map((res: Response) => {
            return res.json();
        });
    }

    remove(id: string): Observable<any> {
        return super.delete(`/api/order/item/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    single(id: string): Observable<IOrderItem> {
        return super.get(`/api/order/item/${id}`).map((res: Response) => {
            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return null;
        });
    }
}