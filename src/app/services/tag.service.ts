import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../core';

export interface ITag {
    key: string;
    name: string;
    value: string;
}

@Injectable()
export class TagService extends RESTService {

    constructor(http: Http) { super(http) }

    all(): Observable<Array<ITag>> {

        return super.get('/api/tags').map((res: Response) => {

            var result = res.json();

            if (result.status == 1)
                return result.data

            return new Array<ITag>()
        });
    }
}