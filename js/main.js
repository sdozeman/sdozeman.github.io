// @codekit-prepend  "navigation.js"

jQuery(document).ready(function($){
  $('.site--hero-background').parallaxify({
    positionProperty: 'transform',
    motionType: 'natural',
    responsive: true
  });

  $('.site--navigation').mobileNavigation();

  // Sticky Header animation
  $(window).on('scroll touchmove', function(){
    $('.site-header').toggleClass('scrolled', $(document).scrollTop() > 100);
  }).scroll();
});
