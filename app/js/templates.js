// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

if (typeof templates == 'undefined') { var templates = {}; }


templates.errorMessage = function(opt_data, opt_ignored) {
  var output = '<div class="alert alert-danger fade in"><button type="button" class="close glyphicon glyphicon-remove" data-dismiss="alert" aria-hidden="true"></button><h4>Oh snap! You got an error!</h4><p>' + soy.$$filterNoAutoescape(opt_data.message) + '</p>';
  if (opt_data.buttons) {
    output += '<p>';
    var buttonList10 = opt_data.buttons;
    var buttonListLen10 = buttonList10.length;
    for (var buttonIndex10 = 0; buttonIndex10 < buttonListLen10; buttonIndex10++) {
      var buttonData10 = buttonList10[buttonIndex10];
      output += soy.$$filterNoAutoescape(buttonData10);
    }
    output += '</p>';
  }
  output += '</div>';
  return output;
};


templates.filterButton = function(opt_data, opt_ignored) {
  return '<li class="dropdown" id="btn-filter-' + soy.$$escapeHtml(opt_data.cid) + '"><a href="#" class="navbar-nav dropdown-toggle" data-toggle="dropdown"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></a><a href="#tab-filter-' + soy.$$escapeHtml(opt_data.cid) + '" class="navbar-nav filter-show" data-toggle="tab"><span class="title">' + soy.$$escapeHtml(opt_data.name) + '</span><span class="badge">' + soy.$$escapeHtml(opt_data.count) + '</span></a><ul class="dropdown-menu"><li><a href="#" class="filter-update"><span class="glyphicon"></span> Refresh</a></li><li><a href="#"  class="filter-edit" data-toggle="modal" data-target="#dlgFilterEdit"><span class="glyphicon glyphicon-pencil"></span> Edit</a></li><li class="divider"></li><li><a href="#" class="filter-delete"><span class="glyphicon glyphicon-trash"></span> Delete</a></li></ul></li>';
};


templates.issuePopover = function(opt_data, opt_ignored) {
  return '<div class="issue-popover small"><div class="issue-popover-summary">' + soy.$$escapeHtml(opt_data.summary) + '</div><div class="issue-popover-estimate">' + soy.$$escapeHtml(opt_data.estimate) + '</div></div>';
};


templates.filterTable = function(opt_data, opt_ignored) {
  return '<table class="table table-condensed table-striped table-responsive"><thead><th class="hidden-xs"></th><th>Key</th><th>Summary</th><th class="hidden-xs hidden-sm">Progress</th><th class="hidden-xs">Assignee</th><th class="hidden-xs hidden-sm">Reporter</th><th class="hidden-xs">Estimate</th><th class="hidden-xs"></th><th class="hidden-xs"></th><th>Duedate</th></thead><tbody></tbody></table>';
};


templates.filterTableRow = function(opt_data, opt_ignored) {
  return '<tr ' + ((opt_data.started) ? 'class="success"' : '') + '><td class="hidden-xs"><img csp-src="' + soy.$$escapeHtml(opt_data.project.iconUrl) + '" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.project.name) + '"></td><td><a href="' + soy.$$escapeHtml(opt_data.url) + '" target="_new">' + soy.$$escapeHtml(opt_data.key) + '</a></td><td>' + soy.$$escapeHtml(opt_data.summary) + '</td><td class="hidden-xs hidden-sm">' + ((opt_data.progress) ? (opt_data.progress.percent >= 0) ? '<div class="progress progress-striped">' + ((opt_data.progress.percent > 100) ? '<div class="progress-bar progress-bar" role="progressbar" aria-valuenow="' + soy.$$escapeHtml(opt_data.progress.percent) + '%" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">' : '<div class="progress-bar  progress-bar-success" role="progressbar" aria-valuenow="' + soy.$$escapeHtml(opt_data.progress.percent) + '%" aria-valuemin="0" aria-valuemax="100" style="width: ' + soy.$$escapeHtml(opt_data.progress.percent) + '%;">') + soy.$$escapeHtml(opt_data.progress.percent) + '%</div></div>' : '' : '') + '</td><td><span data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.assignee.emailAddress) + '" data-delay="1000">' + soy.$$escapeHtml(opt_data.assignee.displayName) + '</span></td><td class="hidden-xs hidden-sm"><span data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.reporter.emailAddress) + '" data-delay="1000">' + soy.$$escapeHtml(opt_data.reporter.displayName) + '</span></td><td class="hidden-xs">' + soy.$$escapeHtml(opt_data.estimate) + '</td><td class="hidden-xs"><img csp-src="' + soy.$$escapeHtml(opt_data.status.iconUrl) + '" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.status.description) + '"></td><td class="hidden-xs"><img csp-src="' + soy.$$escapeHtml(opt_data.priority.iconUrl) + '" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.status.description) + '"></td><td class="hidden-xs">' + soy.$$escapeHtml(opt_data.duedate) + '</td><td><div class="btn-group" jira-key="' + soy.$$escapeHtml(opt_data.key) + '"><button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right" role="menu">' + ((opt_data.started) ? '<li><a href="#" class="stop-progress">Stop Progress</a></li>' : '<li><a href="#" class="start-progress">Start Progress</a></li>') + '<li><a href="#" class="log-issue">Log Work</a></li><li class="divider"></li><li><a href="#" class="assign-issue">Assign</a></li><li><a href="#" class="resolve-issue">Resolve</a></li><li><a href="#" class="comment-issue">Comment</a></li></ul></div></tr>';
};


templates.dlgEditFilter = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '<div class="modal fade" id="dlg-filter" tabindex="-1" role="dialog" aria-labelledby="dlg-filter-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="dlg-filter-label">' + ((opt_data.filter) ? 'Edit' : 'Create') + ' JIRA Filter</h4></div><div class="modal-body"><form role="form">';
  if (opt_data.favouriteFilters) {
    output += '<div class="form-group"><label for="favouriteFilters">Favourite Filters</label><select id="favouriteFilters" class="form-control"><option/>';
    var filterList108 = opt_data.favouriteFilters;
    var filterListLen108 = filterList108.length;
    for (var filterIndex108 = 0; filterIndex108 < filterListLen108; filterIndex108++) {
      var filterData108 = filterList108[filterIndex108];
      output += '<option data-name="' + soy.$$escapeHtml(filterData108.name) + '" data-jql="' + soy.$$escapeHtml(filterData108.jql) + '">' + soy.$$escapeHtml(filterData108.name) + '</option>';
    }
    output += '</select></div>';
  }
  output += '<div class="form-group"><label for="filterName">Filter Name</label><input type="text" class="form-control" id="filterName" placeholder="Filter Name" value="' + ((opt_data.filter) ? soy.$$escapeHtml(opt_data.filter.name) : '') + '"></div><div class="form-group"><label for="filterJQL">JQL</label><textarea id="filterJQL" class="form-control" rows="3" placeholder="e.g. assignee = currentUser() AND resolution = Unresolved ORDER BY dueDate ASC">' + ((opt_data.filter) ? soy.$$escapeHtml(opt_data.filter.jql) : '') + '</textarea></div><div class="form-group"><label for="filterType">View Type</label><select id="filterType" class="form-control"><option value="1" ' + ((opt_data.filter && opt_data.filter.type == 1) ? 'checked' : '') + '>Table</option><option value="2" ' + ((opt_data.filter && opt_data.filter.type == 2) ? 'checked' : '') + '>Calendar</option></select></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' + ((opt_data.filter) ? '<button type="button" class="btn btn-primary filter-save" data-dismiss="modal">Save</button>' : '<button type="button" class="btn btn-success filter-create" data-dismiss="modal">Create</button>') + '</div></div></div></div>';
  return output;
};


templates.dlgEditIssue = function(opt_data, opt_ignored) {
  var output = '<div class="modal fade" id="dlg-edit-issue" tabindex="-1" role="dialog" aria-labelledby="dlg-edit-issue-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="dlg-edit-issue-label">' + soy.$$escapeHtml(opt_data.title) + '</h4></div><div class="modal-body"><form role="form">' + ((opt_data.fields.log) ? '<div class="form-group col-sm-6""><label for="issueSpent">Time Spent</label><input type="text" class="form-control" id="issueTimeSpent" placeholder="" value=""></div>' : '') + ((opt_data.fields.log) ? '<div class="form-group col-sm-6"><label for="issueDate">Resolve Date</label><input type="date" class="form-control" id="issueDate" placeholder="Date"></div>' : '');
  if (opt_data.fields.resolution) {
    output += '<div class="form-group"><label for="issueResolution">Resolution</label><select id="issueResolution" class="form-control">';
    var resolutionList154 = opt_data.resolutions;
    var resolutionListLen154 = resolutionList154.length;
    for (var resolutionIndex154 = 0; resolutionIndex154 < resolutionListLen154; resolutionIndex154++) {
      var resolutionData154 = resolutionList154[resolutionIndex154];
      output += '<option value="' + soy.$$escapeHtml(resolutionData154.id) + '" title="' + soy.$$escapeHtml(resolutionData154.description) + '">' + soy.$$escapeHtml(resolutionData154.name) + '</option>';
    }
    output += '</select></div>';
  }
  if (opt_data.users && opt_data.fields.assignee) {
    output += '<div class="form-group"><label for="issueAssignee">Assignee</label><select id="issueAssignee" class="form-control">';
    if (opt_data.users) {
      output += '<option/>';
      var userList170 = opt_data.users;
      var userListLen170 = userList170.length;
      for (var userIndex170 = 0; userIndex170 < userListLen170; userIndex170++) {
        var userData170 = userList170[userIndex170];
        output += '<option value="' + soy.$$escapeHtml(userData170.name) + '" title="' + soy.$$escapeHtml(userData170.displayName) + '">' + soy.$$escapeHtml(userData170.displayName) + '</option>';
      }
    }
    output += '</select></div>';
  }
  output += ((opt_data.fields.log) ? '<div class="form-group"><label for="issueLog">Worklog Message</label><textarea id="issueLog" class="form-control" rows="2"></textarea></div>' : '') + ((opt_data.fields.comment) ? '<div class="form-group"><label for="issueComment">Comment</label><textarea id="issueComment" class="form-control" rows="2"></textarea></div>' : '') + '</form></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary"  data-dismiss="modal">' + soy.$$escapeHtml(opt_data.button) + '</button></div></div></div></div>';
  return output;
};


templates.dlgConfirm = function(opt_data, opt_ignored) {
  return '<div class="modal fade" id="dlg-confirm" tabindex="-1" role="dialog" aria-labelledby="dlg-confirm-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="dlg-confirm-label">' + soy.$$escapeHtml(opt_data.title) + '</h4></div><div class="modal-body">' + soy.$$escapeHtml(opt_data.message) + '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button></div></div></div></div>';
};
