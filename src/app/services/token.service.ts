import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService, RESTService } from '@covalent/http';
import { API } from '../configs/api.config';

@Injectable()
export class TokenService extends RESTService<any> {
    constructor(private _http: HttpInterceptorService) {
        super(_http, { baseUrl: API.baseAddress, path: '/api/token' });
    }

    signIn(username: String, password: String): any {
        let data: any = { username: username, password: password };

        return this._http.post('api/token', data)
            .map((res: Response) => {
                return res.json();
            });
    }
}