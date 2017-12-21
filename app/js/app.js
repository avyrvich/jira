$(function() {
	window.app = new AppModel();
});

if (chrome.browserAction) {
	chrome.browserAction.setBadgeBackgroundColor({
		'color': '#3399F3'
	});

	chrome.omnibox.onInputChanged.addListener( function(text, suggest) {
		app.servers.getDefault().api.executeJQL('text ~ "'+text.replace(/"/, '\\\"')+'"', function(issues) {
			suggest(_.map(issues, function(issue) {
				return {
					content: issue.key,
					description: issue.key + ': ' + issue.fields.summary
				}
			}));
		}, 'key,summary');
	});

	chrome.omnibox.onInputEntered.addListener( function(key) {
		chrome.tabs.create({
			url: app.servers.getDefault().get('url') + '/browse/' + key
		});
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