import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptorService, RESTService } from '@covalent/http';
import { API } from '../configs/api.config';

export interface IUserProfile {
    id: string;
    username: string;
    name: string;
    gender: number;
    birthday: Date;
    photo: string;
}

@Injectable()
export class UserProfileService extends RESTService<IUserProfile> {

    constructor(private _http: HttpInterceptorService) {
        super(_http, { baseUrl: API.instance.baseUrl, path: '/api/user/profile' });
    }

    get(): Observable<IUserProfile> {
        let username = API.instance.get("username");

        return this._http.get('/api/user/profile/' + username, {
            headers: new Headers({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + API.instance.get("token")
            })
        }).map((res: Response) => {

            var result = res.json();

            if (result.status == 1)
                return result.data

            return null;
        });
    }
}