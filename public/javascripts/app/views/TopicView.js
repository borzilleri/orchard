define(function(require) {
	var core = require('core');
	var ReplyForm = require('./ReplyForm');

	return core.Marionette.Layout.extend({
		template: require('hbs!templates/topic/view'),
		mixins: [
			require('lib/mixins/stickit-view')
		],
		regions: {
			'replies': '#replies-view',
			'replyForm': '#reply-form-view'
		},
		bindings: {
			'.topic-title': 'title',
			'.topic-body': 'contentHtml'
		},
		events: {
			'click .js-submit-reply': 'onAddReply'
		},
		initialize: function() {
			this.collection = this.model.get('posts');
		},
		onRender: function() {
			this.replyForm.show(new ReplyForm({
				model: new core.Backbone.Model()
			}));
		},
		onAddReply: function(e) {
			e.preventDefault();
			var model = new Reply.Model({contentSource: this.ui.form.val()});
			model.save()
				.done(this.onReplyCreated);
		},
		onReplyCreated: function(model) {
			this.collection.add(model);
			this.ui.form.val('');
		}
	});
});