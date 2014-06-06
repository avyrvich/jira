
//-------------------------------------------------------
//-- Models

var Issue = Backbone.Model.extend({
	initialize: function(issue) {
		var this_ = this;
		this.set({
			'key': issue['key'],
			'duedate': issue['fields']['duedate'] ? new Date(issue['fields']['duedate']) : null,
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
			'change:duedate': function(e) {

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
			}
		});
	},
	changeDuedate: function(even) {
		app.server.api.updateIssue(this.get('self'), {
			'duedate': moment(even.start).format('YYYY-MM-DD')
		}, function(issue) {
			this_.set({
				'duedate': new Date(issue['fields']['duedate'])
			});
		});
	},
	changeEstimate: function(event) {
		app.server.api.updateIssue(this.get('self'), {
			'timetracking': {
				'originalEstimateSeconds': (event.end - event.start)/1000
			}
		}, function(issue) {
			this_.set({
				'estimate': parseInt(issue['fields']['timetracking']['originalEstimateSeconds'])
			});
		});
	},
	progress: function(started) {
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
		this_.collection.filter.trigger('updated');
	},
	assign: function(username) {
		var this_ = this;
		app.server.api.assign(this.get('self'), username, function(issue) {
			this_.set({
				'assignee': issue['fields']['assignee']
			});
		});
	},
	worklog: function(data) {
		app.server.api.worklog(this.get('self'), data);
	},
	comment: function(data) {
		app.server.api.comment(this.get('self'), data);
	},
	resolve: function(resolution) {
		var this_ = this;
		app.server.api.resolve(this.get('self'), resolution, function() {
			this_.collection.filter.update();
		});
	},
	getAssignableUsers: function(callback) {
		return app.server.api.getAssignableUsers(this.get('key'), callback);
	},
	getTransitions: function(callback) {
		return app.server.api.getTransitions(this.get('self'), callback);
	}
});

var Issues = Backbone.Collection.extend({
	model: Issue
});

var Filter = Backbone.Model.extend({
	UPDATE_INTERVAL: 1*60000, // 1min
	timeout: null,
	'initialize': function(filter) {
		var this_ = this;
		this_.issues = new Issues();
		this_.issues.filter = this_;
		this_.issues.on('reset', function() {
			this_.trigger('updated', this_);
			this_.updateBadge();
		});

		this.on({
			'change:jql': function() {
				this.update();
			},
			'change': function() {
				his_.trigger('updated', this_);
			}
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
		this_.collection.server.api.executeJQL(this_.get('jql'), function(issues) {
			this_.issues.reset(issues);
		});
	},
	'updateBadge': function() {
		if (chrome.browserAction && this.collection.models[0] == this) {
			chrome.browserAction.setBadgeText({
				'text': this['issues'].length.toString()
			});
		}
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
		if (cmd === 'read') {
			chrome.storage.local.get('server', function(data) {
				this_.set(data['server']);
				this_.trigger('load');
			});
		}
	},
	initialize: function() {
		this.filters.server = this;
		this.on('connected', function() {
			this.filters.add(this.get('filters'));
		});

		this.on({
			'load': function() {
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
			},
			'change': function() {
				chrome.storage.local.set({
					'server': this.toJSON()
				});
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
						'username': e.username
					});
					if (!this_.get('filters')) {
						this_.set({
							'filters': app.FILTERS_DEFAULT
						});
					}
					this_.api = api;
					this_.trigger('connected');
				} else {
					app.server.trigger('login-error', data)
				}
			})
		});

		this.listenTo(this.filters, 'all', function(e) {
			if (e == 'add' || e == 'remove' || e == 'change') {
				this.set('filters', this.filters.toJSON());
				this.trigger('change');
			}
		});
		
		this.fetch();
	}
});