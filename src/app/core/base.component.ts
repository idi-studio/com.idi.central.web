import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { Runtime } from './runtime';
import { Command } from './contants';

export abstract class BaseComponent {

    constructor(protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        if (this.checkIdentity()) {
            dialog.openConfirm({ message: 'Please sign-in your account first.', acceptButton: 'OK' }).afterClosed().subscribe(() => {
                this.navigate('/login')
            })
        }
    }

    private checkIdentity(): boolean {
        if (Runtime.instance.authorized())
            return false;

        if (this.router.url.startsWith('/login'))
            return false;

        if (this.router.url.startsWith('/oauth/login'))
            return false;

        if (this.router.url.startsWith('/lock-screen'))
            return false;

        return true
    }

    protected command(): Command {
        if (!this.route.snapshot.paramMap.has('cmd'))
            return Command.View

        let cmd = this.route.snapshot.paramMap.get('cmd')

        switch (cmd) {
            case 'add':
                return Command.Create;
            case 'edit':
                return Command.Update;
            case 'delete':
                return Command.Delete;
            default:
                return Command.View;
        }
    }

    protected routeParams(name: string): string {
        return this.route.snapshot.paramMap.get(name)
    }

    protected queryParams(name: string): string {
        return this.route.snapshot.queryParamMap.get(name)
    }

    protected handle(error: Response) {

        let errMsg: string;

        switch (error.status) {
            case 0:
                errMsg = 'Cannot connect to server.'
                break;
            case 400:
                errMsg = 'Bad Request.'
                break;
            case 401:
                errMsg = 'Unauthorized.'
                break;
            case 500:
                errMsg = 'Internal server error.'
                break;
            default:
                errMsg = `Error status - ${error.status}.`
                break;
        }

        this.alert(errMsg);

        if (error.status == 401)
            this.router.navigate(['/central'])
    }

    protected alert(message: string) {
        this.dialog.openAlert({ title: 'CENTRAL MESSAGE', message: message })
    }

    protected show(message: string, duration: number = 5000) {
        this.snack.open(message, '', { duration: duration, });
    }

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