import Broadcaster from './Broadcaster.js';

const StickyHeader = {

    init: function(className) {

        Broadcaster.subscribe('Scroller', function(payload){
            
            const scrollOffset = payload.scrollTop,
                  header = document.querySelector(className);

            if (scrollOffset >= 100) {
                header.classList.add('scrolled');

            } else {
                header.classList.remove('scrolled');
            }            
        });
    }
    
}

export default StickyHeader;