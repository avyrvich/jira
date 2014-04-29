
function JIRA(_serverURL, token) {
	var self = this;
	var serverURL = _serverURL;
	this.token = token;
	this.resolutions = [];


	function init(callback) {
		$.ajaxSetup({
			'beforeSend': function(xhr) { 
				xhr.setRequestHeader('Authorization', this.token); 
			}
		});
		return $.ajax({
			'url': serverURL + '/rest/api/2/resolution'
		}).then( function(data) {
				self.resolutions = data;
				callback(true, self.token);
		});
	}

	this.login = function(username, password, callback) {
		function make_base_auth(user, password) {
			var tok = user + ':' + password;
			var hash = btoa(tok);
			return "Basic " + hash;
		}
		return $.ajax({
			'url': serverURL + '/rest/auth/1/session',
			'type': 'GET',
			'beforeSend': function (xhr){ 
				xhr.setRequestHeader('Authorization', make_base_auth(username, password)); 
			},
			'success': function(response) {
				self.token = make_base_auth(username, password);
				init(callback);
			},
			'error': function(xhr) {
				var err = '';
				switch (xhr.status) {
					case 404: err = 'Server not found'; break;
					case 403: 
						if (xhr.getResponseHeader('X-Authentication-Denied-Reason')) {
							var url = xhr.getResponseHeader('X-Authentication-Denied-Reason').split('url=').pop();
							err = 'Unable to login. Please login manually at <a href="'+url+'">' + url + '</a>';
						} else {
							err = 'Encountered a 403 - Forbidden error while auth request';
						}
						break;
					case 401: err = 'Username or password is incorrect'; break;
					default: 
						try {
							res = JSON.parse(xhr.responseText)['errorMessages'].join('\n');
						} catch(e) {
							err = 'Unknown error';
						}
				}
				callback(false, err);
			}
		});
	};

	this.checkAuthorization = function(callback) {
		$.ajax({
			'url': serverURL + '/rest/auth/1/session',
			'type': 'GET',
			'beforeSend': function(xhr) { 
				xhr.setRequestHeader('Authorization', this.token); 
			},
			'success': function(response) {
				init(callback);
			},
			'error': function(xhr) {
				var res = null;
				if (xhr.responseText) {
					try {
						res = JSON.parse(xhr.responseText)['errorMessages'].join('\n');
					} catch (err) {
						res = $(xhr.responseText).text();
					}
				} else {
					res = xhr.statusText;
				}
				callback(false, res);
			}
		});
	};

	this.executeJQL = function(jql, callback, opt_fields) {
		var fields = opt_fields || 'id,key,summary,timetracking,duedate,issuetype,reporter,priority,status,assignee,progress,project';
		return $.ajax({
			'url': serverURL + '/rest/api/2/search',
			'data': {
				'jql': jql,
				'fields': fields
			},
			'success': function(response) {
				callback(response['issues']);
			}
		});
	};

	this.updateIssue = function(url, filds, callback) {
		$.ajax({
			'url': url, 
			'type': 'PUT',
			'contentType': 'application/json', 
			'data': JSON.stringify({
				'fields': filds
			}), 
			'success': function(data){ callback && callback(data); } 
		});
	};

	this.comment = function(url, msg, callback) {
		$.ajax({
			'url': url + '/comment', 
			'type': 'POST',
			'contentType': 'application/json', 
			'data': JSON.stringify({
				'body': msg
			}), 
			'success': function(data){ callback && callback(data); } 
		});
	};

	this.worklog = function(url, data, callback) {
		$.ajax({
			'url': url + '/worklog?adjustEstimate=auto&reduceBy', 
			'type': 'POST',
			'contentType': 'application/json', 
			'data': JSON.stringify(data), 
			'success': function(data){ callback && callback(data); } 
		});
	};

	this.getAssignableUsers = function(key, callback) {
		$.ajax({
			'url': serverURL + '/rest/api/2/user/assignable/search',
			'data': {
				'issueKey': key
			},
			'type': 'GET',
			'contentType': 'application/json', 
			'success': function(data){ callback && callback(data); } 
		});
	};

	this.getFavouriteFilters = function(callback) {
		$.ajax({
			'url': serverURL + '/rest/api/2/filter/favourite',
			'type': 'GET',
			'contentType': 'application/json', 
			'success': function(data){ callback && callback(data); } 
		});
	};

}