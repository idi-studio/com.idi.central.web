import { ValidatorFn, AbstractControl } from '@angular/forms';

export const Regex = {
    PROD_NAME: /^[A-Za-z0-9\u4e00-\u9fa5\s]{0,}$/,
    PROD_TAG: /^[A-Za-z0-9\u4e00-\u9fa5]{0,}$/,
    CUST_NAME: /^[A-Za-z\u4e00-\u9fa5]{0,}$/,
    PHONE_NUM: /0?(13|14|15|18)[0-9]{9}/,
    IDENTIFIER: /^[A-Za-z0-9]+$/,
    DATE: /^(?:(?!0000)[0-9]{4}\/(?:(?:[1-9]|1[0-2])\/(?:[1-9]|1[0-9]|2[0-8])|(?:[13-9]|1[0-2])\/(?:29|30)|(?:[13578]|1[02])-31)|(?:[0-9]{2}(?:[48]|[2468][048]|[13579][26])|(?:[48]|[2468][048]|[13579][26])00)-2-29)$/
}

export function ObjectValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (typeof control.value === 'object') {
            return null
        }
        return { 'object': { value: control.value } }
    };
}