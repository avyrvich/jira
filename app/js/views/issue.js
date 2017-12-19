//-------------------------------------------------------
//-- Views
var IssueView = Backbone.View.extend({
	tagName: 'tr',
	template: templates.issueItem,
	rendered: false,
	events: {
		'click .issue-pin': function(e) {
			this.model.server.add(this.model);
		},
		'click .issue-transit': function(e) {
			this.model.transition(e.currentTarget.getAttribute('data-transition'));
		},
		'click .assign-issue': function(evt) {
			new IssueEditView({
				options: {
						title: 'Change Assignee',
						button: 'Assign',
						fields: {
							log: false,
							comment: true,
							resolution: false,
							assignee: true
						}
				},
				model: this.model
			});
		},
		'click .comment-issue': function(evt) {
			new IssueEditView({
				options: {
						title: 'Post Comment',
						button: 'Post Comment',
						fields: {
							log: false,
							comment: true,
							resolution: false,
							assignee: false
						}
				},
				model: this.model
			});
		}
	},
	initialize: function() {
		console.log('init', this.model);
		this.listenTo(this.model, {
			'change': this.render,
			'remove': this.remove
		});
	},
	render: function() {
		this.$el.html($(this.template(this.model.toJSON())));
		if (this.model.status.has('statusCategory')) {
			this.$el.attr({statusCategory: this.model.status.get('statusCategory').colorName});
		}
		this.$('[data-toggle="tooltip"]').tooltip();
		return this.$el;
	}
});
