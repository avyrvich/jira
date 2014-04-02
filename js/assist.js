var jira = new JIRA('http://www.softomate.net/jira');


//-------------------------------------------------------
//-- Models

var Issue = Backbone.Model.extend({
	initialize: function(issue) {
		this.set({
			'key': issue['key'],
			'assignee': issue['fields']['assignee'],
			'duedate': new Date(issue['fields']['duedate']),
			'estimate': parseInt(issue['fields']['timetracking']['originalEstimateSeconds']),
			'summary': issue['fields']['summary'],
			'url': issue['self']
		});

		this.on('changeDueDate', function(e) {
			jira.updateIssue(this.get('url'), {
				'duedate': moment(e.start).format('YYYY-MM-DD')
			});
		});

		this.on('changeEstiamte', function(e) {
			jira.updateIssue(this.get('url'), {
				'timetracking': {
					'originalEstimateSeconds': (e.end - e.start)/1000
				}
			});
		});
	}
});

var Issues = Backbone.Collection.extend({
	'model': Issue
});

var Filter = Backbone.Model.extend({
	'issues': new Issues(),
	'initialize': function(jql) {
		var self = this;
		self['view'] = new CalendarView({
			'model': self
		});
		jira.executeJQL('assignee = currentUser() AND resolution = Unresolved ORDER BY dueDate ASC', function(issues) {
			self['issues'] = new Issues(issues);
			self.trigger('ready', self);
		});
	}
});

var Filters = Backbone.Collection.extend({ 
    model: Filter
});






//-------------------------------------------------------
//-- Views

var CalendarView = Backbone.View.extend({
	'tagName': 'div', 
	'render': function() {
		var view = this;
		document.body.appendChild(this.el);
		this.$el.fullCalendar({
			'defaultView': 'agendaWeek',
			'header': {
			    left:   'agendaWeek,month',
			    center: '',
			    right:  'today prev,next'
			},
			'editable': true,
        	'events': this.model.issues.map(function(issue, index, issues) {
        		if (issue.get('duedate')) {
        			var defaultDuration = 3600;
	        		var startDate = issue.get('duedate');
	        		var duration = (issue.get('estimate') || defaultDuration)*1000;
	        		for (var i = 0; i < index; i++) {
	        			if (issues[i].get('duedate').getTime() === issue.get('duedate').getTime()) {
	        				startDate = new Date(startDate.getTime() + (issues[i].get('estimate')||defaultDuration)*1000);
	        			}
	        		}
					return {
						'allDay': false,
						'title': issue.get('key') + ': ' + issue.get('summary'),
						'start': startDate,
						'end': new Date(startDate.getTime() + duration),
						'summary': issue.get('summary'),
						'duration': issue.get('estimate'),
						'issue': issue
					};	
        		}
        	}),
			'eventRender': function(event, element) {
				element.qtip({
					'content': event['summary'],
					'position': {
						'my': 'top center',
						'at': 'bottom center',
					}
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
//-- Controller


var filters = new Filters;
filters.add(['assignee=currentUser() ORDER BY duedate']);
filters.on('ready', function(filter) {
	console.log('ready', filter);
	filter.view.render();
});



// jira.executeJQL('assignee=currentUser() ORDER BY duedate', function(issues) {
// 	issues.assingedToMe = new Filter(issues);
// });
