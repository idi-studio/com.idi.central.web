import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export const TypeNames = {
    PriceCategory: 'PriceCategory',
    ImageCategory: 'ImageCategory',
    PayMethod: 'PayMethod',
    TradeStatus: 'TradeStatus',
}

export interface IOption {
    id: string
    name: string
}

@Injectable()
export class CategoryService extends RESTService {

    constructor(http: Http) { super(http) }

    enums(name: string): Observable<Array<any>> {

        return super.post(`/api/catg/enum`, { name: name }).map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<any>()
        });
    }

    options(name: string): Observable<Array<IOption>> {

        return super.post(`/api/catg/option`, { name: name }).map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<IOption>()
        });
    }
}