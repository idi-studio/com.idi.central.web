import { Injectable } from '@angular/core';
import { RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { IHttpInterceptor } from '@covalent/http';
import { API } from '../api.config';

@Injectable()
export class RequestInterceptor implements IHttpInterceptor {

    onRequest(requestOptions: RequestOptionsArgs): RequestOptionsArgs {

        if (requestOptions.url == "/api/token") {
            requestOptions.headers["Authorization"] = "Basic " + API.instance.clientKey
        }
        else {
            requestOptions.headers["Authorization"] = "Bearer " + API.instance.get("token")
        }

        requestOptions.url = API.instance.baseUrl + requestOptions.url

        return requestOptions
    }
}
