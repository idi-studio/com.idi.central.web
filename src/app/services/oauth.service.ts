import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status, OAuthType } from '../core';

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

    login(param:any): Observable<any> {
        return this.post("/api/oauth/login",param);
    }
}