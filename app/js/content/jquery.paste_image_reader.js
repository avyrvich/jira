// Created by STRd6
// MIT License
// jquery.paste_image_reader.js
(function($) {
  var defaults;
  $.event.fix = (function(originalFix) {
    return function(event) {
      event = originalFix.apply(this, arguments);
      if (event.type.indexOf('copy') === 0 || event.type.indexOf('paste') === 0) {
        event.clipboardData = event.originalEvent.clipboardData;
      }
      return event;
    };
  })($.event.fix);
  defaults = {
    callback: $.noop,
    matchType: /image\/?(.*)/
  };
  return $.fn.pasteImageReader = function(options) {
    if (typeof options === "function") {
      options = {
        callback: options
      };
    }
    options = $.extend({}, defaults, options);
    return this.each(function() {
      var element = this;
      return $(this).on('paste', function(event) {
        var clipboardData, found;
        found = false;
        clipboardData = event.clipboardData;
        var timestamp = (new Date()).toISOString().replace(/\D/g, '');
        return Array.prototype.forEach.call(clipboardData.types, function(type, i) {
          var file, reader;
          if (found) {
            return;
          }
          var ext = clipboardData.items[i].type.match(options.matchType);
          if (ext) {
            console.log(clipboardData.items[i]);
            file = clipboardData.items[i].getAsFile();
            reader = new FileReader();
            reader.onload = function(evt) {
              var formData = new FormData();
              formData.append('file', file, timestamp + i + '.png');
              return options.callback.call(element, formData);
            };
            reader.readAsBinaryString(file);
            return found = true;
          }
        });
      });
    });
  };
})(jQuery);