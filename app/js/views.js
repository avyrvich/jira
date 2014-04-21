//-------------------------------------------------------
//-- Views

var FilterView = Backbone.View.extend({
	initialize: function() {
		var this_ = this;
		this.$el
			.attr('id', 'tab-filter-' + this.model['cid'])
			.addClass('tab-pane')
			.appendTo('.tab-content');
		this.model.on('updated', function() {
			this_.render();
		});
	},
	getKeyByNode: function(node) {
		return $(node).parents('[jira-key]').attr('jira-key');
	},
	events: {
		'click .log-issue': function(evt) {
			app.server.api.getAssignableUsers(this.getKeyByNode(evt.target), function(users) {
				var dlg = $(templates.dlgLogIssue({
					'resolutions': app.server.api.resolutions,
					'users': users
				})).appendTo('body');
				dlg.find('#issueAssignee').select2();
				dlg.find('#issueDate').get(0).valueAsDate = new Date();
				dlg.modal('show');
			});
		},'click .start-progress': function(evt) {
			this.model.issues.findWhere({
				'key': this.getKeyByNode(evt.target)
			}).trigger('startProgress');
		},
	},
	render: function() {
		this.$el.empty();
		if (this.model.get('type') === app.FILTER_TYPE_CALENDAR) {
			this.renderCalendar();
		} else {
			this.renderTable();
		}
		$('img[data-toggle="tooltip"]').tooltip();
	},
	renderTable: function() {
		var $tbody = this.$el.append(templates.filterTable()).find('tbody');
		$.each(this.model.issues.models, function(i, issue) {
			$tbody.append(templates.filterTableRow(
				$.extend(issue.attributes,  {
					'estimate': issue.get('estimate') ? moment.duration(issue.get('estimate'), 's').humanize() : '',
					'duedate': issue.get('duedate') ? moment(issue.get('duedate')).format('l') : ''
				})
			));
		});
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
				event.issue.trigger('changeDueDate', event);
			},
			eventResize: function(event, delta) {
				event.issue.trigger('changeEstiamte', event);
			}
		});
	}
});


//-------------------------------------------------------
//-- NavBar View

var NavBarView = Backbone.View.extend({
	events: {
		'click .btn.connect': 'connect'
	},
	'connect': function(e) {
		//console.log($('#dlgConnect').modal('show'));
	},
	'initialize': function() {
		//-------------------------------
		//-- Listen to server events

		this.listenTo(app.server, 'login-error', function(message) {
			$('#dlgConnect .alertsArea').empty().append(templates.errorMessage({
				'message': message
			}));
		});
		this.listenTo(app.server, 'connection-error', function(message) {
			$('body').append(
				templates.errorMessage({
					message: message,
					buttons: ['<button type="button" class="btn btn-default" data-toggle="modal" data-target="#dlgConnect">Reconnect</button>']
				})
			);
		});
		this.listenTo(app.server, 'connected', function() {
			$('#dropdown-filters').removeClass('hide');
			$('#dlgConnect').modal('hide');
		});

		//-------------------------------
		//-- Listen to filters events

		this.listenTo(app.server.filters, 'created', function(filter) {
			var tabBtn = $(templates.filterButton({
				'cid': filter['cid'],
				'name': filter.get('name'),
				'count': '',
				'class': filter['cid']===app.server.get('active')?'active':''
			})).appendTo('.nav');


			tabBtn.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			  $(e.target.getAttribute('href')).fullCalendar('render');
			});

			tabBtn.find('a[data-target="#dlgFilterEdit"]').click(function() {
				var dlg = $("#dlgFilterEdit");
				dlg.find('#filterName').val(filter.get('name'));
				dlg.find('#filterJQL').val(filter.get('jql'));
				dlg.find('#filterType').val(filter.get('type'));
			});
		});
		this.listenTo(app.server.filters, 'updated', function(filter) {
			$('#btn-filter-' + filter['cid']).find('.badge').text(filter.issues.length);
		});



		$('#dlgConnect .btn-primary').click(function() {
			app.server.trigger('login', {
				'url': $('#dlgConnect #url').val(),
				'username': $('#dlgConnect #username').val(),
				'password': $('#dlgConnect #password').val()
			});
		});

		$('#dlgConnect').on('show.bs.modal', function() {
			$('.alert').remove();
			$('#dlgConnect #url').val(app.server.get('url'));
			$('#dlgConnect #username').val(app.server.get('username'))
		});
		$('#dlgConnect').on('hide.bs.modal', function() {
			$('#dlgConnect .alert').addClass('hidden').text('');
		});
	}
});