import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export const TypeNames = {
    PriceCategory: 'PriceCategory',
    ImageCategory: 'ImageCategory'
}

@Injectable()
export class CategoryService extends RESTService {

    constructor(http: Http) { super(http) }

    all(typeName: string): Observable<Array<any>> {

        return super.get(`/api/category/${typeName}`).map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<any>()
        });
    }
}