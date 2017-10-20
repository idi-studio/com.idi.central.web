import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { TdFileService, IUploadOptions } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export interface IVoucher {
    id: string
    tn: string
    sn: string
    date: string
    status: number
    paymethod: number
    payment: number
    payable: number
    remark: string
    oid: string
    doc: string
}

@Injectable()
export class VoucherService extends RESTService {

    constructor(http: Http, file: TdFileService) { super(http, file) }

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

    attach(id: string, files: File[]): Observable<any> {
        let formData = new FormData()
        formData.append('vchrid', id)
        return this.upload('/api/vchr/attach', files, formData)
    }

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

    paid(id: string): Observable<any> {
        return super.put(`/api/vchr/paid/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    remove(id: string): Observable<any> {
        return super.delete(`/api/vchr/${id}`).map((res: Response) => {
            return res.json();
        });
    }
}