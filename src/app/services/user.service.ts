import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';

@Injectable()
export class UserService {
    
    constructor(private _http: HttpInterceptorService) { }

}