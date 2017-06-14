jQuery(document).ready(function($){
  $('.site--hero-background').parallaxify({
    positionProperty: 'transform',
    motionType: 'natural',
    responsive: true
  });

  // Sticky Header animation
  $(window).on('scroll touchmove', function () {
    $('.site-header').toggleClass('scrolled', $(document).scrollTop() > 100);
  }).scroll();

  // // ScrollTo navigation
  // $(document).on("scroll", onScroll);
  //
  //   $('a[href^="#"]').on('click', function(e) {
  //     e.preventDefault();
  //     $(document).off("scroll");
  //
  //     $('a').each(function () {
  //       $(this).removeClass('active');
  //     })
  //
  //     $(this).addClass('active');
  //
  //     var target = this.hash;
  //     $target = $(target);
  //
  //     $('html, body').stop().animate({
  //       'scrollTop': $target.offset().top+2
  //     }, 500, 'swing', function () {
  //       window.location.hash = target;
  //       $(document).on("scroll", onScroll);
  //     });
  //   });
  //
  //   function onScroll(event){
  //     var scrollPosition = $(document).scrollTop();
  //     $('nav a').each(function () {
  //       var currentLink = $(this),
  //           menu = $('.main-navigation .menu'),
  //           refElement = $(currentLink.attr("href")),
  //           refElementId = refElement.attr('id');
  //
  //       if (refElement.position().top - 100 <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
  //         $('nav ul li').removeClass("active");
  //         currentLink.parent('li').addClass("active");
  //       }
  //       else{
  //         currentLink.parent('li').removeClass("active");
  //       }
  //     });
  //   }

});
