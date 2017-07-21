(function($) {
  $.fn.mobileNavigation = function(options) {
  	options = $.extend({}, {
  		navSelector: '.site--navigation',
  		menuButtonSelector: '.site--navigation-btn',
  		menuOpenClass: 'menu-open',
  		menuButtonActiveClass: 'active',
  	}, options);

  	var menuOpen = false,
  		$nav = $(options.navSelector),
  		$menuButton = $(options.menuButtonSelector);


  	var closeNav = function() {
      $nav.slideUp(500);
  		$nav.removeClass(options.menuOpenClass);
  		$menuButton.removeClass(options.menuButtonActiveClass);

  		menuOpen = false;
  	};

  	var menuBtnFn = function() {

  		$menuButton.bind('touchstart, click', function(event) {
  			event.stopPropagation();
  			event.preventDefault();

  			if (menuOpen) {
  				closeNav();
  			}
  			else{
          $nav.slideDown();
  				$nav.addClass( options.menuOpenClass );
  				$(this).addClass( options.menuButtonActiveClass );
  				menuOpen = true;
  			}
  		});
  	};

  	menuBtnFn();

  	$(window).resize(function(){
  		if( !$menuButton.is(':visible') ) {
  			$nav.removeAttr( 'style' );
        $nav.removeClass('menu-open');
        $menuButton.removeClass('active');
  		} else {
        $nav.find('a').on('click', function(){
          closeNav();
        });
      }
  	});
  	return this;
  };
})(jQuery);
