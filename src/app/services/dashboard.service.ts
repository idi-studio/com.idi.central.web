import { Injectable } from '@angular/core'
import { Response, Http, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { RESTService, Status } from '../core'
// import { IAddress } from '../services';

@Injectable()
export class DashboardService extends RESTService {

    constructor(http: Http) { super(http) }

    userscale(): Observable<any> {

        return super.get('/api/dashboard/user-scale').map((res: Response) => {
           return res.json()
        });
    }
}