import Broadcaster from './Broadcaster';
import Debounce from './Debounce';

const Scroller = {

    config: {
        scrollTop       : document.body.scrollTop || document.documentElement.scrollTop,
        lastScrollTop   : 0,
        scrollDirection : 'down',
		breakpoint      : 1024,
    },

    callScrollListener() {
		Scroller.config.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        const scrollTopIncreased = Scroller.config.scrollTop > Scroller.config.lastScrollTop;
        const scrollTopDecreased = Scroller.config.scrollTop < Scroller.config.lastScrollTop;

		if (scrollTopIncreased) {
			Scroller.config.scrollDirection = 'down';
		} else if (scrollTopDecreased) {
			Scroller.config.scrollDirection = 'up';
		}

		Scroller.config.lastScrollTop = Scroller.config.scrollTop;

		// once values are updated, serve them to Broadcaster
		Scroller.serve();
    },

    bindUIActions() {
		// debounce the scroll trigger slightly
		const debouncedScroll = Debounce(() => {
			Scroller.callScrollListener();
		}, 15);

        $(window).off('scroll');
        $(window).on('scroll', () => {
			debouncedScroll();
        });
    },

    serve() {
        Broadcaster.publish('Scroller', {
            scrollTop:     Scroller.config.scrollTop,
            lastScrollTop: Scroller.config.lastScrollTop,
            direction:     Scroller.config.scrollDirection,
        });
    },

    init() {
        Scroller.bindUIActions();
    }
};

export default Scroller;