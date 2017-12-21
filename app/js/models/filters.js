var FilterModel = Backbone.Model.extend({
	defaults: {
		name: 'Assigned to me',
		jql: 'assignee = currentUser() AND resolution = Unresolved ORDER BY dueDate ASC'
	},
	initialize: function(filter) {
		if (!this.has('server')) {
			this.set({
				server: this.collection.servers.getDefault().id
			});
		}
		this.server = this.collection.servers.get(this.get('server'));
		if (!this.server) {
			this.server = this.collection.servers.getDefault();
		}
		this.issues = new IssuesCollection(null, {
			filter: this
		});
	}
});

var FiltersCollection = LocallyStoredCollection.extend({ 
	localStorageKey: 'filters',
	model: FilterModel
});
