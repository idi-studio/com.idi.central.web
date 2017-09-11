import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';
import { IOrderItem } from '../services';

export interface IOrder {
    id: string
    custid: string
    sn: string
    date: string
    status: number
    statusdesc: string
    remark: string
    items: Array<IOrderItem>
}

@Injectable()
export class OrderService extends RESTService {

    constructor(http: Http) { super(http) }

    add(value: any): Observable<any> {
        return super.post('/api/order', value).map((res: Response) => {
            return res.json();
        });
    }

    update(value: IOrder): Observable<any> {
        return super.put(`/api/order/${value.id}`, value).map((res: Response) => {
            return res.json();
        });
    }

    remove(id: string): Observable<any> {
        return super.delete(`/api/order/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    single(id: string): Observable<IOrder> {
        return super.get(`/api/order/${id}`).map((res: Response) => {
            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return null;
        });
    }

    all(): Observable<Array<IOrder>> {

        return super.get('/api/order/list').map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<IOrder>()
        });
    }
}