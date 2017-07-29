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

        this.load()

        this.token.apply(username, password).subscribe(result => {
            if (result.status == 1) {
                this.navigate("/central")
            }
            else {
                this.show(result.message);
            }
            this.unload()
        }, error => {
            this.handleError(error);
            this.unload()
        });
    }
}