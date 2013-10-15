define(function(require) {
	var core = require('core');
	var ReplyForm = require('./ReplyForm');
	var ReplyList = require('./ReplyList');

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
			'.author-name': 'author.displayName',
			'.post-date': {
				observe: 'createdOn',
				onGet: 'formatDate'
			},
			'.post-text': {
				observe: 'contentHtml',
				updateMethod: 'html'
			}
		},
		events: {
			'click .js-submit-reply': 'onAddReply'
		},
		initialize: function() {
			this.listenTo(core.events, 'reply:added', this.onReplyCreated);
			this.collection = this.model.get('replies');
		},
		formatDate: function(val) {
			return val.calendar();
		},
		onRender: function() {
			this.replies.show(new ReplyList({
				collection: this.collection
			}));
			this.replyForm.show(new ReplyForm({
				topicId: this.model.id
			}));
		},
		onReplyCreated: function(model) {
			this.collection.add(model);
		}
	});
});
