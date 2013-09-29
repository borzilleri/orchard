define(function(require) {
	var core = require('core');
	require('backbone-associations');

	var routes = require('/js/routes/thread.js');
	var Reply = require('./Reply');
	var User = require('./User');

	var model = core.Backbone.AssociatedModel.extend({
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
				type: core.Backbone.One,
				key: 'author',
				relatedModel: User.Model
			},
			{
				type: core.Backbone.Many,
				key: 'replies',
				relatedModel: Reply.Model,
				collectionType: Reply.Collection
			}
		]
	});

	var collection = core.Backbone.Collection.extend({
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