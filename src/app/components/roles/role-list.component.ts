import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    templateUrl: './role-list.component.html'
})
export class RoleListComponent implements OnInit {
    title = "Roles"
    ngOnInit(): void {
        $(function () {
            $('#datatable').DataTable();

            //Buttons examples
            var table = $('#datatable-buttons').DataTable({
                lengthChange: false,
                buttons: ['copy', 'excel', 'pdf', 'colvis']
            });

            table.buttons().container().appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
        });
    }

}