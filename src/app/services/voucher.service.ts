import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export interface IVoucher {
    id: string
    tn: string
    sn: string
    date: string
    paymethod: number
    payamount: number
    orderamount: number
    remark: string
    oid: string
}

@Injectable()
export class VoucherService extends RESTService {

    constructor(http: Http) { super(http) }

    single(id: string): Observable<IVoucher> {
        return super.get(`/api/vchr/${id}`).map((res: Response) => {
            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return null;
        });
    }

    // all(): Observable<Array<IVoucher>> {

    //     return super.get('/api/vchr/list').map((res: Response) => {

    //         var result = res.json();

    //         if (result.status == Status.Success)
    //             return result.data

    //         return new Array<IVoucher>()
    //     });
    // }

    add(value: any): Observable<any> {
        return super.post('/api/vchr', value).map((res: Response) => {
            return res.json();
        });
    }

    update(value: IVoucher): Observable<any> {
        return super.put(`/api/vchr/${value.id}`, value).map((res: Response) => {
            return res.json();
        });
    }

    remove(id: string): Observable<any> {
        return super.delete(`/api/vchr/${id}`).map((res: Response) => {
            return res.json();
        });
    }
}