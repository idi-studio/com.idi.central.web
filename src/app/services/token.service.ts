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

        return super.post('/api/token', params.toString()).map((res: Response) => {
            var result = res.json();

            if (result.status == 1) {
                API.instance.set("token", result.data.access_token);
                API.instance.set("username", username);
            }

            return result;
        });
    }

    signOut(): void {
        
        API.instance.remove("token");
        API.instance.remove("username");
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