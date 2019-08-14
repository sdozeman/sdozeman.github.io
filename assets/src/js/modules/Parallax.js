const Parallax = {

    init: function(className) {

        if ((!Modernizr.touch) && ($(window).width() >= 1024)){

            const layers = document.querySelectorAll(className);
            let event;

            function inView(el) {
                var rect = el.getBoundingClientRect();
            
                return rect.bottom > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight);
            };

            if (typeof(Event) === 'function') {
                event = new Event('scroll');
            } else {
                event = document.createEvent('Event');
                event.initEvent('scroll', true, true);
            }

            document.addEventListener('scroll', function () {
                layers.forEach(function (layer, i) {
                    const elHeight = layer.clientHeight;
                    const bounding = layer.getBoundingClientRect();

                    const dataSpeed = layer.dataset.speed;
                    const parallaxSpeed = dataSpeed * .025;
                    
                    if (inView(layer)){
                        layer.style.transform = "translateY(" + (bounding.top * parallaxSpeed) + '%' + ")";
                    }
                });
                
            });

            document.dispatchEvent(event);
        }
    }
    
}

export default Parallax;