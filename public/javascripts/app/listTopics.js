define(function(require) {
	var core = require('core');
	var Topic = require('./models/Topic');
	var TopicListView = require('./views/TopicList');
	var collection = new Topic.Collection();

	core.app.addRegions({
		threads: '#main-view'
	});

	core.app.addInitializer(function(options) {
		collection.fetch().done(function() {
			core.app.threads.show(new TopicListView({
				collection: collection
			}));
		})
	});
});
