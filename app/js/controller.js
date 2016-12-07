//-------------------------------------------------------
//-- Controller
var app = app || {};
$(function() {
	moment.lang('en', {
	    relativeTime : {
			past: "1m",
			s:  "1m",
			m:  "1m",
			mm: "%dm",
			h:  "1h",
			hh: "%dh",
			d:  "1d",
			dd: "%dd",
			M:  "1M",
			MM: "%dM",
			y:  "1y",
			yy: "%dy"
	    }
	});
	
	app.navbar = new NavBarView({});

	$(window).bind('unload', function() {
		app.navbar.unload();
	})
})