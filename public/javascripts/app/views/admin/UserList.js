define(function(require) {
	var core = require('core');
	var _ = core._;
	var User = require('../../models/User');

	var ItemView = core.Marionette.ItemView.extend({
		tagName: 'tr',
		template: require('hbs!templates/admin/userListItem'),
		mixins: [
			require('lib/mixins/stickit-view')
		],
		bindings: {
			'.display-name': 'displayName',
			'.email': 'email'
		},
		events: {
			'click .toggle-user': 'onToggleUser',
			'click .delete-user': 'onDeleteUser'
		},
		initialize: function() {
			_(this).bindAll('onError');
		},
		onToggleUser: function(e) {
			e.preventDefault();
		},
		onDeleteUser: function(e) {
			e.preventDefault();
			if( window.confirm('Delete User "' + this.model.get('displayName') + '"?') ) {
				this.model.destroy()
					.fail(this.onError);
			}
		},
		onError: function(xhr) {
			this.trigger('alert:show', 'An error occurred:', xhr.responseJSON.error, 'error');
		}
	});

	return core.Marionette.CompositeView.extend({
		template: require('hbs!templates/admin/userTable'),
		itemView: ItemView,
		itemViewContainer: '#user-list-view',
		itemViewOptions: {
			alertRegion: this.$('.alert-region')
		},
		mixins: [
			require('lib/mixins/form-alert')
		],
		events: {
			'submit form': 'onAddUser'
		},
		ui: {
			emailField: '[name="new-user-email"]'
		},
		initialize: function() {
			_(this).bindAll('onUserAdded', 'onError');
		},
		onAddUser: function(e) {
			e.preventDefault();
			this.model = new User.Model({
				email: this.ui.emailField.val()
			});
			this.model.save()
				.done(this.onUserAdded)
				.fail(this.onError);
		},
		onError: function(xhr) {
			this.trigger('alert:show', 'An error occurred:', xhr.responseJSON.error, 'error');
		},
		onUserAdded: function() {
			this.collection.add(this.model);
			this.ui.emailField.val('');
			this.trigger('alert:show', 'Success', 'User added.', 'success');
		}
	});
});