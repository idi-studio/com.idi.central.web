import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { DynamicFormControlModel, DynamicInputModel, DynamicFormService, DynamicFormValidationService, AUTOCOMPLETE_OFF } from "@ng2-dynamic-forms/core";
import { TokenService } from '../../../services';

import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './login.component.html',
    viewProviders: [TokenService, DynamicFormService, DynamicFormValidationService],
})
export class LoginComponent implements OnInit {

    formGroup: FormGroup;
    formModel: DynamicFormControlModel[] = [
        new DynamicInputModel({
            id: "username",
            maxLength: 20,
            required: true,
            placeholder: "Username",
            autoComplete: AUTOCOMPLETE_OFF
        }),
        new DynamicInputModel({
            id: "password",
            inputType: "password",
            maxLength: 20,
            required: true,
            placeholder: "Password",
            autoComplete: AUTOCOMPLETE_OFF
        })
    ];

    constructor(private _tokenService: TokenService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _formService: DynamicFormService,
        private _loadingService: TdLoadingService,
        private _dialogService: TdDialogService) { }

    ngOnInit(): void {
        this.formGroup = this._formService.createFormGroup(this.formModel);
    }

    async signIn(): Promise<void> {
        if (!this.formGroup.valid)
            return;

        let username: string = (this._formService.findById("username", this.formModel) as DynamicInputModel)._value.toString();
        let password: string = (this._formService.findById("password", this.formModel) as DynamicInputModel)._value.toString();

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
            this._dialogService.openAlert({ message: 'There was an error from api.' });
        } finally {
            this._loadingService.resolve('form-sign-in');
        }
    }
}