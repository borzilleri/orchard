define(function(require) {
	var core = require('core');
	require('lib/stickit.codemirror');

	return core.Marionette.ItemView.extend({
		template: require('hbs!templates/form/reply'),
		mixins: [
			require('lib/mixins/stickit-view'),
			require('lib/mixins/form-alert')
		],
		bindings: {
			'[name="reply-text"]': {
				observe: 'text',
				codemirror: {
					height: 150,
					theme: 'cobalt',
					placeholder: 'Reply to this topic...'
				}
			}
		},
		events: {
			'submit form': 'onReply',
			'click .save': 'onReply'
		},
		onReply: function(e) {
			e.preventDefault();
			this.model.save()
				.done('onReplySaved');
		},
		onReplySaved: function() {
			core.events.trigger("reply:added", this.model);
		}
	});
});