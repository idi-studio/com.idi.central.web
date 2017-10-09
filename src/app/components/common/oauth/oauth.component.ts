import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { BaseComponent, Status, Regex, OAuthType } from '../../../core';
import { TokenService, OAuthService, UserService } from '../../../services';
import 'rxjs/add/operator/toPromise';

@Component({
    template: ''
})
export class OAuthComponent extends BaseComponent implements OnInit {

    constructor(private token: TokenService, private oauth: OAuthService, private user: UserService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MdSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        let type = this.queryParams('type')

        if (type === 'github') {
            this.github()
        }
    }

    async github(): Promise<void> {
        console.log('auth github')

        let params = {
            code: this.queryParams('code'),
            state: this.queryParams('state'),
            redirect_uri: 'http://localhost:4200/oauth/login',
            type: OAuthType.GitHub
        }

        try {
            let result = await this.oauth.token().toPromise()

            if (result.status != Status.Success)
                return

            result = await this.oauth.login(params).toPromise()

            if (result.status == Status.Success) {
                this.login(result.details.username, result.details.pin)
            }
            else {
                this.alert(result.message);
                this.navigate('/login')
            }
        }
        catch (error) {
            this.handle(error)
        }
    }

    async login(username: string, password: string): Promise<void> {
        try {
            let result = await this.token.apply(username, password).toPromise();

            if (result.status == Status.Success) {
                await this.profile()
            }
            else {
                this.alert(result.message);
            }
        }
        catch (error) {
            this.handle(error);
        }
    }

    async profile(): Promise<void> {
        let result = await this.user.profile().toPromise()
        if (result.status == Status.Success) {
            this.navigate('/central')
        }
        else {
            console.log(result.message)
            this.alert('Login failed, Please try again later.')
        }
    }
}