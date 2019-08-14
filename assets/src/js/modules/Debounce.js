/*
 * Debounce
 *
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * Source:
 * http://davidwalsh.name/javascript-debounce-function
 *
 * Usage:
 *
 * var Debounce = require('./modules/debounce.js');
 * var myEfficientFn = Debounce(function() {
 * 		// All the taxing stuff you do
 * }, 750);
 *
 */

const Debounce = (func, wait, immediate) => {

	let timeout;

	return function() {
        const context = this;
        const args = arguments;

        const later = () => {

			timeout = null;

			if (!immediate) func.apply(context, args);
		};

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

export default Debounce;
