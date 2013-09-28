require.config({
	baseUrl: '/assets/javascripts/vendor',
	paths: {
		'codemirror': 'codemirror/lib/codemirror',
		'codemirror-md': 'codemirror/mode/markdown/markdown',
		app: '../app',
		lib: '../lib',
		core: '../lib/core',
		templates: '../../handlebars'
	},
	packages: [
		{ name: 'hbs', location: 'require-handlebars-plugin', main: 'hbs' },
		{ name: 'backbone', location: 'backbone', main: '../../lib/backbone' },
		{ name: 'backbone.stickit', location: 'backbone', main: 'backbone.stickit' },
		{ name: 'backbone-associations', location: 'backbone', main: 'backbone-associations' },
		{ name: 'cocktail', location: 'cocktail', main: 'Cocktail' },
		{ name: 'jquery', location: 'jquery', main: 'jquery' },
		{ name: 'underscore', location: 'lodash', main: 'lodash.underscore' }
	],
	shim: {
		'codemirror-md': {
			deps: ['codemirror'],
			exports: 'CodeMirror'
		},
		"backbone/backbone": {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		"codemirror": {
			exports: "CodeMirror"
		}
	},
	hbs: {
		disableI18n: true
	}
});

require(['core', 'bootstrap/dropdown'], function(core) {
	window.Orchard = window.Orchard || {components: []};
	if( core._.isString(window.Orchard.components) ) {
		window.Orchard.components = [window.Orchard.components];
	}

	core.$(function() {
		core._(window.Orchard.components).each(function(component) {
			require(['app/' + component]);
		});
	});
});
