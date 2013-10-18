define(function(require) {
	var core = require('core');

	var ItemView = core.Marionette.ItemView.extend({
		tagName: 'tr',
		template: require('hbs!templates/admin/userListItem'),
		mixins: [
			require('lib/mixins/stickit-view')
		],
		bindings: {
			'.display-name': 'displayName',
			'.email': 'email'
		}
	});

	return core.Marionette.CollectionView.extend({
		itemView: ItemView
	});
});