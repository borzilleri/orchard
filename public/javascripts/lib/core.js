define(function(require) {
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('backbone.marionette');

	var app = new Marionette.Application({Orchard: window.Orchard})

	return {
		$: $,
		_: _,
		Backbone: Backbone,
		Marionette: Marionette,
		Stickit: require('backbone.stickit'),
		app: app,
		events: app.vent
	};
});