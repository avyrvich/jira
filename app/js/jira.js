


//http://www.softomate.net/jira/rest/api/2/search?jql=assignee=currentUser()+order+by+duedate&fields=id,key,summary,timeoriginalestimate



function JIRA(_serverURL, token) {

	var serverURL = _serverURL;
	this.token = token;

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
				this.token = make_base_auth(username, password);
				callback(true, this.token);
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
						if (xhr.responseText) {
							res = JSON.parse(xhr.responseText)['errorMessages'].join('\n');
						} else {
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
				callback(true, this.token);
			},
			'error': function(xhr) {
				var res = null;
				if (xhr.responseText) {
					res = JSON.parse(xhr.responseText)['errorMessages'].join('\n');
				}
				callback(false, res);
			}
		});
	};

	this.executeJQL = function(jql, callback, opt_fields) {
		var fields = opt_fields || 'id,key,summary,timetracking,duedate';
		return $.ajax({
			'url': serverURL + '/rest/api/2/search',
			'beforeSend': function (xhr){ 
				xhr.setRequestHeader('Authorization', this.token); 
			},
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
			'beforeSend': function (xhr){ 
				xhr.setRequestHeader('Authorization', this.token); 
			},
			'contentType': 'application/json', 
			'data': JSON.stringify({
				'fields': filds
			}), 
			'success': function(data){ callback && callback(data); } 
		});
	};

}