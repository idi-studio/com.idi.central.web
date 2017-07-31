import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../services';

@Component({ template: '' })
export class LogoutComponent implements OnInit {

    constructor(private router: Router, private token: TokenService) { }

    ngOnInit(): void {
        this.token.clear();
        this.router.navigate(["/login"]);
    }
}