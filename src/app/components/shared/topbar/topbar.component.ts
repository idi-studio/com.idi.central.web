import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'topbar',
    templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
    ngOnInit(): void {
        $(function () {
            function toggle_slimscroll(item) {
                if ($("#wrapper").hasClass("enlarged")) {
                    $(item).css("overflow", "inherit").parent().css("overflow", "inherit");
                    $(item).siblings(".slimScrollBar").css("visibility", "hidden");
                } else {
                    $(item).css("overflow", "hidden").parent().css("overflow", "hidden");
                    $(item).siblings(".slimScrollBar").css("visibility", "visible");
                }
            }

            var ua = navigator.userAgent, event = (ua.match(/iP/i)) ? "touchstart" : "click";

            $(".open-left").on(event, function (e) {
                e.stopPropagation();
                $("#wrapper").toggleClass("enlarged");
                $("#wrapper").addClass("forced");

                if ($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
                    $("body").removeClass("fixed-left").addClass("fixed-left-void");
                } else if (!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
                    $("body").removeClass("fixed-left-void").addClass("fixed-left");
                }

                if ($("#wrapper").hasClass("enlarged")) {
                    $(".left ul").removeAttr("style");
                } else {
                    $(".subdrop").siblings("ul:first").show();
                }

                toggle_slimscroll(".slimscrollleft");
                $("body").trigger("resize");
            });
        });
    }
}