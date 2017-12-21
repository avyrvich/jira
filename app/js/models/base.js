
Backbone.localSync = function (method, model, options) {
	return new Promise((resolve) => {
		if (this.localStorageKey) {
			var key = typeof this.localStorageKey === 'string' ? this.localStorageKey : this.localStorageKey();
			switch (method) {
				case 'create':
				case 'update':
					localStorage.setItem(key, JSON.stringify(this.toJSON()));
					this.trigger('sync', this);
					break;
				case 'delete':
					localStorage.removeItem(key);
					break;
				case 'read': 
					var data = localStorage.getItem(key);
					if (data) {
						this.set(JSON.parse(data));
					} else if(options && options.defaults) {
						this.set(options.defaults);
					}
					this.trigger('sync', this);
					break;
				// no default
			}
			resolve(this);
		}
	});
};


window.LocallyStoredModel = Backbone.Model.extend({
	sync: Backbone.localSync
});

window.LocallyStoredCollection = Backbone.Collection.extend({
	sync: Backbone.localSync,
	load: function() {
		return Backbone.localSync.call(this, 'read');
	},
  save: function() {
    return Backbone.localSync.call(this, 'update');
  }
});

