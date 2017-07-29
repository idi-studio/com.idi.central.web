import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { Runtime } from './runtime';

export abstract class BaseComponent {

    constructor(protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        console.log(`router.url:${router.url}`)
        if (!Runtime.instance.authorized() && router.url != "/login") {
            dialog.openConfirm({ message: "Please sign-in your account first.", acceptButton: "OK" }).afterClosed().subscribe(() => {
                router.navigate(["/login"])
            })
        }
    }

    protected handleError(error: Response) {

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

        this.dialog.openAlert({ title: "CENTRAL MESSAGE", message: errMsg })
    }
}