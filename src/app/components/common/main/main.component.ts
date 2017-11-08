import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'
import { TdDialogService, TdLoadingService } from '@covalent/core'
import { BaseComponent, Runtime } from '../../../core'
import { Observable } from 'rxjs/Rx'

declare var $: any;
declare var jQuery: any;

@Component({
    templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements OnInit {

    authorized: boolean
    timer: any
    username: any

    constructor(protected route: ActivatedRoute, protected router: Router, protected snack: MatSnackBar,
        protected loading: TdLoadingService, protected dialog: TdDialogService) {
        super(route, router, snack, loading, dialog)
    }

    ngOnInit(): void {
        this.init()
        this.authorized = Runtime.instance.authorized()
        this.username = Runtime.instance.get('username')
        this.start()
    }

    private start(): void {
        this.timer = Observable.timer(new Date(), 5000)
        this.timer.subscribe(t => {
            let username = Runtime.instance.get('username')
            if (username != this.username)
                this.navigate('/login')
        });
    }

    private init(): void {
        var resizefunc = [];
        var w, h, dw, dh;

        var debounce = function (func, wait, immediate) {
            var timeout, result;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) result = func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) result = func.apply(context, args);
                return result;
            };
        }

        var changeptype = function () {
            w = $(window).width();
            h = $(window).height();
            dw = $(document).width();
            dh = $(document).height();

            if (jQuery.browser.mobile === true) {
                $('body').addClass('mobile').removeClass('fixed-left');
            }

            if (!$('#wrapper').hasClass('forced')) {
                if (w > 1024) {
                    $('body').removeClass('smallscreen').addClass('widescreen');
                    $('#wrapper').removeClass('enlarged');
                } else {
                    $('body').removeClass('widescreen').addClass('smallscreen');
                    $('#wrapper').addClass('enlarged');
                    $('.left ul').removeAttr('style');
                }
                if ($('#wrapper').hasClass('enlarged') && $('body').hasClass('fixed-left')) {
                    $('body').removeClass('fixed-left').addClass('fixed-left-void');
                } else if (!$('#wrapper').hasClass('enlarged') && $('body').hasClass('fixed-left-void')) {
                    $('body').removeClass('fixed-left-void').addClass('fixed-left');
                }

            }
            toggle_slimscroll('.slimscrollleft');
        }

        function resizeitems() {
            if ($.isArray(resizefunc)) {
                for (var i = 0; i < resizefunc.length; i++) {
                    window[resizefunc[i]]();
                }
            }
        }

        function initscrolls() {
            if (jQuery.browser.mobile !== true) {
                //SLIM SCROLL
                $('.slimscroller').slimscroll({
                    height: 'auto',
                    size: '5px'
                });

                $('.slimscrollleft').slimScroll({
                    height: 'auto',
                    position: 'right',
                    size: '5px',
                    color: '#dcdcdc',
                    wheelStep: 5
                });
            }
        }

        function toggle_slimscroll(item) {
            if ($('#wrapper').hasClass('enlarged')) {
                $(item).css('overflow', 'inherit').parent().css('overflow', 'inherit');
                $(item).siblings('.slimScrollBar').css('visibility', 'hidden');
            } else {
                $(item).css('overflow', 'hidden').parent().css('overflow', 'hidden');
                $(item).siblings('.slimScrollBar').css('visibility', 'visible');
            }
        }

        $(function () {
            resizefunc.push('initscrolls');
            resizefunc.push('changeptype');

            window['initscrolls'] = initscrolls;
            window['changeptype'] = changeptype;

            $('.animate-number').each(function () {
                $(this).animateNumbers($(this).attr('data-value'), true, parseInt($(this).attr('data-duration')));
            });

            //RUN RESIZE ITEMS
            $(window).resize(debounce(resizeitems, 100, false));
            $('body').trigger('resize');

            // right side-bar toggle
            $('.right-bar-toggle').on('click', function (e) {
                $('#wrapper').toggleClass('right-bar-enabled');
            });
        })
    }
}