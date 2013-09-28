define(function(require) {
	var Marionette = require('backbone.marionette');
	var Topic = require('./models/Topic');
	var View = require('./views/TopicView');
	var app = new Marionette.Application();

	app.addRegions({
		thread: '#main-view'
	});

	app.addInitializer(function(options) {
		app.thread.show(new View({
			model: new Topic.Model(options.data.topic)
		}));
	});

	app.start(window.Orchard);
});