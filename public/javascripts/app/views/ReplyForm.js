define(function(require) {
	var core = require('core');
	var Marionette = core.Marionette;
	require('lib/stickit.codemirror');

	return Marionette.ItemView.extend({
		template: require('hbs!templates/form/reply'),
		mixins: [
			require('lib/mixins/stickit-view')
		],
		bindings: {
			'[name="reply-text"]': {
				observe: 'text'
			}
		}
	});
});