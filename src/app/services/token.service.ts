import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { HttpInterceptorService, RESTService } from '@covalent/http';
// import { Observable } from 'rxjs/Observable';
import { API } from '../configs/api.config';

@Injectable()
export class TokenService {

    constructor(private _http: HttpInterceptorService) { }

    signIn(username: string, password: string): any {

        var body = new URLSearchParams();
        body.set("username", username);
        body.set("password", password);
        body.set("grant_type", "password");

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post('/api/token', body.toString(), { headers: headers })
            .map((res: Response) => {
                var result = res.json();

                if (result.status == 1) {
                    API.token = result.data.access_token
                }

                return result;
            });
    }
}

// export function TokenProviderFactory(
//     parent: TokenService, interceptorHttp: HttpInterceptorService): TokenService {
//     return parent || new TokenService(interceptorHttp);
// }

// export const TokenProvider: Provider = {
//     // If there is already a service available, use that. Otherwise, provide a new one.
//     provide: TokenService,
//     deps: [[new Optional(), new SkipSelf(), TokenService], HttpInterceptorService],
//     useFactory: TokenProviderFactory,
// };