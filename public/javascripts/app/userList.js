define(function(require) {
	var core = require('core');
	var User = require('./models/User');
	var View = require('./views/admin/UserList');

	core.app.addRegions({
		users: '#main-view'
	});

	core.app.addInitializer(function(options) {
		core.app.users.show(new View({
			collection: new User.Collection(options.data.users)
		}));
	});
});
