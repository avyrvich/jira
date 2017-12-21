var AppModel = Backbone.Model.extend({
  servers: new ServersCollection(),
  filters: new FiltersCollection(),
  initialize: function() {
    this.filters.servers = this.servers;
    this.servers
      .load()
      .then(() => this.filters.load())
      .then(() => {
        if (!this.filters.length) {
          this.listenToOnce(this.servers, 'change:token', (server) => {
            this.filters.add({
              server: server.id
            });
            this.filters.save();
          });
        }
      });

    this.listenTo(this.filters, 'issues-sync', function(issues) {
      if (this.filters.indexOf(issues.filter) === 0) {
        chrome.browserAction.setBadgeText({
          text: issues.length.toString()
        });
      }
    });
  }
});