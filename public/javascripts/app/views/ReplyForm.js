define(function(require) {
	var core = require('core');
	require('lib/stickit.codemirror');
	var Reply = require('../models/Reply');

	return core.Marionette.ItemView.extend({
		template: require('hbs!templates/form/reply'),
		mixins: [
			require('lib/mixins/stickit-view'),
			require('lib/mixins/form-alert')
		],
		bindings: {
			'[name="reply-text"]': {
				observe: 'contentSource',
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
		initialize: function(options) {
			this.topicId = options.topicId;
			core._(this).bindAll('onReplySaved');
			this.model = new Reply.Model({topicId: this.topicId});
		},
		onReply: function(e) {
			e.preventDefault();
			this.model.save()
				.done(this.onReplySaved);
		},
		onReplySaved: function() {
			core.events.trigger("reply:added", this.model);
			this.model = new Reply.Model({topicId: this.topicId});
		}
	});
});
