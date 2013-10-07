define(function(require) {
	var core = require('core');

	var ReplyView = core.Marionette.ItemView.extend({
		tagName: 'li',
		template: require('hbs!templates/topic/reply'),
		mixins: [
			require('lib/mixins/stickit-view')
		],
		bindings: {
			'[name="author"]': 'author.displayName',
			'[name="text"]': 'contentHtml'
		}
	});

	return core.Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'media-list',
		itemView: ReplyView
	});
});
