require.config({
	baseUrl: '/assets/javascripts/vendor',
	paths: {
		//underscore: 'lodash',
		app: '../app',
		lib: '../lib'
	}
});

require(['jquery', 'bootstrap/dropdown'], function($) {
	window.Orchard = window.Orchard || {};
	$(function() {
		require(["app/" + (window.Orchard.jsMain || "main")]);
	});
});
