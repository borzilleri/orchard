define(function(require) {
	require('bootstrap/button');
	require('bootstrap/tab');
	var core = require('core');

	// Deprecated, probably.
	var marked = require('marked');
	var ace = require("ace/ace");

	marked.setOptions({
		gfm: true,
		tables: false,
		breaks: true,
		sanitize: true,
		smartLists: true,
		smartypants: true
	});

	return core.Marionette.ItemView.extend({
		template: '#create-thread-template',
		tagName: 'form',
		className: 'well',
		id: 'create-thread-form',
		editor: null,
		model: null,
		mixins: [
			require('lib/mixins/stickit-view'),
			require('lib/mixins/form-errors'),
			require('lib/mixins/form-alert'),
			require('lib/mixins/ajax-loading-button')
		],
		ui: {
			editor: '#editor-pane',
			preview: '#preview-pane',
			save: '.post-submit',
			alert: '.alert'
		},
		events: {
			'shown .show-editor': 'onTabShow',
			'click .post-submit': 'onSave'
		},
		bindings: {
			'[name="title"]': 'title'
		},
		initialize: function() {
			_(this).bindAll('onEditorChange', 'onSaveSuccess', 'onSaveFail');
		},
		onRender: function() {
			this.editor = ace.edit(this.ui.editor.get(0));
			this.editor.setFontSize(16);
			this.editor.renderer.setShowGutter(false);
			this.editor.getSession().setMode("ace/mode/markdown");
			this.editor.getSession().setUseWrapMode(true);
			this.editor.getSession().setTabSize(2);
			this.editor.getSession().on('change', this.onEditorChange);

			this.editor.focus();
		},
		onEditorChange: function(event) {
			this.model.set('contentSource', this.editor.getValue());
			this.ui.preview.html(marked(this.editor.getValue()));
		},
		onTabShow: function(event) {
			this.editor.focus();
		},
		onSave: function(event) {
			event.preventDefault();
			this.trigger('errors:clear');
			this.model.save()
				.done(this.onSaveSuccess)
				.fail(this.onSaveFail);
		},
		onSaveSuccess: function() {
			this.trigger('alert:show', 'Success', 'Thread created.', 'success');
			window.location.replace(this.model.get('url'));
		},
		onSaveFail: function(xhr) {
			var errors;
			try {
				errors = $.parseJSON(xhr.responseText);
			}
			catch( err ) {
				return;
			}
			if( !errors ) {
				return;
			}
			this.trigger('errors:show', errors);
			this.trigger('alert:show', 'Error', 'An error occurred saving the thread.', 'error');
		}
	});
});