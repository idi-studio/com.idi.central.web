import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { TokenService } from '../../../services';

import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './login.component.html',
    viewProviders: [TokenService],
})
export class LoginComponent implements OnInit {

    username: String;
    password: String;

    constructor(private _tokenService: TokenService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _loadingService: TdLoadingService,
        private _dialogService: TdDialogService) { }

    ngOnInit(): void { }

    async signIn(): Promise<void> {
        this._router.navigate(["/central"]);
    }
}