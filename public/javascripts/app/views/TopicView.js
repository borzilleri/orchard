define(function(require) {
	var Marionette = require('backbone.marionette');
	var StickitMixin = require('lib/mixins/stickit-view');
	var FormAlertMixin = require('lib/mixins/form-alert');
	var Cocktail = require('Cocktail');
	var Reply = require('../models/Post');

	var ReplyView = Marionette.ItemView.extend({
		template: '#reply-template',
		bindings: {

		}
	});

	var TopicView = Marionette.CompositeView.extend({
		template: '#topic-template',
		itemView: ReplyView,
		itemViewContainer: '#reply-list',
		bindings: {
			'.topic-title': 'title',
			'.topic-body': 'contentHtml'
		},
		ui: {
			form: '.add-reply-text'
		},
		events: {
			'click .js-submit-reply': 'onAddReply'
		},
		initialize: function() {
			this.collection = this.model.get('posts');
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
	Cocktail.mixin(TopicView, StickitMixin, FormAlertMixin);

	return TopicView;
});