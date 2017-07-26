import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptorService, RESTService } from '@covalent/http';
import { API } from '../configs/api.config';
import { RoleItem } from '../models/role';

export interface IRoleRow {
    id: string;
    name: string;
    descrition: string;
    active: boolean;
}

@Injectable()
export class RolesService extends RESTService<IRoleRow> {

    constructor(private _http: HttpInterceptorService) {
        super(_http, { baseUrl: API.baseUrl, path: '/api/roles' });
    }

    getAll(): Observable<Array<IRoleRow>> {

        return this._http.get('/api/roles', { headers: new Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Authorization": "Bearer " + API.token }) })
            .map((res: Response) => {

                var result = res.json();

                if (result.status == 1)
                    return result.data.rows

                return new Array<IRoleRow>()
            });
    }
}