import { Headers, RequestOptionsArgs, Response, Request, RequestMethod, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API } from '../core/api.config';

export class RESTService {

    constructor(private http: Http) { }

    protected post(url: string, params: any): Observable<any> {
        return this.http.post(API.instance.baseUrl + url, params, { headers: this.buildHeader(url) })
    }

    protected get(url: string): Observable<any> {
        return this.http.get(API.instance.baseUrl + url, { headers: this.buildHeader(url), method: RequestMethod.Get })
    }

    private buildHeader(url: string): Headers {

        let headers = new Headers();

        if (url == "/api/token") {
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Authorization', "Basic " + API.instance.clientKey);
        } else {
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Authorization', "Bearer " + API.instance.get("token"));
        }

        console.log(headers)

        return headers;
    }
}