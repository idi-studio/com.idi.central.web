import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { TokenService } from '../../../services';

import 'rxjs/add/operator/toPromise';

const USERNAME_REGEX = /^[A-Za-z0-9]+$/;

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    formControlUsername = new FormControl('', [Validators.required, Validators.pattern(USERNAME_REGEX)]);
    formControlPassword = new FormControl('', [Validators.required]);

    constructor(
        private _tokenService: TokenService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _loadingService: TdLoadingService,
        private _dialogService: TdDialogService
    ) { }

    ngOnInit(): void {
        this.formControlUsername.setValue("administrator");
        this.formControlPassword.setValue("p@55w0rd");
    }

    async signIn(): Promise<void> {

        let username: string = this.formControlUsername.value;
        let password: string = this.formControlPassword.value;

        try {
            this._loadingService.register('form-sign-in');

            let result = await this._tokenService.signIn(username, password).toPromise();

            if (result.status == 1) {
                this._router.navigate(["/central"]);
            }
            else {
                this._dialogService.openAlert({ message: result.message });
            }
        } catch (error) {
            this.handleError(error)
        } finally {
            this._loadingService.resolve('form-sign-in');
        }
    }

    private handleError(error: Response) {

        let errMsg: string;

        switch (error.status) {
            case 0:
                errMsg = "Cannot connect to server."
                break;
            case 400:
                errMsg = "Bad Request."
                break;
            case 401:
                errMsg = "Unauthorized."
                break;
            case 500:
                errMsg = "Internal server error."
                break;
            default:
                errMsg = `Error status - ${error.status}.`
                break;
        }

        this._dialogService.openAlert({ message: errMsg })
    }
}