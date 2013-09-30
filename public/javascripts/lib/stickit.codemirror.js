define(function(require) {
	var core = require('core');
	var $ = core.$;
	var _ = core._;
	var Stickit = core.Stickit;
	var CM = require('codemirror-md');
	require('codemirror/addon/display/fullscreen');
	require('codemirror/addon/display/placeholder');

	var loadCSS = function(cssFile) {
		if( !$('link[href*="' + cssFile + '"]', 'head').length ) {
			//Creates link element
			var css = document.createElement('link');
			css.setAttribute('rel', 'stylesheet');
			css.setAttribute('type', 'text/css');
			css.setAttribute('href', '/assets/stylesheets/' + cssFile);
			//Appends stylesheet
			document.getElementsByTagName('head')[0].appendChild(css);
		}
	}

	loadCSS('codemirror/codemirror.css');
	loadCSS('codemirror/fullscreen.css');

	Stickit.addHandler({
		selector: '.codemirror',
		initialize: function($el, model, options) {
			var cmOptions = _.extend({
				mode: 'markdown',
				tabSize: 2,
				indentWithTabs: true,
				placeholder: '',
				extraKeys: {
					F11: function(cm) {
						cm.setOption("fullScreen", !cm.getOption("fullScreen"));
					},
					Esc: function(cm) {
						if( cm.getOption("fullScreen") ) cm.setOption("fullScreen", false);
					}
				},
				width: "100%",
				height: null,
				theme: 'solarized'
			}, options.codemirror);

			loadCSS('codemirror/theme/' + cmOptions.theme + '.css');
			var editor = CM.fromTextArea($el.get(0), cmOptions);
			editor.setSize(cmOptions.width, cmOptions.height);

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