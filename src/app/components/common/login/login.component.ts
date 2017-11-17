import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { BaseComponent, Status, Regex, OAuthType, Runtime } from '../../../core';
import { TokenService, OAuthService, UserService } from '../../../services';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

    title:string
    formControlUsername = new FormControl('', [Validators.required, Validators.pattern(Regex.IDENTIFIER)])
    formControlPassword = new FormControl('', [Validators.required]);

    constructor(private token: TokenService, private oauth: OAuthService, private user: UserService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.title = Runtime.instance.config().title
        this.formControlUsername.setValue('administrator')
        if (Runtime.instance.authorized()) {
            this.navigate('/central')
        }
    }

    async signIn(): Promise<void> {

        let username: string = this.formControlUsername.value;
        let password: string = this.formControlPassword.value;

        this.load()

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
        finally {
            this.unload()
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

    async github(): Promise<void> {
        window.location.href = this.oauth.authorize(OAuthType.GitHub)
    }

    async unavailale(): Promise<void> {
        this.alert('Unavailale.')
    }
}