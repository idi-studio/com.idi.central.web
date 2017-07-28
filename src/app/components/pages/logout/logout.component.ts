import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../services';

@Component({ template: '' })
export class LogoutComponent implements OnInit {

    constructor(
        private _router: Router,
        private _tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this._tokenService.signOut();
        this._router.navigate(["/login"]);
    }
}