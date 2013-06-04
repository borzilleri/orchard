define(function(require) {
	var Marionette = require('backbone.marionette');
	var marked = require('marked');
	var ace = require("ace/ace");
	require('bootstrap/tab');
	require('backbone.stickit');

	return Marionette.ItemView.extend({
		template: '#create-thread-template',
		tagName: 'form',
		id: 'create-thread-form',
		editor: null,
		ui: {
			editor: '#editor-pane',
			preview: '#preview-pane'
		},
		events: {
			'shown .show-editor': 'onTabShow',
			'click .post-submit': 'onSubmit'
		},
		initialize: function() {
			this.on('close', this.unstickit);
		},
		onRender: function() {
			var self = this;
			this.editor = ace.edit(this.ui.editor.get(0));
			this.editor.getSession().setMode("ace/mode/markdown");
			this.editor.getSession().setUseWrapMode(true);
			this.editor.getSession().setTabSize(2);
			this.editor.renderer.setShowGutter(false);
			this.editor.setFontSize(16);

			this.editor.getSession().on('change', function(e) {
				self.ui.preview.html(marked(self.editor.getValue()));
			});

			this.editor.focus();

			this.stickit();
		},
		onTabShow: function(event) {
				this.editor.focus();
		},
		onSubmit: function(event) {
			event.preventDefault();
			console.log('submit form');
		}
	});
});