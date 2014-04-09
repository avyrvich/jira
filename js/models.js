
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
			app.server.api.updateIssue(this.get('url'), {
				'duedate': moment(e.start).format('YYYY-MM-DD')
			});
		});

		this.on('changeEstiamte', function(e) {
			app.server.api.updateIssue(this.get('url'), {
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
		this.collection.server.api.executeJQL(jql, function(issues) {
			self['issues'] = new Issues(issues);
			self.trigger('ready', self);
		});
	}
});

var Filters = Backbone.Collection.extend({ 
    model: Filter
});


var ServerModel = Backbone.Model.extend({
	filters: new Filters,
	api: null,
	sync: function(cmd, server){
		if (cmd === 'create') {
			localStorage.setItem('url', server.get('url'));
			localStorage.setItem('token', server.get('token'));
			localStorage.setItem('username', server.get('username'));
		} else if (cmd === 'read') {
			server.set({
				'url': localStorage.getItem('url'),
				'token': localStorage.getItem('token'),
				'username': localStorage.getItem('username')
			});
		}
	},
	initialize: function() {
		this.filters.server = this;
		this.filters.on('ready', function(filter) {
			console.log('ready', filter);
			filter.view.render();
		});
	
		this.on('connected', function() {
			this.filters.add(['assignee = currentUser() AND resolution = Unresolved ORDER BY dueDate ASC']);
		});

		this.on('login', function(e) {
			var self = this;
			var api = new JIRA(e.url);
			api.login(e.username, e.password, function(res, data){
				if (res) {

					self.set({
						'url': e.url,
						'token': data,
						'username': e.username
					});

					self.save();
					self.api = api;
					self.trigger('connected');
				} else {
					app.server.trigger('login-error', data)
				}
			})
		});
	},
	load: function() {
		this.fetch();
		if (this.get('url') && this.get('token')) {
			this.api = new JIRA(this.get('url'), this.get('url'));
			this.trigger('connected');
		} else {
			this.trigger('disconnected');
		}
	}
});