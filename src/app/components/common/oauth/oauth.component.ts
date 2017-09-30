import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { BaseComponent, Status, Regex, OAuthType } from '../../../core';
import { TokenService, OAuthService } from '../../../services';
import 'rxjs/add/operator/toPromise';

@Component({
    template: ''
})
export class OAuthComponent extends BaseComponent implements OnInit {

    constructor(private token: TokenService, private oauth: OAuthService,
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

            console.log(result)

            if (result.status != Status.Success)
                return

            result = await this.oauth.login(params).toPromise()

            console.log(result)

            if (result.status == Status.Success) {
                this.navigate('/central')
            }
            else {
                this.alert(result.message);
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.unload()
        }
    }

    async login(): Promise<void> {

    }
}