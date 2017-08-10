import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Runtime, RESTService, Status } from '../core';

export interface IUserProfile {
    id: string;
    username: string;
    name: string;
    gender: number;
    birthday: Date;
    photo: string;
}

export interface IUser {
    id: string;
    username: string;
    active: boolean;
    name: string;
    gender: number;
    birthday: Date;
    photo: string;
}

@Injectable()
export class UserService extends RESTService {

    constructor(http: Http) { super(http) }

    profile(): Observable<IUserProfile> {
        let username = Runtime.instance.get("username");

        return super.get('/api/user/profile/' + username, ).map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success) {
                Runtime.instance.set("profile", JSON.stringify(result.data))
                return result.data
            }

            return null;
        });
    }

    all(): Observable<Array<IUser>> {

        return super.get('/api/users').map((res: Response) => {

            var result = res.json();

            if (result.status == Status.Success)
                return result.data

            return new Array<IUser>()
        });
    }
}