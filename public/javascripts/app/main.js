define(function (require) {

	var App = require("app/models/App");
	var myApp = require("./application/main");
	var apps;
	var dfd = new $.Deferred();
	if(window.Agile && window.Agile.apps) {
		apps = new App.Collection(window.Agile.apps);
		dfd.resolve();
	}
	else {
		apps = new App.Collection();
		dfd = apps.fetch();
	}
	dfd.done(function() {
		myApp.start({apps: apps});
	});
	window.apps = apps;
});