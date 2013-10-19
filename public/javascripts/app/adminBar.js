define(function(require) {
	var core = require('core');

	var View = core.Marionette.ItemView.extend({
	});

	core.app.addRegions({
		adminBar: '#admin-bar-view'
	});

	core.app.addInitializer(function(options) {
		core.app.adminBar.attachView(new View({el: core.$('#admin-bar')}));
	});
});
