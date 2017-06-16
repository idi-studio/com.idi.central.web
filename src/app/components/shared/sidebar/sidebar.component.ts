import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../models/menu-item';

declare var $: any;

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    navigation: MenuItem[] = [
        new MenuItem("Dashboard", "dashboard", "zmdi zmdi-view-dashboard", true),
        new MenuItem("Administrators", null, "zmdi zmdi-accounts-list-alt", false, [
            new MenuItem("Roles", "role/list"),
            new MenuItem("Users", "user/list")
        ]),
        new MenuItem("Purchase", null, "zmdi zmdi-truck", null, [
            new MenuItem("Come soon...")
        ]),
        new MenuItem("Sales", null, "zmdi zmdi-labels", null, [
            new MenuItem("Come soon...")
        ]),
        new MenuItem("Inventory ", null, "zmdi zmdi-store", null, [
            new MenuItem("Come soon...")
        ])
    ];

    help: MenuItem[] = [
        new MenuItem("User Guide", null, "fa fa-book", null, [
            new MenuItem("Come soon...")
        ])
    ];

    ngOnInit(): void {
        $(function () {
            // NAVIGATION HIGHLIGHT & OPEN PARENT
            $("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");

            // var ua = navigator.userAgent, event = (ua.match(/iP/i)) ? "touchstart" : "click";

            // $("#sidebar-menu a").on(event, function (e) {
            //     if (!$("#wrapper").hasClass("enlarged")) {
            //         if ($(this).parent().hasClass("has_sub")) {

            //         }
            //         if (!$(this).hasClass("subdrop")) {
            //             // hide any open menus and remove all other classes
            //             $("ul", $(this).parents("ul:first")).slideUp(350);
            //             $("a", $(this).parents("ul:first")).removeClass("subdrop");
            //             $("#sidebar-menu .pull-right i").removeClass("md-remove").addClass("md-add");

            //             // open our new menu and add the open class
            //             $(this).next("ul").slideDown(350);
            //             //$(this).addClass("subdrop");
            //             $(".pull-right i", $(this).parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
            //             $(".pull-right i", $(this).siblings("ul")).removeClass("md-remove").addClass("md-add");
            //         } else if ($(this).hasClass("subdrop")) {
            //             $(this).removeClass("subdrop");
            //             $(this).next("ul").slideUp(350);
            //             $(".pull-right i", $(this).parent()).removeClass("md-remove").addClass("md-add");
            //         }

            //         onSelected(this);
            //     }
            // });

            $("#sidebar-menu a").each(function () {
                if ($(this).attr("ng-reflect-router-link") && this.href == window.location.href) {
                    $(this).addClass("active");
                    $(this).parent().addClass("active"); // add active to li of the current link
                    $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
                    $(this).parent().parent().prev().click(); // click the item to make it drop
                }
            });

            // function onSelected(e) {
            //     $("#sidebar-menu a").each(function () {
            //         $(this).removeClass("active");
            //         $(this).parent().removeClass("active");
            //         $(this).parent().parent().prev().removeClass("active");
            //     });

            //     if ($(e).attr("ng-reflect-router-link") && e.href == window.location.href) {
            //         $(e).addClass("active");
            //         $(e).parent().addClass("active"); // add active to li of the current link
            //         $(e).parent().parent().prev().addClass("active"); // add active class to an anchor
            //     }
            // }
        });
    }

    OnMenuItemClick(e: any): void {
        let sender = e.target.tagName == "A" ? e.target : $(e.target).parent();

        console.log(sender);

        if (!$("#wrapper").hasClass("enlarged")) {
            if ($(sender).parent().hasClass("has_sub")) { }
            if (!$(sender).hasClass("subdrop")) {
                // hide any open menus and remove all other classes
                $("ul", $(sender).parents("ul:first")).slideUp(350);
                $("a", $(sender).parents("ul:first")).removeClass("subdrop");
                $("#sidebar-menu .pull-right i").removeClass("md-remove").addClass("md-add");

                // open our new menu and add the open class
                $(sender).next("ul").slideDown(350);
                //$(this).addClass("subdrop");
                $(".pull-right i", $(sender).parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
                $(".pull-right i", $(sender).siblings("ul")).removeClass("md-remove").addClass("md-add");
            } else if ($(sender).hasClass("subdrop")) {
                $(sender).removeClass("subdrop");
                $(sender).next("ul").slideUp(350);
                $(".pull-right i", $(sender).parent()).removeClass("md-remove").addClass("md-add");
            }
        }
    }
}