// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

if (typeof templates == 'undefined') { var templates = {}; }


templates.errorMessage = function(opt_data, opt_ignored) {
  return '<div class="alert alert-danger fade in"><button type="button" class="close glyphicon glyphicon-remove" data-dismiss="alert" aria-hidden="true"></button><h4>Oh snap! You got an error!</h4><p>' + soy.$$filterNoAutoescape(opt_data.message) + '</p></div>';
};


templates.filterButton = function(opt_data, opt_ignored) {
  return '\t<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="badge pull-right">' + soy.$$escapeHtml(opt_data.count) + ' </span>' + soy.$$escapeHtml(opt_data.name) + '<b class="caret"></b></a><ul class="dropdown-menu"><li><a href="#"><span class="glyphicon glyphicon-refresh"></span> Refresh</a></li><li><a href="#"><span class="glyphicon glyphicon-pencil"></span> Edit</a></li><li class="divider"></li><li><a href="#"><span class="glyphicon glyphicon-trash"></span> Delete</a></li></ul></li>';
};
