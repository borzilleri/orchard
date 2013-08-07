define(function(require) {
	var Backbone = require("backbone");
	require('backbone-associations');
	var routes = require('/js/routes/thread.js');
	var Post = require('./Post');
	var User = require('./User');

	var model = Backbone.AssociatedModel.extend({
		url: function() {
			return routes.api.TopicAPI.create().url
		},
		defaults: {
			title: "",
			closed: false,
			contentSource: '',
			contentHtml: null,
			url: '',
			createdOn: null,
			modifiedOn: null,
			author: null,
			posts: []
		},
		relations: [
			{
				type: Backbone.One,
				key: 'author',
				relatedModel: User.Model
			},
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
			return routes.api.TopicAPI.getAll().url
		},
		model: model
	});

	return {
		Item: model,
		Collection: collection
	};
});