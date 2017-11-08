import { Headers, Response, RequestMethod, Http } from '@angular/http';
import { TdFileService, IUploadOptions } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { Runtime } from './runtime';
import 'rxjs/add/operator/toPromise';

export class RESTService {

    private baseUrl: string

    constructor(private http: Http, private file?: TdFileService) {
        this.baseUrl = Runtime.instance.config().baseUrl
    }

    protected post(url: string, params: any = {}): Observable<any> {
        return this.http.post(this.baseUrl + url, params, { headers: this.buildHeader(url) })
    }

    protected put(url: string, params: any = {}): Observable<any> {
        return this.http.put(this.baseUrl + url, params, { headers: this.buildHeader(url) })
    }

    protected delete(url: string): Observable<any> {
        return this.http.delete(this.baseUrl + url, { headers: this.buildHeader(url) })
    }

    protected get(url: string): Observable<any> {
        return this.http.get(this.baseUrl + url, { headers: this.buildHeader(url), method: RequestMethod.Get })
    }

    protected upload(url: string, files: File[], formData?: FormData): Observable<any> {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + Runtime.instance.get('token')
        }

        formData = formData || new FormData()

        for (var index = 0; index < files.length; index++) {
            var file = files[index]
            formData.append(file.name, file)
        }

        let options: IUploadOptions = { url: this.baseUrl + url, method: 'post', headers: headers, formData: formData };

        return this.file.upload(options);
    }

    private buildHeader(url: string): Headers {

        let headers = new Headers();

        if (url == '/api/token') {
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Authorization', 'Basic ' + Runtime.instance.config().clientKey);
        } else {
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Authorization', 'Bearer ' + Runtime.instance.get('token'));
        }

        return headers;
    }
}