define(function(require){
	var Marionette = require('backbone.marionette');
	var ThreadModel = require('./models/Thread');
	var View = require('./views/TopicView');
	var app = new Marionette.Application();

	app.addRegions({
		thread: '#main-view'
	});

	app.addInitializer(function(options) {
		app.thread.show(new View({
			model: new ThreadModel.Item(window.Orchard.data.topic)
		}));
	});

	app.start();
});