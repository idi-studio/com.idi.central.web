import { Headers, RequestOptionsArgs, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';
import { Observable } from 'rxjs/Observable';
import { API } from '../core/api.config';

export class RESTService {
    protected _http: HttpInterceptorService;

    constructor(http: HttpInterceptorService) {
        this._http = http;
    }

    protected post(url: string, params: any): Observable<any> {

        //  var options = new RequestOptions({ headers: this.buildHeader(url), method: RequestMethod.Post, body: body, search: search })

        // return this._http.request(API.instance.baseUrl + url, options)

        return this._http.post(url, params, { headers: this.buildHeader(url) })
    }

    protected get(url: string): Observable<any> {
        return this._http.get(API.instance.baseUrl + url, { headers: this.buildHeader(url), method: RequestMethod.Get })
    }

    private buildHeader(url: string): Headers {

        let headers = new Headers();

        if (url == "/api/token") {
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Access-Control-Allow-Origin', '*');
            // headers.append('Authorization', "Basic " + API.instance.clientKey);
            // headers.append('X-Request-With', null);
        } else {
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
            // headers.append('Authorization', "Bearer " + API.instance.get("token"));
        }

        console.log(headers.toJSON())

        return headers;
    }
}