import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../models/menu-item';

declare var $: any;

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    ngOnInit(): void {
        $(function () {
            // NAVIGATION HIGHLIGHT & OPEN PARENT
            $("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");

            var ua = navigator.userAgent, event = (ua.match(/iP/i)) ? "touchstart" : "click";

            $("#sidebar-menu a").on(event, function (e) {
                if (!$("#wrapper").hasClass("enlarged")) {
                    if ($(this).parent().hasClass("has_sub")) {

                    }
                    if (!$(this).hasClass("subdrop")) {
                        // hide any open menus and remove all other classes
                        $("ul", $(this).parents("ul:first")).slideUp(350);
                        $("a", $(this).parents("ul:first")).removeClass("subdrop");
                        $("#sidebar-menu .pull-right i").removeClass("md-remove").addClass("md-add");

                        // open our new menu and add the open class
                        $(this).next("ul").slideDown(350);
                        $(this).addClass("subdrop");
                        $(".pull-right i", $(this).parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
                        $(".pull-right i", $(this).siblings("ul")).removeClass("md-remove").addClass("md-add");
                    } else if ($(this).hasClass("subdrop")) {
                        $(this).removeClass("subdrop");
                        $(this).next("ul").slideUp(350);
                        $(".pull-right i", $(this).parent()).removeClass("md-remove").addClass("md-add");
                    }
                }
            });
        });
    }
    navigation: MenuItem[] = [
        { name: "Dashboard", icon: "zmdi zmdi-view-dashboard", action: "", actived: true, sub: [] },
        {
            name: "User Interface", icon: "zmdi zmdi-format-underlined", action: "", actived: false, sub: [
                { name: "Buttons", icon: "", action: "", actived: false, sub: [] },
                { name: "Cards", icon: "", action: "", actived: false, sub: [] },
                { name: "Dropdowns", icon: "", action: "", actived: false, sub: [] },
                { name: "Checkboxs-Radios", icon: "", action: "", actived: false, sub: [] },
                { name: "Navs", icon: "", action: "", actived: false, sub: [] },
                { name: "Progress", icon: "", action: "", actived: false, sub: [] },
                { name: "Modals", icon: "", action: "", actived: false, sub: [] },
                { name: "Alerts", icon: "", action: "", actived: false, sub: [] }
            ]
        },
        {
            name: "Components", icon: "zmdi zmdi-album", action: "", actived: false, sub: [
                { name: "Grid", icon: "", action: "", actived: false, sub: [] },
                { name: "Range sliders", icon: "", action: "", actived: false, sub: [] },
                { name: "Sweet Alerts", icon: "", action: "", actived: false, sub: [] },
                { name: "Ratings", icon: "", action: "", actived: false, sub: [] },
                { name: "Treeview", icon: "", action: "", actived: false, sub: [] },
                { name: "Tour", icon: "", action: "", actived: false, sub: [] }
            ]
        }
    ];
    more: MenuItem[] = [
        {
            name: "Pages", icon: "zmdi zmdi-collection-item", action: "", actived: false, sub: [
                { name: "Starter Page", icon: "", action: "", actived: false, sub: [] },
                { name: "Login", icon: "", action: "", actived: false, sub: [] },
                { name: "Register", icon: "", action: "", actived: false, sub: [] },
                { name: "Recover Password", icon: "", action: "", actived: false, sub: [] },
                { name: "Lock Screen", icon: "", action: "", actived: false, sub: [] },
                { name: "Error 404", icon: "", action: "", actived: false, sub: [] },
                { name: "Error 500", icon: "", action: "", actived: false, sub: [] }
            ]
        },
        {
            name: "Multi Level", icon: "", action: "", actived: false, sub: [
                { name: "Menu Level 1.1", icon: "", action: "", actived: false, sub: [] },
                { name: "Menu Level 1.2", icon: "", action: "", actived: false, sub: [] }
            ]
        }
    ];
}