define(function(require) {
	var Backbone = require("backbone");
	var Marionette = require("backbone.marionette");
	require("backbone.stickit");

	var Item = require('./ThreadListItem');

	return Backbone.Marionette.CollectionView.extend({
		itemViewContainer: 'ul',
		itemView: Item,
		events: {
		},
		ui: {
		},
		bindings: {
		},
		initialize: function () {
			this.on('close', this.unstickit);
		},
		onRender: function () {
			this.stickit();
		},
	});
});