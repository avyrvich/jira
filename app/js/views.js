//-------------------------------------------------------
//-- Views

var FilterView = Backbone.View.extend({
	getKeyByNode: function(node) {
		return $(node).parents('[jira-key]').attr('jira-key');
	},
	events: {
		'click .comment-issue': function(evt) {
			new IssueEditView({
				options: {
						title: 'Post Comment',
						button: 'Post Comment',
						fields: {
							log: false,
							comment: true,
							resolution: false,
							assignee: false
						}
				},
				model: this.model.issues.findWhere({
					'key': this.getKeyByNode(evt.target)
				})
			});
		},
		'click .resolve-issue': function(evt) {
			new IssueEditView({
				options: {
						title: 'Resolve Issue',
						button: 'Resolve',
						resolution: 1,
						fields: {
							log: false,
							comment: true,
							resolution: true,
							assignee: false
						}
				},
				model: this.model.issues.findWhere({
					'key': this.getKeyByNode(evt.target)
				})
			});
		},
		'click .assign-issue': function(evt) {
			new IssueEditView({
				options: {
						title: 'Change Assignee',
						button: 'Assign',
						fields: {
							log: false,
							comment: true,
							resolution: false,
							assignee: true
						}
				},
				model: this.model.issues.findWhere({
					'key': this.getKeyByNode(evt.target)
				})
			});
		},
		'click .log-issue': function(evt) {
			new IssueEditView({
				options: {
					title: 'Log Issue',
					button: 'Log Work',
					fields: {
						log: true,
						comment: true,
						resolution: true,
						assignee: true
					}
				},
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
		},
		'click .filter-update': function() {
			this.model.update();
		},
		'click .filter-edit': function() {
			new FilterEditView({
				model: this.model
			});
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
		var this_ = this;
		this.$el
			.attr('id', 'tab-filter-' + this.model['cid'])
			.addClass('tab-pane')
			.appendTo('.tab-content');

		function onUpdated() {
			this_.render();
		}
		function onRemoved() {
			this_.remove();		
		}

		this.listenTo(this.model, {
			'change:type': onUpdated,
			'updated': onUpdated,
			'remove': onRemoved
		});

		if (this.model.issues) {
			onUpdated();
		}
	},
	render: function() {
		this.$el.html(templates.filterButtonSet());
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
		this.$el.append(
			$('<div />').fullCalendar({
				'defaultView': 'agendaWeek',
				'header': 'agendaWeek,month today prev,next',
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
			})
		);
	}
});


var FilterEditView = Backbone.View.extend({
	'events': {
		'click .filter-save': 'save',
		'click .filter-create': 'create',
		'change #favouriteFilters': function(evt) {
			var node = evt.target.options[evt.target.selectedIndex];
			if (node.getAttribute('data-jql')) {
				this.$el.find('#filterName').val(node.getAttribute('data-name'));
				this.$el.find('#filterJQL').val(node.getAttribute('data-jql'));
			}
		}
	},
	initialize: function() {
		var this_ = this;
		app.server.api.getFavouriteFilters(function(filters) {
			this_.setElement(
				$(templates.dlgEditFilter({
					filter: this_.model ? this_.model.toJSON() : null,
					favouriteFilters: filters
				})).appendTo('body').modal('show').on('hidden.bs.modal', function() {
					this_.remove();
				})
			)
		})
	},
	getValues: function() {
		return {
			'name': this.$el.find('#filterName').val(),
			'jql': this.$el.find('#filterJQL').val(),
			'type': parseInt(this.$el.find('#filterType').val())
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
			})).insertBefore('.navbar-filters > li:last-child')
		);
		if (app.server.filters.models[0] === this.model) {
			this.$el.find('[data-toggle="tab"]').tab('show');
		}
		this.listenTo(this.model, {
			'updated': function(){
				this.$el.find('.badge').text(this.model.issues.length);
			}, 
			'change:name': function() {
				this.$el.find('.title').text(this.model.get('name'));
			},
			'remove': function() {
				this.remove();
			}
		});
	}
});


var IssueEditView = Backbone.View.extend({
	users: null,
	events: {
		'click button.btn-primary': 'apply'
	},
	initialize: function(param) {
		var this_ = this;
		this_.options = param.options;
		$.when(
			this_.options.fields.assignee ? this_.model.getAssignableUsers(function(users) {
				this_.users = users;
			}) : null,
			this_.options.fields.resolution ? this_.model.getTransitions(function(transitions) {
				this_.transitions = transitions;
			}) : null
		).then(function() {
			this_.render();
		});
	},
	render: function() {
		var this_ = this;
		this_.setElement(
			$(templates.dlgEditIssue({
				title: this_.options.title,
				button: this_.options.button,
				fields: this_.options.fields,
				resolution: this_.options.resolution,
				resolutions: app.server.api.resolutions,
				assignee: this_.model.get('assignee'),
				users: this_.users
			})).appendTo('body')
		);
		if (this_.options.fields.log) {
			if (this_.model.get('started')) {
				var timespent = moment(this_.model.get('started')).fromNow();
				this_.$el.find('#issueTimeSpent').val(timespent);
			}
			this_.$el.find('#issueDate').get(0).valueAsDate = new Date();
		}

		if (this_.options.fields.assignee) {
			this_.$el.find('#issueAssignee').select2();
		}

		this_.$el.modal('show').on('hidden.bs.modal', function() {
			this_.remove();
		});

	},
	apply: function() {
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
		if (data.assignee) {
			this.model.assign(data.assignee);
		}
		if (data.resolution) {
			this.model.resolve(data.resolution);
		}
		if (data.comment) {
			this.model.comment(data.comment);
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
			$('.jumbotron').hide();
			$('#dropdown-filters').removeClass('hide');
			$('#dlg-connect').modal('hide');
			$('#navbar').removeClass('disconnected').addClass('connected');
		}

		this.listenTo(app.server, {
			'login-error': loginError,
			'connection-error': connectionError,
			'connected': onConnected
		});

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