define(function(require) {
	require("bootstrap/modal");
	require("bootstrap/tab");
	var marked = require('marked');
	var ace = require("ace/ace");

	var editor = ace.edit('create-thread-editor');
	editor.getSession().setMode("ace/mode/markdown");
	editor.renderer.setShowGutter(false);

	editor.getSession().on('change', function(e) {
		$('#create-thread-preview').html(marked(editor.getValue()));
	});

	$('a[data-toggle="tab"]').on('shown', function(e) {
		if( $(e.target).attr("href") == '#create-thread-editor' ) {
			editor.focus();
		}
	});

	var Backbone = require('backbone');
	var Marionette = require('backbone.marionette');
	var app = new Marionette.Application();
	var Thread = require('models/Thread');
	var View = require('views/Threads');

	var collection = Thread.Collection;

	app.addRegions({
		threads: '#thread-list'
	});

	app.addInitializer(function(options) {
		collection.fetch().done(function() {
			app.threads.show(new View(collection));
		})
	});

	app.start();
});