import { Injectable } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';
import { API, RESTService } from '../core';

@Injectable()
export class TokenService extends RESTService {

    constructor(http: Http) { super(http) }

    signIn(username: string, password: string): any {

        var params = new URLSearchParams();
        params.set("username", username);
        params.set("password", password);
        params.set("grant_type", "password");

        // let headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return super.post('/api/token', params.toString()).map((res: Response) => {
            var result = res.json();

            if (result.status == 1) {
                API.instance.set("token", result.data.access_token);
                API.instance.set("username", username);
            }

            return result;
        });
    }
    // signIn(username: string, password: string): any {

    //     var body = new URLSearchParams();
    //     body.set("username", username);
    //     body.set("password", password);
    //     body.set("grant_type", "password");

    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //     return this._http.post('/api/token', body.toString(), { headers: headers })
    //         .map((res: Response) => {
    //             var result = res.json();

    //             if (result.status == 1) {
    //                 API.instance.set("token", result.data.access_token);
    //                 API.instance.set("username", username);
    //             }

    //             return result;
    //         });
    // }
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