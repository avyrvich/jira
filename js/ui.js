var NavBarView = Backbone.View.extend({
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
						'duration': issue.get('estimate'),
						'issue': issue
					};	
        		}
        	}),
			'eventRender': function(event, element) {
				element.qtip({
					'content': event.issue.get('key') + '<br />' + event.issue.get('summary') + '<hr />' + 
						'Estimate: ' + moment.duration(event.issue.get('estimate'), 's').humanize() ,
					'style': {
        				'classes': 'qtip-tipsy qtip-shadow'
   					},
					'position': {
						'my': 'bottom center',
						'at': 'top center',
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


$(function() {
	//$('#myModal').modal('show');
});