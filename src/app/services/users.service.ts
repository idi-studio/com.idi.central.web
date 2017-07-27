import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptorService, RESTService } from '@covalent/http';
import { API } from '../configs/api.config';

export interface IUserRow {
    id: string;
    username: string;
    active: boolean;
}

@Injectable()
export class UsersService extends RESTService<IUserRow> {

    constructor(private _http: HttpInterceptorService) {
        super(_http, { baseUrl: API.instance.baseUrl, path: '/api/users' });
    }

    getAll(): Observable<Array<IUserRow>> {

        return this._http.get('/api/users', {
            headers: new Headers({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + API.instance.get("token")
            })
        })
            .map((res: Response) => {

                var result = res.json();

                if (result.status == 1)
                    return result.data.rows

                return new Array<IUserRow>()
            });
    }
}