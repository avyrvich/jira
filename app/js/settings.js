var app = chrome.extension.getBackgroundPage().app;

$(function() {
  new SettingsView({
    collection: app.servers
  }).render();
});


var ServerView = Backbone.View.extend({
	template: templates.serverSettingsPanel,
	events: {
		'click .btn-save': 'save'
	},
	save: function() {
		this.$el.addClass('modal-loader');
		this.model.login({
			url: this.$('#url').val(),
			username: this.$('#username').val(),
			password: this.$('#password').val()
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
		this.setElement($(this.template(this.model.toJSON())));
		return this.el;
	}
});

var SettingsView = Backbone.View.extend({
	template: templates.serverSettingsTabs,
	render: function() {
		if (!this.collection.length) {
			this.collection.add({});
		}
		this.setElement($(this.template(this.collection.toJSON())).appendTo('body'));
		this.collection.each(server => this.$('.tab-content').append(
			new ServerView({
				model: server
			}).render()
		));
		return this.el;
	}
});