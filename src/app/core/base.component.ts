import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { Runtime } from './runtime';

export abstract class BaseComponent {



    constructor(protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {

        if (!Runtime.instance.authorized()) {
            dialog.openConfirm({ message: "Please sign-in your account first.", acceptButton: "OK" }).afterClosed().subscribe(() => {
                router.navigate(["/login"])
            })
        }
    }
}