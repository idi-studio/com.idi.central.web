import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export interface IPromotion {
    id: string
    subject: string
    start: string
    end: string
    price: IPromotionPrice
    pid: string
    pname: string
    enabled: boolean
}

export interface IPromotionPrice {
    original: number,
    current: number,
    vip: Array<number>
}

@Injectable()
export class PromotionService extends RESTService {

    constructor(http: Http) { super(http) }

    single(id: string): Observable<IPromotion> {
        return super.get(`/api/prom/${id}`).map((res: Response) => {
            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return null;
        });
    }

    all(): Observable<Array<IPromotion>> {

        return super.get('/api/prom/list').map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<IPromotion>()
        });
    }

    add(value: any): Observable<any> {
        return super.post('/api/prom', value).map((res: Response) => {
            return res.json();
        });
    }

    update(value: any): Observable<any> {
        return super.put(`/api/prom/${value.id}`, value).map((res: Response) => {
            return res.json();
        });
    }

    remove(id: string): Observable<any> {
        return super.delete(`/api/prom/${id}`).map((res: Response) => {
            return res.json();
        });
    }
}