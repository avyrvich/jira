


//http://www.softomate.net/jira/rest/api/2/search?jql=assignee=currentUser()+order+by+duedate&fields=id,key,summary,timeoriginalestimate



function JIRA(serverURL) {

	this.token = null;

	this.login = function(username, password, callback) {
		function make_base_auth(user, password) {
			var tok = user + ':' + password;
			var hash = btoa(tok);
			return "Basic " + hash;
		}
		return $.ajax({
			'url': serverURL + '/rest/auth/1/session',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', make_base_auth(username, password)); 
			},
			'success': function(response) {
				localStorage.setItem('token', make_base_auth(username, password));
				callback(true);
			},
			'error': function() {
				callback(false);
			}
		});
	};

	this.executeJQL = function(jql, callback, opt_fields) {
		var fields = opt_fields || 'id,key,summary,timetracking,duedate';
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

}