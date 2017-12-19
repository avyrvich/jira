// This file was automatically generated from settings.soy.
// Please don't edit this file by hand.

if (typeof templates == 'undefined') { var templates = {}; }


templates.dlgLogin = function(opt_data, opt_ignored) {
  return '<div class="container"><div class="panel panel-default"><div class="panel-body"><span class="alertsArea"></span><form class="form form-horizontal"><fieldset><!-- Text input--><div class="form-group"><label class="control-label col-sm-4" for="url">Server URL</label><div class="controls col-sm-8"><input id="url" name="url" type="text" placeholder="e.g http://www.domain.com/jira" class="form-control" required="" value="' + soy.$$escapeHtml(opt_data.url) + '"></div></div><!-- Text input--><div class="form-group"><label class="control-label col-sm-4" for="username">Username</label><div class="controls col-sm-8"><input id="username" name="username" type="text" placeholder="" class="form-control" required="" value="' + soy.$$escapeHtml(opt_data.username) + '"></div></div><!-- Password input--><div class="form-group"><label class="control-label col-sm-4" for="password">Password</label><div class="controls col-sm-8"><input id="password" name="password" type="password" placeholder="" class="form-control" required=""></div></div></fieldset></form></div><div class="panel-footer"><button type="button" class="btn btn-primary ladda-button" data-style="expand-left"><span class="ladda-label">Connect</span></button></div></div></div>';
};


templates.alert = function(opt_data, opt_ignored) {
  var output = '<div class="alert ' + soy.$$escapeHtml(opt_data['class']) + ' fade in">' + ((opt_data.title != null) ? '<h4>' + soy.$$escapeHtml(opt_data.title) + '</h4>' : '') + '<p>' + soy.$$filterNoAutoescape(opt_data.message) + '</p>';
  if (opt_data.buttons) {
    output += '<p>';
    var buttonList24 = opt_data.buttons;
    var buttonListLen24 = buttonList24.length;
    for (var buttonIndex24 = 0; buttonIndex24 < buttonListLen24; buttonIndex24++) {
      var buttonData24 = buttonList24[buttonIndex24];
      output += soy.$$filterNoAutoescape(buttonData24);
    }
    output += '</p>';
  }
  output += '</div>';
  return output;
};
