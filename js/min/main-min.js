!function($){$.fn.mobileNavigation=function(e){e=$.extend({},{navSelector:".site--navigation",menuButtonSelector:".site--navigation-btn",menuOpenClass:"menu-open",menuButtonActiveClass:"active"},e);var n=!1,t=$(e.navSelector),o=$(e.menuButtonSelector),i=function(){t.slideUp(),t.removeClass(e.menuOpenClass),o.removeClass(e.menuButtonActiveClass),n=!1},s=function(){o.bind("touchstart, click",function(o){o.stopPropagation(),o.preventDefault(),n?i():(t.slideDown(),t.addClass(e.menuOpenClass),$(this).addClass(e.menuButtonActiveClass),n=!0)})};return s(),$(window).resize(function(){o.is(":visible")||t.removeAttr("style")}),this}}(jQuery),jQuery(document).ready(function($){$(".site--hero-background").parallaxify({positionProperty:"transform",motionType:"natural",responsive:!0}),$(".site--navigation").mobileNavigation(),$(window).on("scroll touchmove",function(){$(".site-header").toggleClass("scrolled",$(document).scrollTop()>100)}).scroll()});
//# sourceMappingURL=./main-min.js.map