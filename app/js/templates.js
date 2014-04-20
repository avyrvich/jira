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
  return '\t<li class="dropdown" id="btn-filter-' + soy.$$escapeHtml(opt_data.cid) + '"><a href="#tab-filter-' + soy.$$escapeHtml(opt_data.cid) + '" class="navbar-nav ' + soy.$$escapeHtml(opt_data['class']) + '" data-toggle="tab">' + soy.$$escapeHtml(opt_data.name) + '<span class="badge">' + soy.$$escapeHtml(opt_data.count) + '</span></a><a href="#" class="navbar-nav dropdown-toggle" data-toggle="dropdown"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></a><ul class="dropdown-menu"><li><a href="#"><span class="glyphicon glyphicon-refresh"></span> Refresh</a></li><li><a href="#" data-toggle="modal" data-target="#dlgFilterEdit"><span class="glyphicon glyphicon-pencil"></span> Edit</a></li><li class="divider"></li><li><a href="#"><span class="glyphicon glyphicon-trash"></span> Delete</a></li></ul></li>';
};


templates.issuePopover = function(opt_data, opt_ignored) {
  return '\t<div class="issue-popover small"><div class="issue-popover-summary">' + soy.$$escapeHtml(opt_data.summary) + '</div><div class="issue-popover-estimate">' + soy.$$escapeHtml(opt_data.estimate) + '</div></div>';
};


templates.filterTable = function(opt_data, opt_ignored) {
  return '\t<table class="table table-condensed table-striped table-responsive"><thead><th>Key</th><th>Summary</th><th>Assignee</th><th>Reporter</th><th>Estimate</th><th></th><th></th><th>Duedate</th></thead><tbody></tbody></table>';
};


templates.filterTableRow = function(opt_data, opt_ignored) {
  return '\t<tr><td>' + soy.$$escapeHtml(opt_data.key) + '</td><td>' + soy.$$escapeHtml(opt_data.summary) + '</td><td>' + soy.$$escapeHtml(opt_data.assignee.displayName) + '</td><td>' + soy.$$escapeHtml(opt_data.reporter.displayName) + '</td><td>' + soy.$$escapeHtml(opt_data.estimate) + '</td><td><img src="' + soy.$$escapeHtml(opt_data.status.iconUrl) + '"></td><td><img src="' + soy.$$escapeHtml(opt_data.priority.iconUrl) + '"></td><td>' + soy.$$escapeHtml(opt_data.duedate) + '</td></tr>';
};
