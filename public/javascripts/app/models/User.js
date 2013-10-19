define(function(require) {
	var core = require('core');
	var routes = require('/js/routes/user.js');

	var model = core.Backbone.Model.extend({
		url: function() {
			if( this.id ) {
				return routes.api.UserAPI.update(this.id).url;
			}
			else {
				return routes.api.UserAPI.add().url;
			}
		},
		defaults: {
			email: '',
			displayName: ''
		}
	});

	var collection = core.Backbone.Collection.extend({
		model: model,
		comparator: 'displayName'
	});

	return {
		Model: model,
		Collection: collection
	}
});