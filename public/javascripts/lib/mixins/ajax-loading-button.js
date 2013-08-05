define(function (require) {
	require('bootstrap/button');

	return {
		ui: {
			'_ajaxLoadingButton': '[data-loading-text]'
		},
		modelEvents: {
			'request': '_onAjaxLoadingButtonStart',
			'sync': '_onAjaxLoadingButtonStop',
			'error': '_onAjaxLoadingButtonStop'
		},
		_onAjaxLoadingButtonStart: function() {
			this.ui._ajaxLoadingButton.button('loading');
		},
		_onAjaxLoadingButtonStop: function() {
			this.ui._ajaxLoadingButton.button('reset');
		}
	};
});