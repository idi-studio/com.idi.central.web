import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status, OAuthType, Runtime } from '../core';

@Injectable()
export class OAuthService extends RESTService {

    public github = { clientId: '1cb801da9da98bc98db4' }

    constructor(http: Http) { super(http) }

    authorize(type: OAuthType): string {

        if (type === OAuthType.GitHub) {
            return `https://github.com/login/oauth/authorize?client_id=${this.github.clientId}&state=${Math.random()}`
        }

        return null
    }

    token(): Observable<any> {
        var params = new URLSearchParams();
        params.set('grant_type', 'client_credentials');

        return super.post('/api/token', params.toString()).map((res: Response) => {
            var result = res.json();

            if (result.status == Status.Success) {
                Runtime.instance.authorize(Runtime.instance.config().clientId, result.data.access_token)
            }

            return result;
        });
    }

    login(param: any): Observable<any> {
        return super.post("/api/oauth/login", param).map((res: Response) => { return res.json(); });
    }
}