import { Headers, Response, RequestMethod, Http } from '@angular/http';
import { TdFileService, IUploadOptions } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { Runtime } from './runtime';
import 'rxjs/add/operator/toPromise';

export class RESTService {

    constructor(private http: Http, private file?: TdFileService) { }

    protected post(url: string, params: any): Observable<any> {
        return this.http.post(Runtime.instance.baseUrl + url, params, { headers: this.buildHeader(url) })
    }

    protected put(url: string, params: any): Observable<any> {
        return this.http.put(Runtime.instance.baseUrl + url, params, { headers: this.buildHeader(url) })
    }

    protected delete(url: string): Observable<any> {
        return this.http.delete(Runtime.instance.baseUrl + url, { headers: this.buildHeader(url) })
    }

    protected get(url: string): Observable<any> {
        return this.http.get(Runtime.instance.baseUrl + url, { headers: this.buildHeader(url), method: RequestMethod.Get })
    }

    protected upload(url: string, files: File[], formData?: FormData): Observable<any> {
        let headers = {
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + Runtime.instance.get("token")
        }

        formData = formData || new FormData()

        for (var index = 0; index < files.length; index++) {
            var file = files[index]
            formData.append(file.name, file)
        }

        // if (files instanceof FileList) {
        //     for (var index = 0; index < files.length; index++) {
        //         var file = files[index];
        //         formData.append(file.name, files[index])
        //         // console.log(`filename:${file.name} ${file.size} ${file.type}`)
        //     }
        // }
        // else {
        //     formData.append(files.name, files)
        //     // console.log(`filename:${files.name} ${files.size} ${files.type}`)
        // }

        let options: IUploadOptions = { url: Runtime.instance.baseUrl + url, method: 'post', headers: headers, formData: formData };

        console.log(options);

        return this.file.upload(options);
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