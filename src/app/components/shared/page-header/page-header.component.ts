import { Component, Input } from '@angular/core';
import { PageHeader } from '../../../models/page-header';

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
    @Input() header: PageHeader;
}