

var FilterModel = Backbone.Model.extend({
	defaults: {
		type: app.FILTER_TYPE_TABLE
	},
	initialize: function(filter) {
		var this_ = this;
		this_.issues = new IssuesCollection(null, {
			filter: this,
			server: this.collection.server
		});
	}
});

var FiltersCollection = LocallyStoredCollection.extend({ 
	defaults: app.FILTERS_DEFAULT,
	localStorageKey: 'filters',
	model: FilterModel,
	initialize: function(models, options) {
		this.server = options.server;
	}
});
