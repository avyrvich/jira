


//http://www.softomate.net/jira/rest/api/2/search?jql=assignee=currentUser()+order+by+duedate&fields=id,key,summary,timeoriginalestimate



function JIRA(serverURL) {

	$.support.cors = true;

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