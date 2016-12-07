
//-------------------------------------------------------
//-- NavBar View

var NavBarBtnView = Backbone.View.extend({
	events: {
		'click a.filter-show': function (e) {
			$(e.target.getAttribute('href')).fullCalendar('render');
		},
		'click .filter-update': function() {
			this.model.issues.fetch();
		},
		'click .filter-edit': function() {
			new FilterEditView({
				model: this.model
			}).render();
		},
		'click .filter-edit-view': function(evt) {
			this.model.set('type', parseInt(evt.target.getAttribute('data-type')));
		},
		'click .filter-delete': function() {
			var this_ = this;
			$(templates.dlgConfirm({
				'title': 'Delete filter',
				'message': 'Are you sure you want to delete this filter?'
			})).modal('show').find('.btn-primary').click(function() {
				app.server.filters.remove(this_.model);
			});
		}
	},
	initialize: function() {
		this.listenTo(this.model, {
			'issues-sync': function(){
				this.$el.find('.badge').text(this.model.issues.length);
			}, 
			'change:name': function() {
				this.$el.find('.title').text(this.model.get('name'));
			},
			'remove': function() {
				this.remove();
			}
		});
		this.render();
	},
	render: function() {
		this.setElement(
			$(templates.filterButton({
				'cid': this.model['cid'],
				'name': this.model.get('name'),
				'count': this.model.issues.length
			})).appendTo('.navbar-filters')
		);
		return this.$el;
	}
});


var NavBarView = Backbone.View.extend({
	el: 'body',
	selectedFilter: null,
	filters: [],
	buttons: [],
	events: {
		'click .filter-create': function() {
			new FilterEditView().render();
		},
		'click .server-settings': function() {
			new LoginView({
				model: app.server
			}).render();
		}
	},
	'unload': function() {
		$.each(this.filters, function(i, filter) {
			filter.remove();
		});
		$.each(this.buttons, function(i, button) {
			button.remove();
		});
		this.remove();
	},
	'connect': function(e) {
		//console.log($('#dlg-connect').modal('show'));
	},
	initialize: function() {
		this.listenTo(app.server, 'change:token', this.render);
		this.listenTo(app.server.filters, {
			'add': this.renderFilter
		});
		this.render();
	},
	renderFilter: function(filter) {
		this.filters.push(new FilterView({
			'model': filter
		}));
		this.buttons.push(new NavBarBtnView({
			'model': filter
		}));
	},
	'render': function() {
		var this_ = this;
		if (app.server.has('token')) {
			this.$('.tab-content').empty();
			app.server.filters.each(function(filter, i) {
				this_.renderFilter(filter);
				if (i === 0) {
					this_.buttons[0].$el.find('[data-toggle="tab"]').tab('show');
				}
			});

		} else {
			this.$('.tab-content').html(templates.jumbotron())
		}
	}
});

