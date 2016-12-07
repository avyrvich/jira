
Backbone.localSync = function (method, model, options) {
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
		}
	}
};


window.LocallyStoredModel = Backbone.Model.extend({
	sync: Backbone.localSync
});

window.LocallyStoredCollection = Backbone.Collection.extend({
	sync: Backbone.localSync,
	load: function() {
		Backbone.localSync.call(this, 'read');
		if (!this.length && this.defaults) {
			this.set(this.defaults);
		}
	},
  save: function() {
    return Backbone.localSync.call(this, 'update');
  }
});

