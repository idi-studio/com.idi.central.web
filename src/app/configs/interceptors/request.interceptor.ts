import { Injectable } from '@angular/core';
import { RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { IHttpInterceptor } from '@covalent/http';
import { API } from '../api.config';

@Injectable()
export class RequestInterceptor implements IHttpInterceptor {

    onRequest(requestOptions: RequestOptionsArgs): RequestOptionsArgs {

        if (requestOptions.url == "/api/token") {
            requestOptions.headers["Authorization"] = "Basic " + API.clientKey
        }
        else {
            requestOptions.headers["Authorization"] = "Bearer " + API.token
        }

        requestOptions.url = API.baseUrl + requestOptions.url

        return requestOptions
    }
}
