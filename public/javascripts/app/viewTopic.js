define(function(require) {
	var core = require('core');
	var Topic = require('./models/Topic');
	var View = require('./views/TopicView');

	core.app.addRegions({
		topic: '#main-view'
	});

	core.app.addInitializer(function(options) {
		core.app.topic.show(new View({
			model: new Topic.Model(options.data.topic)
		}));
	});
});
