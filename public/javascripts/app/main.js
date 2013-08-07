define(function(require) {
	var Marionette = require('backbone.marionette');
	var app = new Marionette.Application();
	var Thread = require('./models/Thread');
	var ThreadListView = require('./views/ThreadList');

	var collection = new Thread.Collection();

	app.addRegions({
		threads: '#thread-list'
	});

	app.addInitializer(function(options) {
		collection.fetch().done(function() {
			app.threads.show(new ThreadListView({
				collection: collection
			}));
		})
	});

	app.start();
});