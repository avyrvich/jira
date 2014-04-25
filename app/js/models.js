
//-------------------------------------------------------
//-- Models

var Issue = Backbone.Model.extend({
	initialize: function(issue) {
		var this_ = this;
		this.set({
			'key': issue['key'],
			'duedate': new Date(issue['fields']['duedate']),
			'estimate': parseInt(issue['fields']['timetracking']['originalEstimateSeconds']),
			'project': {
				'name': issue['fields']['project']['name'],
				'iconUrl': issue['fields']['project']['avatarUrls']['16x16']
			},
			'summary': issue['fields']['summary'],
			'assignee': issue['fields']['assignee'],
			'reporter': issue['fields']['reporter'],
			'issuetype': issue['fields']['issuetype'],
			'priority': issue['fields']['priority'],
			'status': issue['fields']['status'],
			'progress': issue['fields']['progress'],
			'url': issue['self'].replace(/\/rest\/api\/2\/issue\/.*/, '/browse/' + issue['key'])
		});

		chrome.storage.local.get(issue['key'], function(storedAttributes) {
			if (storedAttributes) {
				this_.set(storedAttributes);
			}
		});

		this.on({
			'change:assignee': function(user) {
				app.server.api.updateIssue(this.get('self'), {
					'assignee': user
				}, function(issue) {
					this_.set({
						'assignee': issue['fields']['assignee']
					});
				});
			},
			'change:duedate': function(e) {
				app.server.api.updateIssue(this.get('self'), {
					'duedate': moment(e.start).format('YYYY-MM-DD')
				}, function(issue) {
					this_.set({
						'duedate': new Date(issue['fields']['duedate'])
					});
				});
			},
			'change:estiamte': function(e) {
				app.server.api.updateIssue(this.get('self'), {
					'timetracking': {
						'originalEstimateSeconds': (e.end - e.start)/1000
					}
				}, function(issue) {
					this_.set({
						'estimate': parseInt(issue['fields']['timetracking']['originalEstimateSeconds'])
					});
				});
			},
			'change:progress': function(started) {
				if (started) {
					this.set({'started': new Date()});
					var obj = {};
					obj[this.get('key')] = {
						'started': new Date()
					};
					chrome.storage.local.set(obj);
				} else {
					this.unset('started');
					chrome.storage.local.remove(this.get('key'));
				}
			}
		});
	},
	worklog: function(data) {
		app.server.api.worklog(this.get('self'), data);
	},
	comment: function(data) {
		app.server.api.comment(this.get('self'), data);
	}
});

var Issues = Backbone.Collection.extend({
	'model': Issue
});

var Filter = Backbone.Model.extend({
	UPDATE_INTERVAL: 1*60000, // 1min
	timeout: null,
	'issues': new Issues(),
	'initialize': function(filter) {
		var this_ = this;

		this.on('change', function() {
			this.update();
		});

		this.set({
			'name': filter['name'],
			'jql': filter['jql'],
			'type': filter['type'] || app.FILTER_TYPE_TABLE
		});
		this.update();
		this.collection.trigger('created', this);
		this.timeout = window.setInterval(function() {
			this_.update();
		}, this.UPDATE_INTERVAL);
	},
	'update': function() {
		var this_ = this;
		this.collection.server.api.executeJQL(this.get('jql'), function(issues) {
			this_['issues'] = new Issues(issues);
			this_['issues'].on('change', function() {
				this_.trigger('updated', this_);
			})
			this_.trigger('updated', this_);
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
		var this_ = this;
		console.log(cmd);
		if (cmd === 'create') {
			this.set('filters', this.filters.toJSON());
			chrome.storage.local.set({
				'server': this_.attributes
			});
		} else if (cmd === 'read') {
			chrome.storage.local.get('server', function(data) {
				this_.set(data['server']);
				this_.trigger('load');
			});
		}
	},
	initialize: function() {
		this.filters.server = this;
		this.on('connected', function() {
			console.log(this.get('filters'));
			this.filters.add(this.get('filters'));
		});

		this.on('load', function() {
			var this_ = this;
			if (this.get('url') && this.get('token')) {
				var api = new JIRA(this.get('url'), this.get('url'));
				api.checkAuthorization(function(res, msg) {
					if (res) {
						this_.api = api;
						this_.trigger('connected');
					} else {
						this_.trigger('disconnected');
						if (msg) {
							this_.trigger('connection-error', msg);
						}
					}
				});
			} else {
				this.trigger('disconnected');
			}
		});

		this.on('login', function(e) {
			var this_ = this;
			var api = new JIRA(e.url);
			api.login(e.username, e.password, function(res, data){
				if (res) {
					this_.set({
						'url': e.url,
						'token': data,
						'username': e.username,
						'filters': this.get('filters') || app.FILTERS_DEFAULT
					});
					this_.save();
					this_.api = api;
					this_.trigger('connected');
				} else {
					app.server.trigger('login-error', data)
				}
			})
		});

		this.listenTo(this.filters, 'all', function(e) {
			if (e == 'add' || e == 'remove' || e == 'change') {
				this.save();
			}
		});
		
		this.fetch();
	}
});