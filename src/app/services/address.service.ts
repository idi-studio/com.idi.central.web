import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export interface IAddress {
    id: string
    cid: string
    receiver: string
    contactno: string
    province: string
    city: string
    area: string
    street: string
    detail: string
    postcode: string
    default: boolean
}

@Injectable()
export class AddressService extends RESTService {

    constructor(http: Http) { super(http) }

    add(value: any): Observable<any> {
        return super.post('/api/addr', value).map((res: Response) => {
            return res.json();
        });
    }

    update(value: IAddress): Observable<any> {
        return super.put(`/api/addr/${value.id}`, value).map((res: Response) => {
            return res.json();
        });
    }

    remove(id: string): Observable<any> {
        return super.delete(`/api/addr/${id}`).map((res: Response) => {
            return res.json();
        });
    }
}