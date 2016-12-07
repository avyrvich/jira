
var IssueEditView = Backbone.View.extend({
	users: null,
	events: {
		'click button.btn-primary': 'apply'
	},
	initialize: function(param) {
		var this_ = this;
		this_.options = param.options;
		$.when(
			this_.options.fields.assignee ? this_.model.getAssignableUsers() : null
		).then(function() {
			this_.render();
		});
	},
	render: function() {
		var this_ = this;
		this_.setElement(
			$(templates.dlgEditIssue({
				title: this_.options.title,
				button: this_.options.button,
				fields: this_.options.fields,
				resolution: this_.options.resolution,
				resolutions: this.model.collection.server.resolutions.toJSON(),
				assignee: this_.model.get('assignee'),
				users: this_.model.assignableUsers
			})).appendTo('body')
		);
		if (this_.options.fields.log) {
			if (this_.model.get('started')) {
				var timespent = moment(this_.model.get('started')).fromNow();
				this_.$el.find('#issueTimeSpent').val(timespent);
			}
			this_.$el.find('#issueDate').get(0).valueAsDate = new Date();
		}

		if (this_.options.fields.assignee) {
			this_.$el.find('#issueAssignee').select2();
		}

		this_.$el.modal('show').on('hidden.bs.modal', function() {
			this_.remove();
		});

	},
	apply: function() {
		var data = {
			log: this.$el.find('#issueLog').val(),
			comment: this.$el.find('#issueComment').val(),
			timeSpent: this.$el.find('#issueTimeSpent').val(),
			resolution: this.$el.find('#issueResolution').val(),
			assignee: this.$el.find('#issueAssignee').select2('val')
		};
		if (data.timeSpent) {
			this.model.worklog({
				'comment': data.log,
				'timeSpent': data.timeSpent
			});
		}
		if (data.assignee) {
			this.model.assign(data.assignee);
		}
		if (data.resolution) {
			this.model.resolve(data.resolution);
		}
		if (data.comment) {
			this.model.comment(data.comment);
		}
	}
});
