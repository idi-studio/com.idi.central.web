import { Headers, Response, RequestMethod, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Runtime } from '../core';

export class RESTService {

    constructor(private http: Http) { }

    protected post(url: string, params: any): Observable<any> {
        return this.http.post(Runtime.instance.baseUrl + url, params, { headers: this.buildHeader(url) })
    }

    protected put(url: string, params: any): Observable<any> {
        return this.http.put(Runtime.instance.baseUrl + url, params, { headers: this.buildHeader(url) })
    }

    protected get(url: string): Observable<any> {
        return this.http.get(Runtime.instance.baseUrl + url, { headers: this.buildHeader(url), method: RequestMethod.Get })
    }

    private buildHeader(url: string): Headers {

        let headers = new Headers();

        if (url == "/api/token") {
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Authorization', "Basic " + Runtime.instance.clientKey);
        } else {
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Authorization', "Bearer " + Runtime.instance.get("token"));
        }

        return headers;
    }
}