define(function(require) {
	require('bootstrap/alert');
	var _ = require('underscore');
	var Cocktail = require('Cocktail');
	var Marionette = require('backbone.marionette');
	var StickitMixin = require('lib/mixins/stickit-view');

	var View = Marionette.ItemView.extend({
		template: _.template('<h4 class="alert-title"></h4><div class="alert-message"></div>'),
		bindings: {
			'.alert-title': 'title',
			'.alert-message': 'message'
		},
		events: {
			'closed': 'close'
		},
		className: function() {
			var className = 'alert fade';
			if( this.options.type ) {
				className += ' alert-' + this.options.type;
			}
			return className;
		},
		initialize: function(options) {
			_(this).bindAll('onShow','closeAlert');
			this.$el.alert();
		},
		onShow: function() {
			this.$el.addClass('in');
			setTimeout(this.closeAlert, 3000);
		},
		closeAlert: function() {
			this.$el.alert('close');
		}
	});

	Cocktail.mixin(View, StickitMixin);
	return View;
});