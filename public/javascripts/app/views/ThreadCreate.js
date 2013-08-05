define(function(require) {
	require('bootstrap/button');
	var Marionette = require('backbone.marionette');
	var marked = require('marked');
	var ace = require("ace/ace");
	var Cocktail = require('Cocktail');
	var FormErrorsMixin = require('lib/mixins/form-errors');
	var FormAlertMixin = require('lib/mixins/form-alert');
	var StickitMixin = require('lib/mixins/stickit-view');
	var LoadingButtonMixin = require('lib/mixins/ajax-loading-button');

	require('bootstrap/tab');
	require('backbone.stickit');

	marked.setOptions({
		gfm: true,
		tables: false,
		breaks: true,
		sanitize: true,
		smartLists: true,
		smartypants: true
	});

	var view = Marionette.ItemView.extend({
		template: '#create-thread-template',
		tagName: 'form',
		className: 'well',
		id: 'create-thread-form',
		editor: null,
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
			_(this).bindAll('onEditorChange', 'onSaveSuccess', 'onSaveFail',
				'onSaveComplete');
			this.on('close', this.unstickit);
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
			this.stickit();
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
			// We should redirect here.
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
	Cocktail.mixin(view, StickitMixin, LoadingButtonMixin, FormAlertMixin, FormErrorsMixin);

	return view;
});