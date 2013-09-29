define(function(require) {
	var core = require('core');
	var _ = core._;
	var AlertView = require('app/views/Alert');

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
			this._alertRegion = new core.Marionette.Region({
				el: options.alertRegion
			});
			this.on('alert:show', this.showAlert, this);
		},
		showAlert: function(title, message, type) {
			var options = {
				model: new core.Backbone.Model({
					title: title,
					message: message
				})
			};
			if( type ) {
				options.type = type;
			}
			this._alertRegion.show(new AlertView(options));
		}
	};
});