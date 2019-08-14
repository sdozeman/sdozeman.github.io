// @codekit-prepend  "navigation.js"
// @codekit-prepend  "off-canvas.js"

//Functions Up Here
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + ($(elem).height() / 2);

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function hideEmails() {
  var mails = document.querySelectorAll('[data-mail-user][data-mail-domain]');

  Array.prototype.forEach.call(mails, function(el) {
    var user    = el.dataset.mailUser;
    var domain  = el.dataset.mailDomain;
    var pattern =  user + '@' + domain;

    if(el.getAttribute('href')) {
      el.setAttribute('href', 'mailto:' + pattern);
    }
  });
}

// On Ready Here
jQuery(document).ready(function($){
  $('.site--hero-background').parallaxify({
    positionProperty: 'transform',
    motionType: 'natural',
    responsive: true
  });

  hideEmails();
  $('nav.site--navigation').mobileNavigation();
  $('div.off--canvas').offCanvas();


  // Sticky Header animation
  $(window).on('scroll touchmove', function(){
    $('.site-header').toggleClass('scrolled', $(document).scrollTop() > 100);
    $('.project').each(function() {
      if (isScrolledIntoView($(this))) {
        $(this).addClass('in-viewport');
      }
    });
  }).scroll();

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 50
          }, 500, function() {
            // Callback after animation
          });
        }
      }
    });


  $('a[data-project]').each(function(){
    $(this).on('click', function(e){
      var name = $(this).attr('data-project');
      e.preventDefault();

      $.ajax({
        url: this.href,
        success: function(data) {
          $('#occ').html(data);
          window.console.log(name + ' was loaded successfully.');
          $('.off--canvas-trigger').click();

          setTimeout(function(){
            $('.off--canvas').addClass('content-loaded');
          }, 1000);

        },
        error: function() {
          window.console.log('There was an error loading ' + name + '.' );
        }
      });
    });
  });


  $(window).trigger('resize, scroll');
});
