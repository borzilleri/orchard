define(function(require) {
	var Backbone = require("backbone");
	require('backbone-associations');

	var model = Backbone.Model.extend({
		defaults: {
			contentSource: '',
			contentHtml: null,
			createdOn: null,
			modifiedOn: null
		}
	});

	var collection = Backbone.Collection.extend({

	});

	return {
		Model: model,
		Collection: collection
	}
});