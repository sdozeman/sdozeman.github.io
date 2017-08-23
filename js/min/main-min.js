function isScrolledIntoView(t){var e=$(window).scrollTop(),n=e+$(window).height(),a=$(t).offset().top,o=a+$(t).height()/2;return n>=o&&a>=e}function hideEmails(){var t=document.querySelectorAll("[data-mail-user][data-mail-domain]");Array.prototype.forEach.call(t,function(t){var e=t.dataset.mailUser,n=t.dataset.mailDomain,a=e+"@"+n;t.getAttribute("href")&&t.setAttribute("href","mailto:"+a)})}!function($){$.fn.mobileNavigation=function(t){t=$.extend({},{navSelector:".site--navigation",menuButtonSelector:".site--navigation-btn",menuOpenClass:"menu-open",menuButtonActiveClass:"active"},t);var e=!1,n=$(t.navSelector),a=$(t.menuButtonSelector),o=function(){n.slideUp(500),n.removeClass(t.menuOpenClass),a.removeClass(t.menuButtonActiveClass),e=!1},s=function(){a.bind("touchstart, click",function(a){a.stopPropagation(),a.preventDefault(),e?o():(n.slideDown(),n.addClass(t.menuOpenClass),$(this).addClass(t.menuButtonActiveClass),e=!0)})};return s(),$(window).resize(function(){a.is(":visible")?n.find("li").bind("click",function(){o()}):(n.removeAttr("style"),n.removeClass("menu-open"),a.removeClass("active"),n.find("li").unbind("click"))}),this}}(jQuery),function($){$.fn.offCanvas=function(t){t=$.extend({},{canvasSelector:".off--canvas",canvasButtonSelector:".off--canvas-trigger",canvasCloseButtonSelector:".off--canvas-closer",canvasOpenClass:"canvas-open",canvasButtonActiveClass:"active"},t);var e=!1,n=$(t.canvasSelector),a=$(t.canvasButtonSelector),o=$(t.canvasCloseButtonSelector),s=function(){n.removeClass("content-loaded"),n.removeClass(t.canvasOpenClass),a.removeClass(t.canvasButtonActiveClass),$("body").removeClass(t.canvasOpenClass),e=!1,setTimeout(function(){n.find(".project").remove()},1e3)},i=function(){o.on("touchstart, click",function(t){t.stopPropagation(),t.preventDefault(),e&&s(),e=!1})},c=function(){a.bind("touchstart, click",function(a){a.stopPropagation(),a.preventDefault(),e?s():(n.addClass(t.canvasOpenClass),$(this).addClass(t.canvasButtonActiveClass),$("body").addClass(t.canvasOpenClass),e=!0)})};return c(),i(),this}}(jQuery),jQuery(document).ready(function($){$(".site--hero-background").parallaxify({positionProperty:"transform",motionType:"natural",responsive:!0}),hideEmails(),$("nav.site--navigation").mobileNavigation(),$(".content.off--canvas").offCanvas(),$(window).on("scroll touchmove",function(){$(".site-header").toggleClass("scrolled",$(document).scrollTop()>100),$(".project").each(function(){isScrolledIntoView($(this))&&$(this).addClass("in-viewport")})}).scroll(),$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(t){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var e=$(this.hash);e=e.length?e:$("[name="+this.hash.slice(1)+"]"),e.length&&(t.preventDefault(),$("html, body").animate({scrollTop:e.offset().top-50},500,function(){}))}}),$("a[data-project]").each(function(){$(this).on("click",function(t){var e=$(this).attr("data-project");t.preventDefault(),$.ajax({url:this.href,success:function(t){$("#occ").html(t),window.console.log(e+" was loaded successfully."),$(".off--canvas-trigger").click(),setTimeout(function(){$(".off--canvas").addClass("content-loaded")},1e3)},error:function(){window.console.log("There was an error loading "+e+".")}})})}),$(window).trigger("resize, scroll")});