define(function(require) {
	var Backbone = require("backbone");

	var model = Backbone.Model.extend({
		defaults: {
			email: '',
			displayName: ''
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