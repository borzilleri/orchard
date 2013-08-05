define(function(require) {
	var Backbone = require("backbone");
	require('backbone-associations');
	var routes = require('/js/routes/thread.js');
	var Post = require('./Post');

	var model = Backbone.AssociatedModel.extend({
		url: function() {
			return routes.api.ThreadAPI.create().url
		},
		defaults: {
			title: "",
			closed: false,
			contentSource: '',
			contentHtml: null,
			createdOn: null,
			modifiedOn: null,
			posts: []
		},
		relations: [
			{
				type: Backbone.Many,
				key: 'posts',
				relatedModel: Post.Model,
				collectionType: Post.Collection
			}
		]
	});

	var collection = Backbone.Collection.extend({
		url: function() {
			return routes.api.ThreadAPI.getAll().url
		},
		model: model
	});

	return {
		Item: model,
		Collection: collection
	};
});