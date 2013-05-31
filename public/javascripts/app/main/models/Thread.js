define(function(require) {
	var Backbone = require("backbone");

	var model = Backbone.Model.extend({
		url: function() {
		},
		defaults: {
		}
	});

	var collection = Backbone.Collection.extend({
		url: function() {
		},
		model: model
	});

	return {
		Item: model,
		Collection: collection
	};
});