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
		'success': function(data) {
			callback && callback(data);
		}
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
	$('body').on('click', '#footer-comment-button', (function(event) {
		/* Act on the event */
		$('textarea[name="comment"]').pasteImageReader(function(results) {
			var textarea = this;
			jira.attachFiles(results, function(attachments) {
				$.each(attachments, function(i, attachment) {
					textarea.value += '!' + attachment['filename'] + '!'
				});
			});
		});
	}));

	$('body').on('click', '#comment-issue', (function(event) {
		/* Act on the event */
		$('textarea[name="comment"]').pasteImageReader(function(results) {
			var textarea = this;
			jira.attachFiles(results, function(attachments) {
				$.each(attachments, function(i, attachment) {
					textarea.value += '!' + attachment['filename'] + '!'
				});
			});
		});
	}));

	$('body').on('click', '#log-work', (function(event) {
		/* Act on the event */
		$('textarea[name="comment"]').pasteImageReader(function(results) {
			var textarea = this;
			jira.attachFiles(results, function(attachments) {
				$.each(attachments, function(i, attachment) {
					textarea.value += '!' + attachment['filename'] + '!'
				});
			});
		});
	}));
	$('body').on('click', '#attach-file', (function(event) {
		/* Act on the event */
		$('textarea[name="comment"]').pasteImageReader(function(results) {
			var textarea = this;
			jira.attachFiles(results, function(attachments) {
				$.each(attachments, function(i, attachment) {
					textarea.value += '!' + attachment['filename'] + '!'
				});
			});
		});
	}));
	$('body').on('click', '#edit-issue', (function(event) {
		/* Act on the event */
		setTimeout(function() {
			$('textarea[name="comment"]').pasteImageReader(function(results) {
				var textarea = this;
				jira.attachFiles(results, function(attachments) {
					$.each(attachments, function(i, attachment) {
						textarea.value += '!' + attachment['filename'] + '!'
					});
				});
			});
		}, 1000);
	}));
}



$(function() {
	if (jira.getURL()) {
		jira.initDragAndDrop();
		jira.initCopyPaste();
	}
});