import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../models/page-header';
import { RoleItem } from '../../models/role';

declare var $: any;

@Component({
    templateUrl: './role-list.component.html'
})
export class RoleListComponent implements OnInit {

    header: PageHeader = new PageHeader("Roles", ["Administrators", "Roles"]);

    roles: Array<RoleItem> = [
        new RoleItem(1, "Administrators", true),
        new RoleItem(2, "Manager", true),
        new RoleItem(3, "Finance", true),
        new RoleItem(4, "Staff", true),
        new RoleItem(5, "Custom05", true),
        new RoleItem(6, "Custom06", true),
        new RoleItem(7, "Custom07", true),
        new RoleItem(8, "Custom08", true),
        new RoleItem(9, "Custom09", true),
        new RoleItem(10, "Custom10", true),
        new RoleItem(11, "Custom11", true),
        new RoleItem(12, "Custom12", true),
        new RoleItem(13, "Custom13", true),
        new RoleItem(14, "Custom14", true),
        new RoleItem(15, "Custom15", true),
        new RoleItem(16, "Custom16", true),
        new RoleItem(17, "Custom17", true),
        new RoleItem(18, "Custom18", true),
        new RoleItem(19, "Custom19", true),
        new RoleItem(20, "Custom20", true),
        new RoleItem(21, "Custom21", true),
        new RoleItem(22, "Custom22", true),
        new RoleItem(23, "Custom23", true),
        new RoleItem(24, "Custom24", true),
        new RoleItem(25, "Custom25", true),
        new RoleItem(26, "Custom26", true),
        new RoleItem(27, "Custom27", true),
        new RoleItem(28, "Custom28", true),
        new RoleItem(29, "Custom29", true),
        new RoleItem(30, "Custom30", true)
    ];

    ngOnInit(): void {
        // this.roles = [
        //     new RoleItem(1, "Administrators", true),
        //     new RoleItem(2, "Manager", true),
        //     new RoleItem(3, "Finance", true),
        //     new RoleItem(4, "Staff", true),
        //     new RoleItem(5, "Custom05", true),
        //     new RoleItem(6, "Custom06", true),
        //     new RoleItem(7, "Custom07", true),
        //     new RoleItem(8, "Custom08", true),
        //     new RoleItem(9, "Custom09", true),
        //     new RoleItem(10, "Custom10", true),
        //     new RoleItem(11, "Custom11", true),
        //     new RoleItem(12, "Custom12", true),
        //     new RoleItem(13, "Custom13", true),
        //     new RoleItem(14, "Custom14", true),
        //     new RoleItem(15, "Custom15", true),
        //     new RoleItem(16, "Custom16", true),
        //     new RoleItem(17, "Custom17", true),
        //     new RoleItem(18, "Custom18", true),
        //     new RoleItem(19, "Custom19", true),
        //     new RoleItem(20, "Custom20", true),
        //     new RoleItem(21, "Custom21", true),
        //     new RoleItem(22, "Custom22", true),
        //     new RoleItem(23, "Custom23", true),
        //     new RoleItem(24, "Custom24", true),
        //     new RoleItem(25, "Custom25", true),
        //     new RoleItem(26, "Custom26", true),
        //     new RoleItem(27, "Custom27", true),
        //     new RoleItem(28, "Custom28", true),
        //     new RoleItem(29, "Custom29", true),
        //     new RoleItem(30, "Custom30", true)
        // ];

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