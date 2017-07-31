import { Component, OnInit } from '@angular/core';
import { MenuItem, Navigation } from '../../../core';

declare var $: any;

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

    main: MenuItem[] = Navigation.instance.main
    help: MenuItem[] = Navigation.instance.help

    ngOnInit(): void {
        $(function () {
            // NAVIGATION HIGHLIGHT & OPEN PARENT
            $("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");

            // var ua = navigator.userAgent, event = (ua.match(/iP/i)) ? "touchstart" : "click";

            $("#sidebar-menu a").each(function () {
                if (this.href == window.location.href) {
                    $(this).addClass("active");
                    $(this).parent().addClass("active"); // add active to li of the current link
                    $(this).parent().parent().prev().addClass("active"); // add active class to an anchor

                    if ($(this).parent().parent().prev().parent().hasClass("has_sub")) {
                        var menuElement = $(this).parent().parent().prev();
                        menuElement.addClass("subdrop");
                        menuElement.next("ul").slideDown(350);
                        $(".pull-right i", menuElement.parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
                        $(".pull-right i", menuElement.siblings("ul")).removeClass("md-remove").addClass("md-add");
                    }
                }
            });
        });
    }

    OnMenuItemClick(e: any): void {
        let sender = e.target.tagName == "A" ? e.target : $(e.target).parent();

        console.log(sender);

        if (!$("#wrapper").hasClass("enlarged")) {
            //one level
            if ($(sender).parent().hasClass("has_sub")) { }

            if (!$(sender).hasClass("subdrop")) {
                // hide any open menus and remove all other classes
                $("ul", $(sender).parents("ul:first")).slideUp(350);
                $("a", $(sender).parents("ul:first")).removeClass("subdrop");
                $("#sidebar-menu .pull-right i").removeClass("md-remove").addClass("md-add");

                // open our new menu and add the open class
                $(sender).next("ul").slideDown(350);
                if ($(sender).parent().hasClass("has_sub")) {
                    $(sender).addClass("subdrop");
                }
                $(".pull-right i", $(sender).parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
                $(".pull-right i", $(sender).siblings("ul")).removeClass("md-remove").addClass("md-add");
            } else if ($(sender).hasClass("subdrop")) {
                $(sender).removeClass("subdrop");
                $(sender).next("ul").slideUp(350);
                $(".pull-right i", $(sender).parent()).removeClass("md-remove").addClass("md-add");
            }
        }

        $("#sidebar-menu a").each(function () {
            $(this).removeClass("active");
            $(this).parent().removeClass("active");
            $(this).parent().parent().prev().removeClass("active");
        });

        $(sender).addClass("active");
        $(sender).parent().addClass("active"); // add active to li of the current link
        $(sender).parent().parent().prev().addClass("active"); // add active class to an anchor 
    }
}