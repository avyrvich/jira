
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

var ServerModel = Backbone.Model.extend({
	defaults: {
		url: '',
		username: ''
	},
	initialize: function() {

		if (!this.has('id')) {
			this.set({
				id: _.uniqueId('server_')
			})
		}

		this.resolutions = new ResolutionsCollection(null, {
			server: this
		});
		this.favoriteFilters = new FavoritesFiltersCollection(null, {
			server: this
		});

		this.on({
			'sync': function() {},
			'change:token': function() {
				$.ajaxSetup({
					beforeSend: (xhr) => { 
						xhr.setRequestHeader('Authorization', 'Basic ' + this.get('token')); 
					}
				});
			},
		});
	},
	login: function(options) {
		return $.ajax({
			'url': options.url + '/rest/auth/1/session',
			'type': 'GET',
			'beforeSend': (xhr) => { 
				xhr.setRequestHeader('Authorization', 'Basic ' + btoa(options.username + ':' + options.password)); 
			},
			'success': (response) => {
				this.set({
					url: options.url,
					username: options.username,
					token: btoa(options.username + ':' + options.password)
				});
				this.collection.save();
			}
		});
	},
	checkAuthorization: function() {
		return $.ajax({
			url: this.get('url') + '/rest/auth/1/session',
			type: 'GET',
			beforeSend: (xhr) => { 
				xhr.setRequestHeader('Authorization', 'Basic ' + this.get('token')); 
			},
			error: () => {
				this.unset('token');
			}
		});
	},
	fetch: function() {
		this.resolutions.fetch();
		this.favoriteFilters.fetch();
	}
});


var ServersCollection = LocallyStoredCollection.extend({
	localStorageKey: 'server',
	model: ServerModel,
	getDefault: function() {
		return this.first();
	},
	parse: function(data) {
		console.log(data);
		return data;
	}
});