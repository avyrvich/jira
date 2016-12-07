var jira = jira || {};

jira.getIssueKey = function() {
	return $('[name="ajs-issue-key"]').attr('content')
}

jira.getURL = function() {
	if (/\/browse\/(\w+-\d+).*/.test(location.href)) {
		return location.href.replace(/\/browse\/(\w+-\d+).*/, '/rest/api/2/issue/$1');
	} else {
		return null;
	}
}

jira.attachFiles = function(formData, callback) {
	//curl -D- -u admin:admin -X POST -H "X-Atlassian-Token: nocheck" -F "file=@myfile.txt" http://myhost/rest/api/2/issue/TEST-123/attachments
	if (!(formData instanceof FormData)) {
		var files = formData,
			formData = new FormData();
		for (var i = 0; i < files.length; i++) {
			formData.append('file', files[i]);
		}
	}
	return $.ajax({
		'url': jira.getURL() + '/attachments',
		'type': 'POST',
		'contentType': false,
		'enctype': 'multipart/form-data',
		'data': formData,
		'processData': false,
		'beforeSend': function(xhr) {
			xhr.setRequestHeader('X-Atlassian-Token', 'nocheck');
		},
		'success': function(data){ callback && callback(data); } 
	});
};


jira.initDragAndDrop = function() {
	var $placeholder;
	var eventsCount = 0;
	$(document.body).append(
		$placeholder = $('<div class="jira-assist-dragdrop">Drop files here to attach them to the task</div>')
	)
	.on('dragenter', function(e) {
		eventsCount++;
		$placeholder.show();
	})
	.on('dragleave', function(e) {
		if (--eventsCount == 0) {
			$placeholder.hide();
		}
	})
	.on('dragover', function() {
		return false;
	})
	.on('drop', function(e) {
		$placeholder.text('Please wait...');
			jira.attachFiles(
				e.originalEvent.dataTransfer.files, 
				function() {
					$placeholder.hide();
					location.reload();
				}
			);
		return false;
	});
};

jira.initCopyPaste = function() {
	function attachFiles(results) {
		var element = this;
		jira.attachFiles(results, function(attachments) {
			var injection = '';
			$.each(attachments, function(i, attachment) {
				injection += '!' + attachment['filename'] + '!' + '\n';
			});

			if (element.selectionStart || element.selectionStart == '0') {
				element.focus();
				var startPos = element.selectionStart;
				var endPos = element.selectionEnd;
				element.value = element.value.substring(0, startPos) + injection + element.value.substring(endPos, element.value.length);
			} else {
				element.value += injection;
			}
		});
	}
	
	$(document).on('paste', 'textarea[name="comment"]', function(e) {
		var event = e.originalEvent;
    var clipboardData = event.clipboardData;
    var found = false;
    var timestamp = (new Date()).toISOString().replace(/\D/g, '');
    var element = e.currentTarget;
    return Array.prototype.forEach.call(clipboardData.types, function(type, i) {
      var file, reader;
      if (found) {
        return;
      }
      var ext = clipboardData.items[i].type.match(/image\/?(.*)/);
      if (ext) {
        console.log(clipboardData.items[i]);
        file = clipboardData.items[i].getAsFile();
        reader = new FileReader();
        reader.onload = function(evt) {
          var formData = new FormData();
          formData.append('file', file, timestamp + i + '.png');
          return attachFiles.call(element, formData);
        };
        reader.readAsBinaryString(file);
        return found = true;
      }
    });
  });
}


$(function() {
	if (jira.getURL()) {
		jira.initDragAndDrop();
		jira.initCopyPaste();
	}
});