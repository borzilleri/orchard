define(function(require) {
	var core = require('core');
	var $ = core.$;
	var _ = core._;
	var Stickit = core.Stickit;
	var CM = require('codemirror-md');

	if( !$('link[href*="codemirror.css"]', 'head').length ) {
		//Creates link element
		var css = document.createElement('link');
		css.setAttribute('rel', 'stylesheet');
		css.setAttribute('type', 'text/css');
		css.setAttribute('href', '/assets/stylesheets/codemirror.css');

		//Appends stylesheet
		document.getElementsByTagName('head')[0].appendChild(css);
	}

	Stickit.addHandler({
		selector: '.codemirror',
		initialize: function($el, model, options) {
			var cmOptions = _.extend({
				mode: 'text/css',
				height: '500px',
				lineNumbers: true
			}, options.codemirror);

			var editor = CM.fromTextArea($el.get(0), cmOptions);
			var refreshEditor = function() {
				editor.refresh();
			};
			var onChange = function() {
				editor.save();
				$el.change();
			};
			this.listenTo(editor, 'change', onChange);
			this.listenTo(model, 'codemirror:refresh', refreshEditor);
		}
	});
});