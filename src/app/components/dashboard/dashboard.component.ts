import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'
import { TdDialogService, TdLoadingService } from '@covalent/core'
import { DashboardService } from '../../services'
import { PageHeader, BaseComponent, Status } from '../../core'
import 'rxjs/add/operator/toPromise'

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent extends BaseComponent implements OnInit {

    header: PageHeader = new PageHeader('Dashboard', ['Dashboard']);

    chartLoading = true
    dataset = []
    pieOptions = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['Male', 'Female', 'Other']
        },
        series: [
            {
                name: 'Staff Gender Scale',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 8, name: 'Male', selected: true },
                    { value: 8, name: 'Female' },
                    { value: 8, name: 'Other' }
                ]
            },
            {
                name: 'Customer Gender Scale',
                type: 'pie',
                selectedMode: 'single',
                radius: ['40%', '55%'],
                data: [
                    { value: 4, name: 'Male' },
                    { value: 4, name: 'Female' },
                    { value: 4, name: 'Other' }
                ]
            }
        ]
    }

    constructor(private dashboard: DashboardService,
        protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.loadUserscale()
    }

    async loadUserscale(): Promise<void> {

        this.chartLoading = true

        try {

            let result = await this.dashboard.userscale().toPromise()

            if (result.status == Status.Success) {
                this.dataset = [[{ value: result.data.staffMale, name: 'Male', selected: true },
                { value: result.data.staffFemale, name: 'Female' },
                { value: result.data.staffTotal - result.data.staffMale - result.data.staffFemale, name: 'Other' }],
                [{ value: result.data.custMale, name: 'Male'},
                { value: result.data.custFemale, name: 'Female' },
                { value: result.data.custTotal - result.data.custMale - result.data.custFemale, name: 'Other' }]]
            }
        }
        catch (error) {
            this.handle(error)
        }
        finally {
            this.chartLoading = false
        }
    }
}