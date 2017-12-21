
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
		'click .filter-delete': function() {
			$(templates.dlgConfirm({
				'title': 'Delete filter',
				'message': 'Are you sure you want to delete this filter?'
			})).modal('show').find('.btn-primary').click(() => {
				let collection = this.model.collection;
				collection.remove(this.model);
				collection.save();
			});
		}
	},
	initialize: function() {
		this.listenTo(this.model, {
			'issues-sync': function(){
				this.$('.badge').text(this.model.issues.length);
			}, 
			'change:name': function() {
				this.$('.title').text(this.model.get('name'));
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
			chrome.runtime.openOptionsPage();
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
		this.listenTo(this.collection, {
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
		if (this.collection.length) {
			this.$('.tab-content').empty();
			this.collection.each((filter, i) => {
				this.renderFilter(filter);
				if (i === 0) {
					this.buttons[0].$('[data-toggle="tab"]').tab('show');
				}
			});
		} else {
			this.$('.tab-content').html(templates.jumbotron())
		}
	}
});
