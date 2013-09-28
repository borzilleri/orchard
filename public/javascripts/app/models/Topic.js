define(function(require) {
	var Backbone = require("backbone");
	require('backbone-associations');
	var routes = require('/js/routes/thread.js');
	var Reply = require('./Reply');
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
			replies: []
		},
		relations: [
			{
				type: Backbone.One,
				key: 'author',
				relatedModel: User.Model
			},
			{
				type: Backbone.Many,
				key: 'replies',
				relatedModel: Reply.Model,
				collectionType: Reply.Collection
			}
		]
	});

	var collection = Backbone.Collection.extend({
		url: function() {
			return routes.api.TopicAPI.list().url
		},
		model: model
	});

	return {
		Model: model,
		Collection: collection
	};
});