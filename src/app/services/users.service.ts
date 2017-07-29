import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Runtime, RESTService } from '../core';

export interface IUserRow {
    id: string;
    username: string;
    active: boolean;
    name: string;
    gender: number;
    birthday: Date;
    photo: string;
}

@Injectable()
export class UsersService extends RESTService {

    constructor(http: Http) { super(http) }

    getAll(): Observable<Array<IUserRow>> {

        return super.get('/api/users').map((res: Response) => {

            var result = res.json();

            if (result.status == 1)
                return result.data.rows

            return new Array<IUserRow>()
        });
    }
}