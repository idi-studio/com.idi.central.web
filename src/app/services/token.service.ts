import { Injectable } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';
import { Runtime, RESTService } from '../core';

@Injectable()
export class TokenService extends RESTService {

    constructor(http: Http) { super(http) }

    apply(username: string, password: string): any {

        var params = new URLSearchParams();
        params.set("username", username);
        params.set("password", password);
        params.set("grant_type", "password");

        return this.post('/api/token', params.toString()).map((res: Response) => {
            var result = res.json();

            if (result.status == 1) {
                Runtime.instance.authorize(username, result.data.access_token)
            }

            return result;
        });
    }

    clear(): void {
        Runtime.instance.unauthorize()
    }
}