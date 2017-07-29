import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Runtime, RESTService } from '../core';

export interface IUserProfile {
    id: string;
    username: string;
    name: string;
    gender: number;
    birthday: Date;
    photo: string;
}

@Injectable()
export class UserProfileService extends RESTService {

    constructor(http: Http) { super(http) }

    get(): Observable<IUserProfile> {
        let username = Runtime.instance.get("username");

        return super.get('/api/user/profile/' + username, ).map((res: Response) => {

            var result = res.json();

            if (result.status == 1)
                return result.data

            return null;
        });
    }
}