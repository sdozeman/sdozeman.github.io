(function($) {
  $.fn.offCanvas = function(options) {
  	options = $.extend({}, {
  		canvasSelector: '.off--canvas',
  		canvasButtonSelector: '.off--canvas-trigger',
      canvasCloseButtonSelector: '.off--canvas-closer',
  		canvasOpenClass: 'canvas-open',
  		canvasButtonActiveClass: 'active',
  	}, options);

  	var canvasOpen = false,
  		$canvas = $(options.canvasSelector),
  		$canvasButton = $(options.canvasButtonSelector),
      $canvasCloseButton = $(options.canvasCloseButtonSelector);


  	var closeCanvas = function() {
      $canvas.find('.project').remove();
      $canvas.removeClass('content-loaded');
  		$canvas.removeClass(options.canvasOpenClass);
  		$canvasButton.removeClass(options.canvasButtonActiveClass);

      $('body').removeClass(options.canvasOpenClass);
  		canvasOpen = false;
  	};

    var closeBtnFn = function() {
      $canvasCloseButton.on('touchstart, click', function(event){
        event.stopPropagation();
  			event.preventDefault();

        if (canvasOpen) {
  				closeCanvas();
  			}
        canvasOpen = false;
      });
    };

  	var canvasBtnFn = function() {
  		$canvasButton.bind('touchstart, click', function(event) {
  			event.stopPropagation();
  			event.preventDefault();

  			if (canvasOpen) {
  				closeCanvas();
  			}
  			else{
  				$canvas.addClass( options.canvasOpenClass );
  				$(this).addClass( options.canvasButtonActiveClass );

          $('body').addClass(options.canvasOpenClass);
  				canvasOpen = true;
  			}
  		});
  	};

  	canvasBtnFn();
    closeBtnFn();

  	return this;
  };
})(jQuery);
