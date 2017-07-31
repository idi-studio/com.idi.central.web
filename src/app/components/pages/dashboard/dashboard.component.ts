import { Component } from '@angular/core';
import { PageHeader } from '../../../core';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    header: PageHeader = new PageHeader("Dashboard", ["Dashboard"]);
}