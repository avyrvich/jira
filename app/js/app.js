var app = app || {};

app.FILTER_TYPE_TABLE = 1;
app.FILTER_TYPE_CALENDAR = 2;
app.FILTERS_DEFAULT = [{
  'name': 'Assigned to me',
  'jql': 'assignee = currentUser() AND resolution = Unresolved ORDER BY dueDate ASC'
}];

app.server = new ServerModel;
