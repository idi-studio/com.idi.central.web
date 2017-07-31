import { Component, Input } from '@angular/core';
import { PageHeader } from '../../../core';

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
    @Input() header: PageHeader;
}