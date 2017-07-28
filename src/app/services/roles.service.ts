import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RESTService } from '../core';

export interface IRoleRow {
    id: string;
    name: string;
    descrition: string;
    active: boolean;
}

@Injectable()
export class RolesService extends RESTService {

    constructor(http: Http) { super(http) }

    getAll(): Observable<Array<IRoleRow>> {

        return super.get('/api/roles').map((res: Response) => {

            var result = res.json();

            if (result.status == 1)
                return result.data.rows

            return new Array<IRoleRow>()
        });
    }
}