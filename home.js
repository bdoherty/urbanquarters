domready(function() {
	function matchHeight() {
		jQuery(".main-bg > .row:nth-child(3) .col-md-4").height('');
		var rows = {};
		jQuery(".main-bg > .row:nth-child(3)").children().each(function(i, el) {
			rows[Math.floor(jQuery(el).offset().top)] = [];
		});
		jQuery(".main-bg > .row:nth-child(3)").children().each(function(i, el) {
			rows[Math.floor(jQuery(el).offset().top)].push(el);
		});
		for (row in rows) {
			jQuery(rows[row]).height(jQuery(rows[row]).height()+'px');
		}
	}

	jQuery(".featuredproperties .col-md-4").removeClass('col-md-4').addClass('col-md-6').appendTo('.featured-properties__grid:first()');
	jQuery(".main-bg > .row:nth-child(3) .col-md-2").addClass("col-sm-5 col-xs-5 col-md-4");

	var timer = null;
	jQuery(window).on('resize visibilitychange', function() {
		clearTimeout(timer);
		timer = setTimeout(matchHeight, 15);
	});
	
	setTimeout(matchHeight, 500);
	setTimeout(matchHeight, 1000);
	setTimeout(matchHeight, 2500);
	setTimeout(matchHeight, 5000);
	matchHeight();
});
