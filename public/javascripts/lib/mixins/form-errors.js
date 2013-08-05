define(function(require) {
	var _ = require('underscore');

	/**
	 * This provides functionality for showing and clearing per-control errors in
	 * a view that extends Backbone.View.
	 *
	 * @mixin
	 */
	/**
	 * Show errors event
	 *
	 * @event View#errors:show
	 * @type {object}
	 * @property {object} errors - Map of fieldnames to error string(s)
	 */
	/**
	 * Clear errors event
	 *
	 * @event View#errors:clear
	 * @type {object}
	 */
	return {
		ui: {
			groups: '.control-group'
		},
		initialize: function(options) {
			_(this).bindAll('displayError');
			this.on('errors:show', this.displayErrors, this);
			this.on('errors:clear', this.clearErrors, this);
		},
		displayErrors: function(errors) {
			_(errors).each(this.displayError);
		},
		displayError: function(value, key) {
			if( _.isArray(value) ) {
				value = value.join(', ');
			}
			var $group = this.ui.groups.has('[name="' + key + '"]');
			$group.find('.help-inline,.help-block').text(value);
			$group.addClass('error');
		},
		clearErrors: function() {
			this.ui.groups.removeClass('error').find('.help-inline').empty();
		}
	};
});