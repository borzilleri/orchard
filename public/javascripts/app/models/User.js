define(function(require) {
	var core = require('core');

	var model = core.Backbone.Model.extend({
		defaults: {
			email: '',
			displayName: ''
		}
	});

	var collection = core.Backbone.Collection.extend({
		model: model
	});

	return {
		Model: model,
		Collection: collection
	}
});