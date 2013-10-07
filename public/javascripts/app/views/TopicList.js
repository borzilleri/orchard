define(function(require) {
	var core = require('core');

	var TopicView = core.Marionette.ItemView.extend({
		tagName: 'li',
		template: require('hbs!templates/topic/listItem'),
		mixins: [
			require('lib/mixins/stickit-view')
		],
		bindings: {
			'[name="author"]': 'author.displayName',
			'[name="title"]': {
				observe: 'title',
				attributes: [
					{
						name: 'href',
						observe: 'url'
					}
				]
			}
		}
	});

	return core.Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'topic-list',
		itemView: TopicView
	});
});
