import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { Runtime } from './runtime';
import { Command } from './enums';

export abstract class BaseComponent {

    constructor(protected route: ActivatedRoute, protected router: Router, protected loading: TdLoadingService, protected dialog: TdDialogService) {
        console.log(`router.url:${router.url}`)

        if (this.checkIdentity()) {
            dialog.openConfirm({ message: "Please sign-in your account first.", acceptButton: "OK" }).afterClosed().subscribe(() => {
                router.navigate(["/login"])
            })
        }
    }

    private checkIdentity(): boolean {
        if (Runtime.instance.authorized())
            return false;

        if (this.router.url == "/login")
            return false;

        if (this.router.url == "/lock-screen")
            return false;

        return true
    }

    protected getMode(): Command {
        if (!this.route.snapshot.paramMap.has('mode'))
            return Command.None

        let mode = this.route.snapshot.paramMap.get('mode')

        switch (mode) {
            case 'add':
                return Command.Create;
            case 'edit':
                return Command.Update;
            case 'delete':
                return Command.Delete;
            default:
                return Command.None;
        }
    }

    protected getParam(name: string): string {
        return this.route.snapshot.paramMap.get(name)
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

        this.alert(errMsg);

        if (error.status == 401)
            this.router.navigate(["/central"])
    }

    protected alert(message: string) {
        this.dialog.openAlert({ title: "CENTRAL MESSAGE", message: message })
    }

    // protected show(result: any) {
    //     let message = result.message

    //     for (let item of result.details.info) {
    //         message += `${item}`
    //     }

    //     this.dialog.openAlert({ title: "CENTRAL MESSAGE", message: message })
    // }

    protected confirm(message: string, callback?: (accepted: boolean) => void): void {
        this.dialog.openConfirm({
            message: message,
            disableClose: true,
            title: 'CENTRAL MESSAGE',
            cancelButton: 'Disagree',
            acceptButton: 'Agree',
        }).afterClosed().subscribe(callback);
    }

    protected navigate(url: string) {
        this.router.navigate([url])
    }

    protected load() {
        this.loading.register();
    }

    protected unload() {
        this.loading.resolve();
    }
}