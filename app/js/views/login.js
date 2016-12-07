
window.LoginView = Backbone.View.extend({
	template: templates.dlgLogin,
	events: {
		'hide.bs.modal': function() {
			this.remove();
		},
		'click .btn-primary': 'login'
	},
	setMessage: function(message) {
		this.$('.alertsArea').empty().append(templates.errorMessage({
			message: message
		}));
	},
	login: function() {
		this.$el.addClass('modal-loader');
		app.server.login({
			'url': this.$('#url').val(),
			'username': this.$('#username').val(),
			'password': this.$('#password').val()
		}).then(() => {
			this.$el.modal('hide');
		}, () => {
			this.setMessage('Connection error');
		}).always(() => {
			this.$el.removeClass('modal-loader');
		});
	},
	render: function() {
		this.setElement($(this.template(this.model.toJSON())).appendTo('body'));
		this.$el.modal('show');
		return this.el;
	}
});