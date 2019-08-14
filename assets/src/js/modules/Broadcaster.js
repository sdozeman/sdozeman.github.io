/**
 * Pub/Sub style module loader (https://davidwalsh.name/pubsub-javascript)
 * Publish to a topic and anyone can subscribe
 *
 * Event names are arbitrary, but it is good practice
 * to namespace them with the app or module where the event is published
 *
 * Naming convention & example:
 * Broadcaster.publish('Scroller:scrollTop',
 *     document.body.scrollTop || document.documentElement.scrollTop
 * );
 *
 * In this case the event was origininated from the Scroller module,
 * and the actual event is the "scrollTop".
 * Here the payload from the scrollTop event is the offset top value.
 * Make sure to keep payloads as simple as possible.
 *
 * Subscribing would look like this:
 * var scrollAlert = Broadcaster.subscribe('Scroller:scrollTop', function(payload) {
 *     console.log('you have scrolled ' + payload + 'px');
 * });

 * If you don't want the subscription anymore you can remove it:
 * scrollAlert.remove();
 *
 */

const topics = {};

const Broadcaster = {

    subscribe(topic, listener) {

		// Create the topic's object if not yet created
		if ( !topics.hasOwnProperty.call(topics, topic) ) topics[topic] = [];

        // Add the listener to queue
        const index = topics[topic].push(listener) -1;

        // Provide handle back for removal of topic
        return {
            remove() {
                delete topics[topic][index];
            }
        };

	},

    publish(topic, info) {

		// If the topic doesn't exist, or there's no listeners in queue, just leave
		if ( !topics.hasOwnProperty.call(topics, topic) ) return;

        // Cycle through topics queue, fire!
        topics[topic].forEach(item => {
            item(info != undefined ? info : {});
        });
    }
};

export default Broadcaster;
