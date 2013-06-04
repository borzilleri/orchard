define(function(require) {
	var Backbone = require("backbone");
	var Marionette = require("backbone.marionette");
	var routes = require('/js/routes/thread.js');

	var model = Backbone.Model.extend({
		url: function() {
			return routes.api.ThreadAPI.create().url
		},
		defaults: {
			title: "",
		}
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