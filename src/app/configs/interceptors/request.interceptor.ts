import { Injectable } from '@angular/core';
import { RequestOptionsArgs, RequestOptions } from '@angular/http';
import { IHttpInterceptor } from '@covalent/http';
import { API } from '../api.config';

@Injectable()
export class RequestInterceptor implements IHttpInterceptor {

    onRequest(requestOptions: RequestOptionsArgs): RequestOptionsArgs {

        if (requestOptions.url == "/api/token") {
            requestOptions.headers["Authorization"] = "Basic " + API.clientKey
        }

        requestOptions.headers["Accept"] = "application/json"
        requestOptions.headers["Content-Type"] = "application/json"
        requestOptions.headers["Access-Control-Allow-Origin"] = "*"
        requestOptions.url = API.baseAddress + requestOptions.url

        console.log(requestOptions.headers)

        return requestOptions
    }
}
