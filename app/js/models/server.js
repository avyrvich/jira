
var BaseCollection = Backbone.Collection.extend({
	initialize: function(models, options) {
		this.server = options.server;
	}
});

var ResolutionsCollection = BaseCollection.extend({
	url: function() {
		return this.server.get('url') + '/rest/api/2/resolution'
	},
});

var FavoritesFiltersCollection = BaseCollection.extend({
	url: function() {
		return this.server.get('url') + '/rest/api/2/filter/favourite'
	}
});

var ServerModel = LocallyStoredModel.extend({
	defaults: {
		url: '',
		username: ''
	},
	localStorageKey: 'server',
	initialize: function() {
		
		this.filters = new FiltersCollection(null, {
			server: this
		});
		this.resolutions = new ResolutionsCollection(null, {
			server: this
		});
		this.favoriteFilters = new FavoritesFiltersCollection(null, {
			server: this
		});

		this.on({
			'sync': function() {
				this.filters.load();
				this.resolutions.fetch();
				this.favoriteFilters.fetch();
			},
			'change:token': function() {
				$.ajaxSetup({
					beforeSend: (xhr) => { 
						xhr.setRequestHeader('Authorization', this.get('token')); 
					}
				});
			},
		});

		this.listenTo(this.filters, 'issues-sync', function(issues) {
			chrome.browserAction.setBadgeText({
				text: issues.length.toString()
			});
		});
		
		this.fetch();
	},
	login: function(options) {
		return $.ajax({
			'url': options.url + '/rest/auth/1/session',
			'type': 'GET',
			'beforeSend': (xhr) => { 
				xhr.setRequestHeader('Authorization', btoa(options.username + ':' + options.password)); 
			},
			'success': (response) => {
				this.save({
					url: options.url,
					username: options.username,
					token: btoa(options.username + ':' + options.password)
				});
			}
		});
	},
	checkAuthorization: function() {
		return $.ajax({
			url: this.get('url') + '/rest/auth/1/session',
			type: 'GET',
			beforeSend: (xhr) => { 
				xhr.setRequestHeader('Authorization', this.get('token')); 
			},
			error: () => {
				this.unset('token');
			}
		});
	}
});