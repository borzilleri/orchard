define(function(require) {
	var core = require('core');

	var routes = require('/js/routes/user.js');
	var View = core.Marionette.ItemView.extend({
		events: {
			'click .logout-admin': 'logout'
		},
		initialize: function() {
			core._(this).bindAll('onLoggedOut');
		},
		logout: function(e) {
			e.preventDefault();
			routes.Auth.adminLogout().ajax().done(this.onLoggedOut);
		},
		onLoggedOut: function() {
			this.remove();
			// We may need to send some other event here?
		}
	});

	core.app.addRegions({
		adminBar: '#admin-bar-view'
	});

	core.app.addInitializer(function(options) {
		core.app.adminBar.attachView(new View({el: $('#admin-bar')}));
	});
});
