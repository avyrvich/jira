var app = app || {};

app.FILTER_TYPE_TABLE = 1;
app.FILTER_TYPE_CALENDAR = 2;
app.FILTERS_DEFAULT = [{
  'name': 'Assigned to me',
  'jql': 'assignee = currentUser() AND resolution = Unresolved ORDER BY dueDate ASC'
}];

app.server = new ServerModel;

if (chrome.browserAction) {
	chrome.browserAction.setBadgeBackgroundColor({
		'color': '#3399F3'
	});
} else if (chrome.app && chrome.app.runtime) {
	chrome.app.runtime.onLaunched.addListener(function() {
	  chrome.app.window.create('index.html', {
	    id: 'jira-app',
	    bounds: {
	      width: 1200,
	      height: 800,
	      left: 100,
	      top: 100
	    },
	    minWidth: 400,
	    minHeight: 400
	  }, function(wnd) {
	    wnd.contentWindow.app = app;
	  });
	});	
}