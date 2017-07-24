import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { HttpInterceptorService, RESTService } from '@covalent/http';
// import { Observable } from 'rxjs/Observable';
import { API } from '../configs/api.config';

@Injectable()
// export class TokenService extends RESTService<any> {

// constructor(private _http: HttpInterceptorService) {
//     super(_http, {
//         baseUrl: API.baseAddress,
//         path: '/api/token',
//         baseHeaders: new Headers({ 'Content-Type': 'application/json' })
//     });
// }
export class TokenService {

    constructor(private _http: HttpInterceptorService) { }

    signIn(username: String, password: String): any {
        let data: any = { username: username, password: password };

        return this._http.post('/api/token', data, API.defaultHeader)
            .map((res: Response) => {
                return res.json();
            });
        // return this._http.post('/api/token', data, { headers: new Headers({ 'Content-Type': 'application/json' }) })
        //     .map((res: Response) => {
        //         return res.json();
        //     });
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