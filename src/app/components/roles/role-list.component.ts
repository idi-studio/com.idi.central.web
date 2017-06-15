import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../models/page-header';

declare var $: any;

@Component({
    templateUrl: './role-list.component.html'
})
export class RoleListComponent implements OnInit {

    header: PageHeader = new PageHeader("Roles", ["Administrators", "Roles"]);

    ngOnInit(): void {
        $(function () {
            $('#datatable').DataTable();

            var table = $('#datatable-buttons').DataTable({
                lengthChange: false,
                buttons: ['copy', 'excel', 'pdf', 'colvis']
            });

            table.buttons().container().appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
        });
    }

}