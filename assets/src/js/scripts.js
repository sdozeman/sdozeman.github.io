/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 *
 * ======================================================================== */

 // Define Methods/Functions outside the router for reusability

import {
    ImagesLoaded,
    Parallaxify,
    Parallax,
    ScrollDown,
    Scroller,
    StickyHeader,
} from './modules'

import fancybox from '@fancyapps/fancybox/dist/jquery.fancybox.js';

const Router = {

    common: {

        init() {
            ImagesLoaded.init('.js-loaded');
            Parallax.init('.parallax-layer');
            Parallaxify.init('.site__hero-background-layer');
            StickyHeader.init('.site-header');
            ScrollDown.init();


            function hideEmails() {
                var mails = document.querySelectorAll('[data-mail-user][data-mail-domain]');
              
                Array.prototype.forEach.call(mails, function(el) {
                  var user    = el.dataset.mailUser;
                  var domain  = el.dataset.mailDomain;
                  var pattern =  user + '@' + domain + '.com';
                                
                  if(el.getAttribute('href')) {
                    el.setAttribute('href', 'mailto:' + pattern);
                  }
                });
              }
            hideEmails();
		},

        finalize() {
            Scroller.init();
            window.dispatchEvent(new Event('scroll'));
        }
    },
};

export default Router;

/*
 * The routing fires all common scripts, followed by the page specific scripts.
 * Add additional events for more control over timing e.g. a finalize event
*/
const UTIL = {

    fire(func, funcname, args) {
        const namespace = Router;
        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
            namespace[func][funcname](args);
        }
    },
    loadEvents() {
        UTIL.fire('common');

        $.each(document.body.className.replace(/-/g, '_').split(/\s+/), (i, classnm) => {
            UTIL.fire(classnm);
        });

		$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
			UTIL.fire(classnm);
		});

		UTIL.fire('common', 'finalize');
	}
};

$(document).ready(UTIL.loadEvents);
