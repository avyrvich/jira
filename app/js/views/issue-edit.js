
var IssueEditView = Backbone.View.extend({
	users: null,
	events: {
		'click button.btn-primary': 'apply',
		'hidden.bs.modal': function() {
			this.remove();
		}
	},
	initialize: function(param) {
		this.options = param.options;
		this.render();
	},
	render: function() {
		this.setElement(
			$(templates.dlgEditIssue({
				title: this.options.title,
				button: this.options.button,
				fields: this.options.fields,
				resolution: this.options.resolution,
				resolutions: this.model.collection.server.resolutions.toJSON(),
				assignee: this.model.assignee.toJSON(),
				users: this.model.assignableUsers
			})).appendTo('body')
		);
		if (this.options.fields.log) {
			if (this.model.get('started')) {
				var timespent = moment(this_.model.get('started')).fromNow();
				this.$('#issueTimeSpent').val(timespent);
			}
			this.$('#issueDate').get(0).valueAsDate = new Date();
		}

		if (this.options.fields.assignee) {
			this.$('#issueAssignee').select2({
				placeholder: 'Search for a user',
				formatResult: templates.user,
				ajax: {
					delay: 500,
					results:  (data) => {
						return {
							results: _.map(data, user => _.extend(user, {
								id: user.name,
								text: user.displayName
							}))
						};
					},
					data: (params) => params,
					transport: (params, success, failure) => {
						return this.model.getAssignableUsers(params.data, params.success);
					}
				}
			});
		}
		this.$el.modal('show')
	},
	apply: function() {
		var data = {
			log: this.$('#issueLog').val(),
			comment: this.$('#issueComment').val(),
			timeSpent: this.$('#issueTimeSpent').val(),
			resolution: this.$('#issueResolution').val(),
			assignee: this.$('#issueAssignee').select2('val')
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
