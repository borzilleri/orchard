define(function (require) {
	require('backbone.stickit');

	return {
		initialize: function () {
			this.on('close', function() { this.unstickit(); }, this);
			this.on('render', function() { this.stickit(); }, this);
		}
	};
});