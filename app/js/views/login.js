
window.LoginView = Backbone.View.extend({
	template: templates.dlgLogin,
	events: {
		'click .btn-primary': 'login'
	},
	login: function() {
		this.$el.addClass('modal-loader');
		app.server.login({
			'url': this.$('#url').val(),
			'username': this.$('#username').val(),
			'password': this.$('#password').val()
		}).then(() => {
			this.$('.alertsArea').empty().append(templates.alert({
				class: 'alert-info',
				message: 'Connected'
			}));
		}, (e) => {
			this.$('.alertsArea').empty().append(templates.alert({
				class: 'alert-danger',
				title: 'Connection error',
				message: e.responseJSON && e.responseJSON.errorMessages ? e.responseJSON.errorMessages.join('; ') : e.statusText
			}));
		}).always(() => {
			this.$el.removeClass('modal-loader');
		});
	},
	render: function() {
		this.setElement($(this.template(this.model.toJSON())).appendTo('body'));
		return this.el;
	}
});