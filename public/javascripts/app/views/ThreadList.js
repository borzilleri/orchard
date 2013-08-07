define(function(require) {
	var Marionette = require("backbone.marionette");
	var Cocktail = require('Cocktail');
	var StickitMixin = require('lib/mixins/stickit-view');

	var TopicView = Marionette.ItemView.extend({
		template: '#thread-item-template',
		tagName: 'li',
		bindings: {
			'.topic-author': 'author.displayName',
			'.topic-title': 'title'
		}
	});
	Cocktail.mixin(TopicView, StickitMixin);

	var View = Marionette.CollectionView.extend({
		itemViewContainer: 'ul',
		itemView: TopicView
	});

	return View;
});