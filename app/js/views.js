//-------------------------------------------------------
//-- Views

var FilterView = Backbone.View.extend({
	initialize: function() {
		var this_ = this;
		this.$el
			.attr('id', 'tab-filter-' + this.model['cid'])
			.addClass('tab-pane')
			.appendTo('.tab-content');

		function onUpdated() {
			if (this_.$el.is('.fc') && this_.model.get('type') === app.FILTER_TYPE_CALENDAR) {
				this_.$el.fullCalendar('render')
			} else {
				this_.render();
			}			
		}
		function onRemoved() {
			this_.remove();		
		}

		this.listenTo(this.model, {
			'updated': onUpdated,
			'remove': onRemoved
		});

		if (this.model.issues) {
			onUpdated();
		}
	},
	getKeyByNode: function(node) {
		return $(node).parents('[jira-key]').attr('jira-key');
	},
	events: {
		'click .log-issue': function(evt) {
			new IssueLogView({
				model: this.model.issues.findWhere({
					'key': this.getKeyByNode(evt.target)
				})
			});
		},
		'click .start-progress': function(evt) {
			this.model.issues.findWhere({
				'key': this.getKeyByNode(evt.target)
			}).trigger('change:progress', true);
		},
		'click .stop-progress': function(evt) {
			this.model.issues.findWhere({
				'key': this.getKeyByNode(evt.target)
			}).trigger('change:progress', false);
		}
	},
	render: function() {
		this.$el.empty();
		if (this.model.get('type') === app.FILTER_TYPE_CALENDAR) {
			this.renderCalendar();
		} else {
			this.renderTable();
		}
		$('[data-toggle="tooltip"]').tooltip();
	},
	renderTable: function() {
		var $tbody = this.$el.append(templates.filterTable()).find('tbody');
		$.each(this.model.issues.models, function(i, issue) {
			$tbody.append(templates.filterTableRow(
				$.extend({}, issue.attributes,  {
					'estimate': issue.get('estimate') ? moment.duration(issue.get('estimate'), 's').humanize() : '',
					'duedate': issue.get('duedate') ? moment(issue.get('duedate')).format('l') : ''
				})
			));
		});
		$('img[csp-src]').downloadImageContent();
	},
	renderCalendar: function() {
		var view = this;
		this.$el.fullCalendar({
			'defaultView': 'agendaWeek',
			'header': {
				left: 'agendaWeek,month',
				center: '',
				right: 'today prev,next'
			},
			'allDaySlot': false,
			'editable': true,
			'events': this.model.issues.map(function(issue, index, issues) {
				if (issue.get('duedate')) {
					var defaultDuration = 3600;
					var startDate = issue.get('duedate');
					var duration = (issue.get('estimate') || defaultDuration) * 1000;
					for (var i = 0; i < index; i++) {
						if (issues[i].get('duedate').getTime() === issue.get('duedate').getTime()) {
							startDate = new Date(startDate.getTime() + (issues[i].get('estimate') || defaultDuration) * 1000);
						}
					}
					return {
						'allDay': false,
						'title': issue.get('key') + ': ' + issue.get('summary'),
						'start': startDate,
						'end': new Date(startDate.getTime() + duration),
						'duration': issue.get('estimate'),
						'issue': issue
					};
				}
			}),
			'eventRender': function(event, element) {
				element.popover({
					'title': event.issue.get('key'),
					'content': templates.issuePopover({
						'summary': event.issue.get('summary'),
						'estimate': 'Estimate: ' + moment.duration(event.issue.get('estimate'), 's').humanize()
					}),
					'html': true,
					'placement': 'top',
					'trigger': 'hover'
				});
			},
			eventDrop: function(event, delta) {
				event.issue.trigger('change:duedate', event);
			},
			eventResize: function(event, delta) {
				event.issue.trigger('change:estiamte', event);
			}
		});
	}
});


var FilterEditView = Backbone.View.extend({
	'events': {
		'click .filter-save': 'save',
		'click .filter-create': 'create'
	},
	initialize: function() {
		var this_ = this;
		this.setElement(
			$(templates.dlgEditIssue( this.model ? {
				'filter': this.model.toJSON()
			} : null )).appendTo('body').modal('show').on('hidden.bs.modal', function() {
				this_.remove();
			})
		);
	},
	getValues: function() {
		return {
			'name': this.$el.find('#filterName').val(),
			'jql': this.$el.find('#filterJQL').val(),
			'type': this.$el.find('#filterType').val()
		};
	},
	save: function() {
		var attributes = this.getValues();
		if (this.model) {
			this.model.set(attributes);
		} else {
			app.server.filters.add(FilterModel(attributes));
		}
	},
	create: function() {
		var attributes = this.getValues();
		app.server.filters.add(attributes);
	}
});

//-------------------------------------------------------
//-- NavBar View

var NavBarBtnView = Backbone.View.extend({
	events: {
		'click a.filter-update': 'update',
		'click a.filter-edit': 'edit',
		'click a.filter-delete': 'delete',
		'click a.filter-show': function (e) {
			$(e.target.getAttribute('href')).fullCalendar('render');
		}
	},
	initialize: function() {
		this.setElement(
			$(templates.filterButton({
				'cid': this.model['cid'],
				'name': this.model.get('name'),
				'count': this.model.issues.length
			})).appendTo('.navbar-filters')
		);
		if (app.server.filters.models[0] === this.model) {
			this.$el.find('[data-toggle="tab"]').tab('show');
		}
		this.listenTo(this.model, {
			'updated': function(){
				this.$el.find('.badge').text(this.model.issues.length);
				this.$el.find('.title').text(this.model.get('name'));
			},
			'remove': function() {
				this.remove();
			}
		});
	},
	update: function() {
		this.model.update();
	},
	edit: function() {
		new FilterEditView({
			model: this.model
		});
	},
	delete: function() {
		var this_ = this;
		$(templates.dlgConfirm({
			'title': 'Delete filter',
			'message': 'Are you sure you want to delete this filter?'
		})).modal('show').find('.btn-primary').click(function() {
			app.server.filters.remove(this_.model);
		});
	}
});


var IssueLogView = Backbone.View.extend({
	events: {
		'click button.log-work': 'log'
	},
	initialize: function() {
		var this_ = this;
		app.server.api.getAssignableUsers(this.model.get('key'), function(users) {
			this_.setElement(
				$(templates.dlgLogIssue({
					resolutions: app.server.api.resolutions,
					users: users
				})).appendTo('body')
			);
			if (this_.model.get('started')) {
				var timespent = moment(this_.model.get('started')).fromNow();
				this_.$el.find('#issueTimeSpent').val(timespent);
			}
			this_.$el.find('#issueDate').get(0).valueAsDate = new Date();
			this_.$el.find('#issueAssignee').select2();
			this_.$el.modal('show').on('hidden.bs.modal', function() {
				this_.remove();
			});
		});
	},
	log: function() {
		var data = {
			log: this.$el.find('#issueLog').val(),
			comment: this.$el.find('#issueComment').val(),
			timeSpent: this.$el.find('#issueTimeSpent').val(),
			resolution: this.$el.find('#issueResolution').val(),
			assignee: this.$el.find('#issueAssignee').select2('val')
		};

		if (data.timeSpent) {
			this.model.worklog({
				'comment': data.log,
				'timeSpent': data.timeSpent
			});
		}
	}
});

var NavBarView = Backbone.View.extend({
	selectedFilter: null,
	filters: [],
	buttons: [],
	events: {
		'click .filter-create': function() {
			new FilterEditView();
		}
	},
	'connect': function(e) {
		//console.log($('#dlg-connect').modal('show'));
	},
	'initialize': function() {
		var this_ = this;
		//-------------------------------
		//-- Listen to server events
		function loginError(message) {
			$('#dlg-connect .alertsArea').empty().append(templates.errorMessage({
				'message': message
			}));
		}
		function connectionError(message) {
			$('body').append(
				templates.errorMessage({
					message: message,
					buttons: ['<button type="button" class="btn btn-default" data-toggle="modal" data-target="#dlg-connect">Reconnect</button>']
				})
			);
		}
		function onConnected() {
			$('#dropdown-filters').removeClass('hide');
			$('#dlg-connect').modal('hide');
			$('#navbar').removeClass('disconnected').addClass('connected');
		}
		this.listenTo(app.server, 'login-error', loginError);
		this.listenTo(app.server, 'connection-error', connectionError);
		this.listenTo(app.server, 'connected', onConnected);

		//-------------------------------
		//-- Listen to filters events

		function addFilter(filter) {
			this_.filters.push(new FilterView({
				'model': filter
			}));
			this_.buttons.push(new NavBarBtnView({
				'model': filter
			}));
		}

		this.listenTo(app.server.filters, {
			'add': addFilter
		});

		$('#dlg-connect .btn-primary').click(function() {
			app.server.trigger('login', {
				'url': $('#dlg-connect #url').val(),
				'username': $('#dlg-connect #username').val(),
				'password': $('#dlg-connect #password').val()
			});
		});

		$('#dlg-connect').on('show.bs.modal', function() {
			$('.alert').remove();
			$('#dlg-connect #url').val(app.server.get('url'));
			$('#dlg-connect #username').val(app.server.get('username'))
		});

		$('#dlg-connect').on('hide.bs.modal', function() {
			$('#dlg-connect .alert').addClass('hidden').text('');
		});

		//-- Initialization

		console.log(app.server.hasChanged());

		if (app.server.api) {
			onConnected();
			$.each(app.server.filters.models, function(i, filter) {
				addFilter(filter);
			});
		}
	}
});