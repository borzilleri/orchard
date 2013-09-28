define(function(require) {
	var Backbone = require("backbone");
	require('backbone-associations');
	var routes = require('/js/routes/thread.js');

	var model = Backbone.Model.extend({
		url: function() {
			return routes.api.TopicAPI.create().url
		},
		defaults: {
			contentSource: '',
			contentHtml: null,
			createdOn: null,
			modifiedOn: null
		}
	});

	var collection = Backbone.Collection.extend({
		model: model
	});

	return {
		Model: model,
		Collection: collection
	}
});