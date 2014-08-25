// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

if (typeof templates == 'undefined') { var templates = {}; }


templates.errorMessage = function(opt_data, opt_ignored) {
  var output = '<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><h4>Oh snap! You got an error!</h4><p>' + soy.$$filterNoAutoescape(opt_data.message) + '</p>';
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
  return '<li class="dropdown" id="btn-filter-' + soy.$$escapeHtml(opt_data.cid) + '"><a href="#tab-filter-' + soy.$$escapeHtml(opt_data.cid) + '" class="navbar-nav filter-show" data-toggle="tab"><span class="title">' + soy.$$escapeHtml(opt_data.name) + '</span><span class="badge">' + soy.$$escapeHtml(opt_data.count) + '</span></a></li>';
};


templates.filterButtonSet = function(opt_data, opt_ignored) {
  return '<div class="btn-group pull-right btn-group-sm"><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">View<span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#" data-type="1" class="filter-edit-view">Table</a></li><li><a href="#" data-type="2" class="filter-edit-view">Calendar</a></li></ul></div><button type="button" class="btn btn-default filter-update"><span class="glyphicon glyphicon-refresh"></span> Refresh</button><button type="button" class="btn btn-default filter-edit" data-toggle="modal" data-target="#dlgFilterEdit"><span class="glyphicon glyphicon-pencil"></span> Edit</button><button type="button" class="btn btn-default filter-delete"><span class="glyphicon glyphicon-trash"></span> Delete</button></div>';
};


templates.issuePopover = function(opt_data, opt_ignored) {
  return '<div class="issue-popover small"><div class="issue-popover-summary">' + soy.$$escapeHtml(opt_data.summary) + '</div><div class="issue-popover-estimate">' + soy.$$escapeHtml(opt_data.estimate) + '</div></div>';
};


templates.filterTable = function(opt_data, opt_ignored) {
  return '<table class="table table-condensed table-striped table-responsive"><thead><th class="hidden-xs"></th><th>Key</th><th>Summary</th><th class="hidden-xs hidden-sm">Progress</th><th class="hidden-xs">Assignee</th><th class="hidden-xs hidden-sm">Reporter</th><th class="hidden-xs">Estimate</th><th class="hidden-xs"></th><th class="hidden-xs"></th><th>Duedate</th></thead><tbody></tbody></table>';
};


templates.filterTableRow = function(opt_data, opt_ignored) {
  return '<tr ' + ((opt_data.started) ? 'class="success"' : '') + ' jira-key="' + soy.$$escapeHtml(opt_data.key) + '"><td class="hidden-xs"><img csp-src="' + soy.$$escapeHtml(opt_data.project.iconUrl) + '" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.project.name) + '"></td><td><a href="' + soy.$$escapeHtml(opt_data.url) + '" target="_new">' + soy.$$escapeHtml(opt_data.key) + '</a></td><td>' + soy.$$escapeHtml(opt_data.summary) + '</td><td class="hidden-xs hidden-sm">' + ((opt_data.progress) ? (opt_data.progress.percent >= 0) ? '<div class="progress progress-striped">' + ((opt_data.progress.percent > 100) ? '<div class="progress-bar progress-bar" role="progressbar" aria-valuenow="' + soy.$$escapeHtml(opt_data.progress.percent) + '%" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">' : '<div class="progress-bar  progress-bar-success" role="progressbar" aria-valuenow="' + soy.$$escapeHtml(opt_data.progress.percent) + '%" aria-valuemin="0" aria-valuemax="100" style="width: ' + soy.$$escapeHtml(opt_data.progress.percent) + '%;">') + soy.$$escapeHtml(opt_data.progress.percent) + '%</div></div>' : '' : '') + '</td><td><a href="#" class="assign-issue" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.assignee.emailAddress) + '" data-delay="1000">' + soy.$$escapeHtml(opt_data.assignee.displayName) + '</a></td><td class="hidden-xs hidden-sm"><span data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.reporter.emailAddress) + '" data-delay="1000">' + soy.$$escapeHtml(opt_data.reporter.displayName) + '</span></td><td class="hidden-xs">' + soy.$$escapeHtml(opt_data.estimate) + '</td><td class="hidden-xs"><img csp-src="' + soy.$$escapeHtml(opt_data.status.iconUrl) + '" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.status.description) + '"></td><td class="hidden-xs"><img csp-src="' + soy.$$escapeHtml(opt_data.priority.iconUrl) + '" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.status.description) + '"></td><td class="hidden-xs">' + soy.$$escapeHtml(opt_data.duedate) + '</td><td><div class="btn-group"><button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right" role="menu">' + ((opt_data.started) ? '<li><a href="#" class="stop-progress">Stop Progress</a></li>' : '<li><a href="#" class="start-progress">Start Progress</a></li>') + '<li><a href="#" class="log-issue">Log Work</a></li><li class="divider"></li><li><a href="#" class="assign-issue">Assign</a></li><li><a href="#" class="resolve-issue">Resolve</a></li><li><a href="#" class="comment-issue">Comment</a></li></ul></div></tr>';
};


templates.dlgEditFilter = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '<div class="modal fade" id="dlg-filter" tabindex="-1" role="dialog" aria-labelledby="dlg-filter-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="dlg-filter-label">' + ((opt_data.filter) ? 'Edit' : 'Create') + ' JIRA Filter</h4></div><div class="modal-body"><form role="form">';
  if (opt_data.favouriteFilters) {
    output += '<div class="form-group"><label for="favouriteFilters">Favourite Filters</label><select id="favouriteFilters" class="form-control input-sm"><option/>';
    var filterList110 = opt_data.favouriteFilters;
    var filterListLen110 = filterList110.length;
    for (var filterIndex110 = 0; filterIndex110 < filterListLen110; filterIndex110++) {
      var filterData110 = filterList110[filterIndex110];
      output += '<option data-name="' + soy.$$escapeHtml(filterData110.name) + '" data-jql="' + soy.$$escapeHtml(filterData110.jql) + '">' + soy.$$escapeHtml(filterData110.name) + '</option>';
    }
    output += '</select></div>';
  }
  output += '<div class="form-group"><label for="filterName">Filter Name</label><input type="text" class="form-control input-sm" id="filterName" placeholder="Filter Name" value="' + ((opt_data.filter) ? soy.$$escapeHtml(opt_data.filter.name) : '') + '"></div><div class="form-group"><label for="filterJQL">JQL</label><textarea id="filterJQL" class="form-control input-sm" rows="3" placeholder="e.g. assignee = currentUser() AND resolution = Unresolved ORDER BY dueDate ASC">' + ((opt_data.filter) ? soy.$$escapeHtml(opt_data.filter.jql) : '') + '</textarea></div><div class="form-group"><label for="filterType">View Type</label><select id="filterType" class="form-control input-sm"><option value="1" ' + ((opt_data.filter && opt_data.filter.type == 1) ? 'selected' : '') + '>Table</option><option value="2" ' + ((opt_data.filter && opt_data.filter.type == 2) ? 'selected' : '') + '>Calendar</option></select></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' + ((opt_data.filter) ? '<button type="button" class="btn btn-primary filter-save" data-dismiss="modal">Save</button>' : '<button type="button" class="btn btn-success filter-create" data-dismiss="modal">Create</button>') + '</div></div></div></div>';
  return output;
};


templates.dlgEditIssue = function(opt_data, opt_ignored) {
  var output = '<div class="modal fade" id="dlg-edit-issue" tabindex="-1" role="dialog" aria-labelledby="dlg-edit-issue-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="dlg-edit-issue-label">' + soy.$$escapeHtml(opt_data.title) + '</h4></div><div class="modal-body"><form role="form">' + ((opt_data.fields.log) ? '<div class="form-group col-sm-6""><label for="issueSpent">Time Spent</label><input type="text" class="form-control input-sm" id="issueTimeSpent" placeholder="" value=""></div>' : '') + ((opt_data.fields.log) ? '<div class="form-group col-sm-6"><label for="issueDate">Resolve Date</label><input type="date" class="form-control input-sm" id="issueDate" placeholder="Date"></div>' : '');
  if (opt_data.fields.resolution) {
    output += '<div class="form-group"><label for="issueResolution">Resolution</label><select id="issueResolution" class="form-control input-sm"><option></option>';
    var resList156 = opt_data.resolutions;
    var resListLen156 = resList156.length;
    for (var resIndex156 = 0; resIndex156 < resListLen156; resIndex156++) {
      var resData156 = resList156[resIndex156];
      output += '<option value="' + soy.$$escapeHtml(resData156.id) + '" title="' + soy.$$escapeHtml(resData156.description) + '" ' + ((opt_data.resolution == resData156.id) ? 'selected' : '') + '>' + soy.$$escapeHtml(resData156.name) + '</option>';
    }
    output += '</select></div>';
  }
  if (opt_data.users && opt_data.fields.assignee) {
    output += '<div class="form-group"><label for="issueAssignee">Assignee</label><select id="issueAssignee" class="form-control input-sm">';
    if (opt_data.users) {
      output += '<option/>';
      var userList176 = opt_data.users;
      var userListLen176 = userList176.length;
      for (var userIndex176 = 0; userIndex176 < userListLen176; userIndex176++) {
        var userData176 = userList176[userIndex176];
        output += '<option value="' + soy.$$escapeHtml(userData176.name) + '" title="' + soy.$$escapeHtml(userData176.displayName) + '"' + ((opt_data.assignee.name == userData176.name) ? ' selected' : '') + '>' + soy.$$escapeHtml(userData176.displayName) + '</option>';
      }
    }
    output += '</select></div>';
  }
  output += ((opt_data.fields.log) ? '<div class="form-group"><label for="issueLog">Worklog Message</label><textarea id="issueLog" class="form-control input-sm" rows="2"></textarea></div>' : '') + ((opt_data.fields.comment) ? '<div class="form-group"><label for="issueComment">Comment</label><textarea id="issueComment" class="form-control input-sm" rows="2"></textarea></div>' : '') + '</form></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary"  data-dismiss="modal">' + soy.$$escapeHtml(opt_data.button) + '</button></div></div></div></div>';
  return output;
};


templates.dlgConfirm = function(opt_data, opt_ignored) {
  return '<div class="modal fade" id="dlg-confirm" tabindex="-1" role="dialog" aria-labelledby="dlg-confirm-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="dlg-confirm-label">' + soy.$$escapeHtml(opt_data.title) + '</h4></div><div class="modal-body">' + soy.$$escapeHtml(opt_data.message) + '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button></div></div></div></div>';
};
