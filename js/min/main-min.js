function isScrolledIntoView(t){var e=$(window).scrollTop(),n=e+$(window).height(),o=$(t).offset().top,i=o+$(t).height();return n>=i&&o>=e}!function($){$.fn.mobileNavigation=function(t){t=$.extend({},{navSelector:".site--navigation",menuButtonSelector:".site--navigation-btn",menuOpenClass:"menu-open",menuButtonActiveClass:"active"},t);var e=!1,n=$(t.navSelector),o=$(t.menuButtonSelector),i=function(){n.slideUp(500),n.removeClass(t.menuOpenClass),o.removeClass(t.menuButtonActiveClass),e=!1},a=function(){o.bind("touchstart, click",function(o){o.stopPropagation(),o.preventDefault(),e?i():(n.slideDown(),n.addClass(t.menuOpenClass),$(this).addClass(t.menuButtonActiveClass),e=!0)})};return a(),$(window).resize(function(){o.is(":visible")||n.removeAttr("style")}),this}}(jQuery),jQuery(document).ready(function($){$(".site--hero-background").parallaxify({positionProperty:"transform",motionType:"natural",responsive:!0}),$(".site--navigation").mobileNavigation(),function(){var t=document.querySelectorAll("[data-mail-user][data-mail-domain]");Array.prototype.forEach.call(t,function(t){var e=t.dataset.mailUser,n=t.dataset.mailDomain,o=e+"@"+n;t.getAttribute("href")&&t.setAttribute("href","mailto:"+o)})}(),$(window).on("scroll touchmove",function(){$(".site-header").toggleClass("scrolled",$(document).scrollTop()>100),$(".project").each(function(){isScrolledIntoView($(this))&&$(this).addClass("in-viewport")})}).scroll()});
//# sourceMappingURL=./main-min.js.map