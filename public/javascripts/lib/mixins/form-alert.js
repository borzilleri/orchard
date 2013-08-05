define(function(require) {
	var Marionette = require('backbone.marionette');
	var Backbone = require('backbone');
	var Alert = require('app/views/Alert');
	require('bootstrap/alert');
	var _ = require('underscore');

	/**
	 * Show errors event
	 *
	 * @event View#alert:show
	 * @type {object}
	 * @property {string} title - Title of alert
	 * @property {string} message - Message of alert
	 * @property {string} [type] - Map of fieldnames to error string(s)
	 */
	return {
		initialize: function(options) {
			options = _.defaults({}, options, { alertRegion: '.alert-region' });
			this._alertRegion = new Marionette.Region({
				el: options.alertRegion
			});
			this.on('alert:show', this.showAlert, this);
		},
		showAlert: function(title, message, type) {
			var options = {
				model: new Backbone.Model({
					title: title,
					message: message
				})
			};
			if( type ) {
				options.type = type;
			}
			this._alertRegion.show(new Alert(options));
		}
	};
});