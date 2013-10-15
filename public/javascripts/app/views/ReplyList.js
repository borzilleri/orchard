define(function(require) {
	var core = require('core');
	var marked = require('marked');

	var ReplyView = core.Marionette.ItemView.extend({
		tagName: 'li',
		className: 'media',
		template: require('hbs!templates/topic/reply'),
		mixins: [
			require('lib/mixins/stickit-view')
		],
		bindings: {
			'.author-name': 'author.displayName',
			'.post-text': {
				observe: 'contentHtml',
				updateMethod: 'html'
			},
			'.post-date': {
				observe: 'createdOn',
				onGet: 'formatDate'
			}
		},
		formatDate: function(val) {
			return val.calendar();
		}
	});

	return core.Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'media-list',
		itemView: ReplyView
	});
});
