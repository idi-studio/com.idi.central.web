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

    menus(name: string): Observable<Array<any>> {

        return super.get(`/api/role/menu/${name}`).map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<any>()
        });
    }

    authorizeMenu(value: any): Observable<any> {
        return super.put('/api/role/authorize-menu', value).map((res: Response) => {
            return res.json();
        });
    }

    permission(name: string): Observable<Array<any>> {

        return super.get(`/api/role/permission/${name}`).map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<any>()
        });
    }

    authorize(value: any): Observable<any> {
        return super.put('/api/role/authorize', value).map((res: Response) => {
            return res.json();
        });
    }
}