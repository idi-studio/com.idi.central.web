import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RESTService, Status } from '../core';

export interface IRole {
    id: string;
    name: string;
    descrition: string;
    active: boolean;
}

@Injectable()
export class RoleService extends RESTService {

    constructor(http: Http) { super(http) }

    all(): Observable<Array<IRole>> {

        return super.get('/api/role/list').map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<IRole>()
        });
    }
}