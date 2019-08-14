import imagesLoaded from 'imagesloaded';

const ImagesLoaded = {

    init(className) {

		if (typeof NodeList.prototype.forEach !== 'function')  {
			NodeList.prototype.forEach = Array.prototype.forEach;
		}

		const els = document.querySelectorAll(className);
			
		els.forEach((el) => {
			imagesLoaded(className, () => {
				el.classList.add('is-loaded');
			});
        });
    }
};

export default ImagesLoaded;