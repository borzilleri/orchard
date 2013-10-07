define(function(require) {
	var core = require('core');
	var Topic = require('./models/Topic');
	var View = require('./views/TopicView');

	core.app.addRegions({
		topic: '#main-view'
	});

	core.app.addInitializer(function(options) {
		var model = new Topic.Model(options.data.topic);
		model.get('replies').each(function(reply, index) {
			reply.set('topicId', this.id);
			reply.set('index',index);
		}, model);
		core.app.topic.show(new View({model: model}));
	});
});
