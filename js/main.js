// @codekit-prepend  "navigation.js"
// @codekit-prepend  "off-canvas.js"

//Functions Up Here
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

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
  $('.content.off--canvas').offCanvas();


  // Sticky Header animation
  $(window).on('scroll touchmove', function(){
    $('.site-header').toggleClass('scrolled', $(document).scrollTop() > 100);
    $('.project').each(function() {
      if (isScrolledIntoView($(this))) {
        $(this).addClass('in-viewport');
      }
    });
  }).scroll();


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
          $('.off--canvas').addClass('content-loaded');

        },
        error: function() {
          window.console.log('There was an error loading ' + name + '.' );
        }
      });
    });
  });


  $(window).trigger('resize, scroll');
});
