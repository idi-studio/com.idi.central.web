import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { BaseComponent } from '../../../core';
import { TokenService } from '../../../services';

import 'rxjs/add/operator/toPromise';

const USERNAME_REGEX = /^[A-Za-z0-9]+$/;

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

    formControlUsername = new FormControl('', [Validators.required, Validators.pattern(USERNAME_REGEX)]);
    formControlPassword = new FormControl('', [Validators.required]);

    constructor(private token: TokenService, private route: ActivatedRoute, protected router: Router,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(router, loading, dialog)
    }

    ngOnInit(): void {
        this.formControlUsername.setValue("administrator");
        this.formControlPassword.setValue("p@55w0rd");
    }

    async signIn(): Promise<void> {

        let username: string = this.formControlUsername.value;
        let password: string = this.formControlPassword.value;

        this.loading.register('form-sign-in');

        this.token.apply(username, password).subscribe(result => {
            if (result.status == 1) {
                this.router.navigate(["/central"])
            }
            else {
                this.dialog.openAlert({ message: result.message });
            }
            this.loading.resolve('form-sign-in');
        }, error => {
            this.handleError(error);
            this.loading.resolve('form-sign-in')
        });
    }

    // private handleError(error: Response) {

    //     let errMsg: string;

    //     switch (error.status) {
    //         case 0:
    //             errMsg = "Cannot connect to server."
    //             break;
    //         case 400:
    //             errMsg = "Bad Request."
    //             break;
    //         case 401:
    //             errMsg = "Unauthorized."
    //             break;
    //         case 500:
    //             errMsg = "Internal server error."
    //             break;
    //         default:
    //             errMsg = `Error status - ${error.status}.`
    //             break;
    //     }

    //     this._dialog.openAlert({ message: errMsg })
    // }
}