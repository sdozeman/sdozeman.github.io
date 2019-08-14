const ScrollDown = {

    init() {
        function anchorLinkHandler(e) {
            e.preventDefault();

            var distanceToTop = function distanceToTop(el) {
              return Math.floor(el.getBoundingClientRect().top);
            };
          
            var targetID = this.getAttribute("href");
            var targetAnchor = document.querySelector(targetID);
            
            if (!targetAnchor) return;
            var originalTop = distanceToTop(targetAnchor);

            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            
            // IE doesn't support more than x, y coords on scrollBy or scrollTo methods
            if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                window.scrollBy(0, originalTop-140);			
            } else {
                window.scrollBy({
                    left: 0, 
                    top: originalTop,
                    behavior: "smooth"
                });
            }
            
            var checkIfDone = setInterval(function () {
                var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
            
                if (distanceToTop(targetAnchor) === 0 || atBottom) {
                    targetAnchor.tabIndex = "-1";
                    targetAnchor.focus();
                    window.history.pushState("", "", targetID);
                    clearInterval(checkIfDone);
                }
            }, 100);
        }
          
        var linksToAnchors = document.querySelectorAll('a[href^="#"]');
        linksToAnchors.forEach(function (each) {
            return each.onclick = anchorLinkHandler;
        });
    }
};

export default ScrollDown;
