require.config({
	baseUrl: '/assets/javascripts/vendor',
	paths: {
		underscore: 'lodash.underscore',
		app: '../app',
		lib: '../lib'
	}
});

require(['jquery', 'bootstrap/dropdown'], function($) {
	window.Orchard = window.Orchard || {};
	$(function() {
		if( window.Orchard.jsMain ) {
			require(["app/" + window.Orchard.jsMain]);
		}
	});
});
