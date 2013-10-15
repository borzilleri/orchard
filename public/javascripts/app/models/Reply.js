define(function(require) {
	var core = require('core');
	require('backbone-associations');
	var moment = require('moment');
	var routes = require('/js/routes/thread.js');

	var User = require('./User');

	var model = core.Backbone.AssociatedModel.extend({
		url: function() {
			if( this.get('index') ) {
				return routes.api.ReplyAPI.update(this.get('topicId'), this.get('index')).url;
			}
			else {
				return routes.api.ReplyAPI.create(this.get('topicId')).url;
			}
		},
		defaults: {
			contentSource: '',
			contentHtml: null,
			createdOn: null,
			modifiedOn: null,
			author: null
		},
		relations: [
			{
				type: core.Backbone.One,
				key: 'author',
				relatedModel: User.Model
			}
		],
		parse: function(response, options) {
			response.createdOn = moment(response.createdOn.millis);
			if( response.modifiedOn ) {
				response.modifiedOn = moment(response.modifiedOn.millis);
			}
			return response;
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
