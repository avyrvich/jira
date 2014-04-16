//-------------------------------------------------------
//-- Views

var CalendarView = Backbone.View.extend({
	'render': function() {
		var view = this;
		document.body.appendChild(this.el);
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
					'content': event.issue.get('summary') + '<br />' + 'Estimate: ' + moment.duration(event.issue.get('estimate'), 's').humanize(),
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
			$('body').append(templates.errorMessage({
				'message': message
			}));
		});
		this.listenTo(app.server, 'connected', function() {
			$('#dropdown-filters').removeClass('hide');
			$('#dlgConnect').modal('hide');
		});

		//-------------------------------
		//-- Listen to filters events

		this.listenTo(app.server.filters, 'created', function(filter) {
			$('.navbar-nav').append(templates.filterButton({
				'cid': filter['cid'],
				'name': filter.get('name'),
				'count': ''
			}));
		});
		this.listenTo(app.server.filters, 'udpated', function(filter) {
			filter.view.render();
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
			$('#dlgConnect #url').val(app.server.get('url'));
			$('#dlgConnect #username').val(app.server.get('username'))
		});
		$('#dlgConnect').on('hide.bs.modal', function() {
			$('#dlgConnect .alert').addClass('hidden').text('');
		});
	}
});