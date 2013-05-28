require.config({
	baseUrl: '/assets/javascripts/vendor',
	paths: {
		underscore: 'lodash',
		app: '../app',
		lib: '../lib'
	}
});

// Start loading the main app file. Put all of
// your application logic in there.
require(['jquery', 'bootstrap/dropdown', function($) {
	window.Orchard = window.Orchard || {};
	$(function() {
		require(["app/" + (window.Orchard.jsMain || "main")]);
	});
}]);
