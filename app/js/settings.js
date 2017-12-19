var app = chrome.extension.getBackgroundPage().app;

$(function() {
  new LoginView({
    model: app.server
  }).render();
});