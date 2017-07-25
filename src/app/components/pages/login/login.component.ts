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

    username: string="administrator";
    password: string="p@55w0rd";

    constructor(private _tokenService: TokenService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _loadingService: TdLoadingService,
        private _dialogService: TdDialogService) { }

    ngOnInit(): void { }

    async signIn(): Promise<void> {
        try {
            this._loadingService.register('form-sign-in');
            
            let result = this._tokenService.signIn(this.username, this.password).toPromise();

            // console.log(result);

            // this._router.navigate(["/central"]);
        } catch (error) {
            this._dialogService.openAlert({ message: 'There was an error from api.' });
        } finally {
            this._loadingService.resolve('form-sign-in');
        }
    }
}