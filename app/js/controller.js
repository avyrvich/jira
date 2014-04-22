


var app = app || {};

app.FILTER_TYPE_TABLE = 1;
app.FILTER_TYPE_CALENDAR = 2;


//-------------------------------------------------------
//-- Controller
$(function() {

	app.server = new ServerModel;
	app.navbar = new NavBarView({'el': $('#navbar')});
})