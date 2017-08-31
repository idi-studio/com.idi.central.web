import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export interface ICustomer {
    id: string
    name: string
    grade: number
    phone: string
    gender: string
    date: string
}

@Injectable()
export class CustomerService extends RESTService {

    constructor(http: Http) { super(http) }

    all(): Observable<Array<ICustomer>> {

        return super.get('/api/cust/list').map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<ICustomer>()
        });
    }
}