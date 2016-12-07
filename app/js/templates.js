// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

if (typeof templates == 'undefined') { var templates = {}; }


templates.jumbotron = function(opt_data, opt_ignored) {
  return '<div class="jumbotron"><h1>Hello, World!</h1><p>Thanks for installing JIRA Assist extension. The only step left is to connect JIRA server to the extension. Please, press the "Connect Now" button below.</p><p><a class="btn btn-primary btn-lg server-settings" role="button"><span class="ladda-label">Connect Now</span></a></p></div>';
};


templates.errorMessage = function(opt_data, opt_ignored) {
  var output = '<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><h4>Oh snap! You got an error!</h4><p>' + soy.$$filterNoAutoescape(opt_data.message) + '</p>';
  if (opt_data.buttons) {
    output += '<p>';
    var buttonList12 = opt_data.buttons;
    var buttonListLen12 = buttonList12.length;
    for (var buttonIndex12 = 0; buttonIndex12 < buttonListLen12; buttonIndex12++) {
      var buttonData12 = buttonList12[buttonIndex12];
      output += soy.$$filterNoAutoescape(buttonData12);
    }
    output += '</p>';
  }
  output += '</div>';
  return output;
};


templates.filterButton = function(opt_data, opt_ignored) {
  return '<li class="dropdown" id="btn-filter-' + soy.$$escapeHtml(opt_data.cid) + '"><a href="#tab-filter-' + soy.$$escapeHtml(opt_data.cid) + '" class="navbar-nav filter-show pull-left" data-toggle="tab"><span class="title">' + soy.$$escapeHtml(opt_data.name) + '</span><span class="badge">' + soy.$$escapeHtml(opt_data.count) + '</span></a><a href="#" class="dropdown-toggle pull-left" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></a><ul class="dropdown-menu"><li><a href="#" data-type="1" class="filter-edit-view">Table view</a></li><li><a href="#" data-type="2" class="filter-edit-view">Calendar view</a></li><li role="separator" class="divider"></li><li><a href="#" class="filter-update"><span class="glyphicon glyphicon-refresh"></span> Refresh</a></li><li><a href="#" class="filter-edit"><span class="glyphicon glyphicon-pencil"></span> Edit</a></li><li role="separator" class="divider"></li><li><a href="#" class="filter-delete"><span class="glyphicon glyphicon-trash"></span> Delete</a></li></ul></li>';
};


templates.issuePopover = function(opt_data, opt_ignored) {
  return '<div class="issue-popover small"><div class="issue-popover-summary">' + soy.$$escapeHtml(opt_data.summary) + '</div><div class="issue-popover-estimate">' + soy.$$escapeHtml(opt_data.estimate) + '</div></div>';
};


templates.issuesTable = function(opt_data, opt_ignored) {
  return '<table class="table table-condensed table-striped table-responsive table-hover"><tbody></tbody></table>';
};


templates.issueItem = function(opt_data, opt_ignored) {
  var output = '<td><div class="issue-title"><span class="prop" style="float:left;"><img src="' + soy.$$escapeHtml(opt_data.project.avatarUrls['32x32']) + '" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.project.name) + '"></span><span class="prop"><a href="' + soy.$$escapeHtml(opt_data.url) + '" target="_new">' + soy.$$escapeHtml(opt_data.key) + '</a></span><span class="prop">' + soy.$$escapeHtml(opt_data.summary) + '</span><div class="btn-group btn-group-xs pull-right">';
  if (opt_data.transitions) {
    var transitionList50 = opt_data.transitions;
    var transitionListLen50 = transitionList50.length;
    for (var transitionIndex50 = 0; transitionIndex50 < transitionListLen50; transitionIndex50++) {
      var transitionData50 = transitionList50[transitionIndex50];
      output += '<button type="button" class="btn btn-default issue-transit" data-transition="' + soy.$$escapeHtml(transitionData50.id) + '">' + soy.$$escapeHtml(transitionData50.name) + '</button>';
    }
  }
  output += '<button type="button" class="btn btn-default" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right" role="menu"><li><a href="#" class="assign-issue">Assign</a></li><li><a href="#" class="comment-issue">Comment</a></li></ul></div></div><div class="issue-properies">';
  var versionList58 = opt_data.fixVersions;
  var versionListLen58 = versionList58.length;
  for (var versionIndex58 = 0; versionIndex58 < versionListLen58; versionIndex58++) {
    var versionData58 = versionList58[versionIndex58];
    output += '<span class="prop"><a href="' + soy.$$escapeHtml(versionData58.url) + '" class="value" target="_new" ' + ((versionData58.description) ? ' data-toggle="tooltip" title="' + soy.$$escapeHtml(versionData58.description) + '"' : '') + '>' + soy.$$escapeHtml(versionData58.name) + '</a></span>';
  }
  output += ((opt_data.assignee) ? '<span class="prop">Assignee:<a href="#" class="assign-issue value" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.assignee.emailAddress) + '" data-delay="1000">' + soy.$$escapeHtml(opt_data.assignee.displayName) + '</a></span>' : '') + ((opt_data.reporter) ? '<span class="prop">Reporter:<span class="value" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.reporter.emailAddress) + '" data-delay="1000">' + soy.$$escapeHtml(opt_data.reporter.displayName) + '</span></span>' : '') + ((opt_data.estimate) ? '<span class="prop">Estimate: <span class="value">' + soy.$$escapeHtml(opt_data.estimate) + '</span></span>' : '') + ((opt_data.duedate) ? '<span class="prop">Due: <span class="value">' + soy.$$escapeHtml(opt_data.duedate) + '</span></span>' : '') + ((opt_data.status) ? '<span class="prop"><img src="' + soy.$$escapeHtml(opt_data.status.iconUrl) + '" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.status.description) + '"></span>' : '') + ((opt_data.priority) ? '<span class="prop"><img src="' + soy.$$escapeHtml(opt_data.priority.iconUrl) + '" data-toggle="tooltip" title="' + soy.$$escapeHtml(opt_data.priority.description) + '"></span>' : '') + '</div></td>';
  return output;
};


templates.dlgEditFilter = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '<div class="modal fade" id="dlg-filter" tabindex="-1" role="dialog" aria-labelledby="dlg-filter-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="dlg-filter-label">' + ((opt_data.filter) ? 'Edit' : 'Create') + ' JIRA Filter</h4></div><div class="modal-body"><form role="form">';
  if (opt_data.favouriteFilters) {
    output += '<div class="form-group"><label for="favouriteFilters">Favourite Filters</label><select id="favouriteFilters" class="form-control input-sm"><option/>';
    var filterList121 = opt_data.favouriteFilters;
    var filterListLen121 = filterList121.length;
    for (var filterIndex121 = 0; filterIndex121 < filterListLen121; filterIndex121++) {
      var filterData121 = filterList121[filterIndex121];
      output += '<option data-name="' + soy.$$escapeHtml(filterData121.name) + '" data-jql="' + soy.$$escapeHtml(filterData121.jql) + '">' + soy.$$escapeHtml(filterData121.name) + '</option>';
    }
    output += '</select></div>';
  }
  output += '<div class="form-group"><label for="filterName">Filter Name</label><input type="text" class="form-control input-sm" id="filterName" placeholder="Filter Name" value="' + ((opt_data.filter) ? soy.$$escapeHtml(opt_data.filter.name) : '') + '"></div><div class="form-group"><label for="filterJQL">JQL</label><textarea id="filterJQL" class="form-control input-sm" rows="3" placeholder="e.g. assignee = currentUser() AND resolution = Unresolved ORDER BY dueDate ASC">' + ((opt_data.filter) ? soy.$$escapeHtml(opt_data.filter.jql) : '') + '</textarea></div><div class="form-group"><label for="filterType">View Type</label><select id="filterType" class="form-control input-sm"><option value="1" ' + ((opt_data.filter && opt_data.filter.type == 1) ? 'selected' : '') + '>Table</option><option value="2" ' + ((opt_data.filter && opt_data.filter.type == 2) ? 'selected' : '') + '>Calendar</option></select></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' + ((opt_data.filter) ? '<button type="button" class="btn btn-primary filter-save" data-dismiss="modal">Save</button>' : '<button type="button" class="btn btn-success filter-create" data-dismiss="modal">Create</button>') + '</div></div></div></div>';
  return output;
};


templates.dlgEditIssue = function(opt_data, opt_ignored) {
  var output = '<div class="modal fade" id="dlg-edit-issue" tabindex="-1" role="dialog" aria-labelledby="dlg-edit-issue-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="dlg-edit-issue-label">' + soy.$$escapeHtml(opt_data.title) + '</h4></div><div class="modal-body"><form role="form">' + ((opt_data.fields.log) ? '<div class="form-group col-sm-6"><label for="issueSpent">Time Spent</label><input type="text" class="form-control input-sm" id="issueTimeSpent" placeholder="" value=""></div>' : '') + ((opt_data.fields.log) ? '<div class="form-group col-sm-6"><label for="issueDate">Resolve Date</label><input type="date" class="form-control input-sm" id="issueDate" placeholder="Date"></div>' : '');
  if (opt_data.fields.resolution) {
    output += '<div class="form-group"><label for="issueResolution">Resolution</label><select id="issueResolution" class="form-control input-sm"><option></option>';
    var resList167 = opt_data.resolutions;
    var resListLen167 = resList167.length;
    for (var resIndex167 = 0; resIndex167 < resListLen167; resIndex167++) {
      var resData167 = resList167[resIndex167];
      output += '<option value="' + soy.$$escapeHtml(resData167.id) + '" title="' + soy.$$escapeHtml(resData167.description) + '" ' + ((opt_data.resolution == resData167.id) ? 'selected' : '') + '>' + soy.$$escapeHtml(resData167.name) + '</option>';
    }
    output += '</select></div>';
  }
  if (opt_data.users && opt_data.fields.assignee) {
    output += '<div class="form-group"><label for="issueAssignee">Assignee</label><select id="issueAssignee" class="form-control input-sm">';
    if (opt_data.users) {
      output += '<option/>';
      var userList187 = opt_data.users;
      var userListLen187 = userList187.length;
      for (var userIndex187 = 0; userIndex187 < userListLen187; userIndex187++) {
        var userData187 = userList187[userIndex187];
        output += '<option value="' + soy.$$escapeHtml(userData187.name) + '" title="' + soy.$$escapeHtml(userData187.displayName) + '"' + ((opt_data.assignee.name == userData187.name) ? ' selected' : '') + '>' + soy.$$escapeHtml(userData187.displayName) + '</option>';
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


templates.error = function(opt_data, opt_ignored) {
  return '<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' + soy.$$escapeHtml(opt_data.message) + '</div>';
};


templates.loader = function(opt_data, opt_ignored) {
  return '<div class="panel panel-default"><div class="panel-body"><div class="loader"><i class="fa fa-spinner fa-spin"></i></div></div></div>';
};


templates.dlgLogin = function(opt_data, opt_ignored) {
  return '<div class="modal fade" id="dlg-connect" tabindex="-1" role="dialog" aria-labelledby="dlg-connect-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="dlg-connect-label">Connect to JIRA Server</h4></div><div class="modal-body"><span class="alertsArea"></span><form class="form-horizontal"><fieldset><!-- Text input--><div class="control-group"><label class="control-label" for="url">Server URL</label><div class="controls"><input id="url" name="url" type="text" placeholder="e.g http://www.domain.com/jira" class="form-control input-xlarge" required="" value="' + soy.$$escapeHtml(opt_data.url) + '"></div></div><!-- Text input--><div class="control-group"><label class="control-label" for="username">Username</label><div class="controls"><input id="username" name="username" type="text" placeholder="" class="form-control input-xlarge" required="" value="' + soy.$$escapeHtml(opt_data.username) + '"></div></div><!-- Password input--><div class="control-group"><label class="control-label" for="password">Password</label><div class="controls"><input id="password" name="password" type="password" placeholder="" class="form-control input-xlarge" required=""></div></div></fieldset></form></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary ladda-button" data-style="expand-left"><span class="ladda-label">Connect</span></button></div></div></div></div>';
};
