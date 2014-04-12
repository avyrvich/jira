// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

if (typeof templates == 'undefined') { var templates = {}; }


templates.test = function(opt_data, opt_ignored) {
  return 'Hello, ' + soy.$$escapeHtml(opt_data.name) + '!';
};
