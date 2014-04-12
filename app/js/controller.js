var app = app || {};

//-------------------------------------------------------
//-- Controller
$(function() {

	app.server = new ServerModel;
	app.navbar = new NavBarView({'el': $('#navbar')});
	app.server.load();
})