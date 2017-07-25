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

    constructor(private http: HttpInterceptorService) { }

    signIn(username: string, password: string): any {
        var body = new URLSearchParams();
        body.set("username", username);
        body.set("password", password);
        body.set("grant_type", "password");


        //var data = "username=" + username + "&password=" + password + "&grant_type=password";
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // headers.append("Authorization", "Basic " + API.clientKey);

        return this.http.post('/api/token', body.toString(), { headers: headers })
            .map((res: Response) => {
                return res.json();
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