import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'sidebar-right',
    templateUrl: './sidebar-right.component.html'
})
export class SidebarRightComponent implements OnInit {
    ngOnInit(): void {
        $(function () {
            $(".nicescroll").niceScroll({ cursorcolor: '#98a6ad', cursorwidth: '6px', cursorborderradius: '5px' });
        });
    }
}