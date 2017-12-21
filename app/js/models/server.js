
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
	},
	login: function(options) {
		return this.ajax({
			'url': options.url + '/rest/auth/1/session',
			'type': 'GET',
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
		return this.ajax({
			url: this.get('url') + '/rest/auth/1/session',
			type: 'GET',
			error: () => {
				this.unset('token');
			}
		});
	},
	ajax: function(options) {
		return $.ajax(_.extend({
			beforeSend: xhr => xhr.setRequestHeader('Authorization', 'Basic ' + this.get('token'))
		}, options));
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