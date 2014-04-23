var app = app || {};

app.FILTER_TYPE_TABLE = 1;
app.FILTER_TYPE_CALENDAR = 2;

app.server = new ServerModel;

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'jira-app',
    bounds: {
      width: 1200,
      height: 800,
      left: 100,
      top: 100
    },
    minWidth: 1200,
    minHeight: 800
  }, function(wnd) {
    wnd.contentWindow.app = app;
  });
});