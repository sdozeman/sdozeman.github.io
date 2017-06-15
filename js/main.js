// @codekit-prepend  "navigation.js"

//Functions Up Here
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// On Ready Here
jQuery(document).ready(function($){
  $('.site--hero-background').parallaxify({
    positionProperty: 'transform',
    motionType: 'natural',
    responsive: true
  });

  $('.site--navigation').mobileNavigation();

  (function() {
  	var mails = document.querySelectorAll('[data-mail-user][data-mail-domain]');

    Array.prototype.forEach.call(mails, function(el) {
    	var user    = el.dataset.mailUser;
      var domain  = el.dataset.mailDomain;
      var pattern =  user + '@' + domain;

      if(el.getAttribute('href')) {
      	el.setAttribute('href', 'mailto:' + pattern);
      }
     });
  }());

  // Sticky Header animation
  $(window).on('scroll touchmove', function(){
    $('.site-header').toggleClass('scrolled', $(document).scrollTop() > 100);
    $('.project').each(function() {
      if (isScrolledIntoView($(this))) {
        $(this).addClass('in-viewport');
      }
    });
  }).scroll();
});
