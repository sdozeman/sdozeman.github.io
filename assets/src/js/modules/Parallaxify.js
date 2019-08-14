const Parallaxify = {
	
	init(elementLayer) {
		const layers = document.querySelectorAll(elementLayer);			

		if ((!Modernizr.touch) && ($(window).width() >= 1024)){

			document.addEventListener("mousemove", function (e) {
				layers.forEach(function(layer){
					const speed  = layer.getAttribute('data-speed'),
						  opaque = layer.getAttribute('data-opacity');

					let visible  = false,
						transX   = -e.clientX/speed + "px",
						transY   = -e.clientY/speed + "px";

					layer.style.transform = "translate(" + transX + "," + transY + ")";

					if((layer.style.opacity == 0) && (visible == false)){
						layer.style.opacity = opaque;
						visible = true;
					} else {
						visible = false;
					}
				});
			});
		} else {
			layers.forEach(function(layer){
				const opaque = layer.getAttribute('data-opacity');
				layer.style.opacity = opaque * .25;
			});
		}
	}
}

export default Parallaxify;
