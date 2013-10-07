define(function(require) {
	var core = require('core');
	var Topic = require('./models/Topic');
	var View = require('./views/TopicCreate');

	core.app.addRegions({
		thread: '#main-view'
	});

	core.app.addInitializer(function(options) {
		core.app.thread.show(new View({
			model: new Topic.Model
		}));
	});
});
