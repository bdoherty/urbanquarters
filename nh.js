domready(function() {
	function matchHeight() {
		jQuery(".main-bg > .row:nth-child(4) .col-md-4").height('');
		var rows = {};
		jQuery(".main-bg > .row:nth-child(4)").children().each(function(i, el) {
			rows[Math.floor(jQuery(el).offset().top)] = [];
		});
		jQuery(".main-bg > .row:nth-child(4)").children().each(function(i, el) {
			rows[Math.floor(jQuery(el).offset().top)].push(el);
		});
		for (row in rows) {
            var max = 0;
            for(var r = 0; r < rows[row].length; r++) {
                max = Math.max(jQuery(rows[row][r]).height(), max);
            }
			jQuery(rows[row]).height(max+'px');
		}
	}

	jQuery(".featuredproperties .col-md-4").removeClass('col-md-4').addClass('col-md-6');	
	jQuery(".main-bg > .row:nth-child(4) .col-md-2").addClass("col-sm-5 col-xs-5 col-md-4").removeClass('col-md-2');

	var timer = null;
	jQuery(window).on('resize visibilitychange', function() {
		clearTimeout(timer);
		timer = setTimeout(matchHeight, 15);
	});
	
	setTimeout(matchHeight, 500);
    matchHeight();
    
	function initSlideshow() {
		try {
            if(window.isMobile) {

                if(jQuery.Fotorama.instances.length) {
                    jQuery.Fotorama.instances[0].destroy();
                }

                jQuery('.gallery-wrapper').parentsUntil('.row').addClass('slideshow-container');
                //galleryRow.clone().prependTo(".col-md-9.is-multi").addClass('slideshow-container');
                //galleryRow.remove();
                
                jQuery('.fotorama').fotorama({
                    height: '60%', 
                    autoplay: 5000, 
                    nav: false,
                    loop: true
                });
            } else {
                
                var galleryRow = jQuery('.gallery-wrapper').parentsUntil('.row');
                galleryRow.prependTo("#content").addClass('slideshow-container');
            
                function reinitSlideshow() {
                    if(jQuery.Fotorama.instances.length) {
                        jQuery.Fotorama.instances[0].destroy();
                    }
                    jQuery('.fotorama').show();						
                    var w = (Math.ceil(window.innerWidth * (window.devicePixelRatio || 1)/600)*600);
                    jQuery('.fotorama a').each(function(a, e) { 
                        e.href = e.href.split('&')[0] + '&width=' + w;
                    });
                    jQuery('.fotorama').fotorama({
                        height: '70%', 
                        autoplay: 5000, 
                        nav: false,
                        loop: true
                    });
                    jQuery.Fotorama.instances[0].startAutoplay();
                }
                reinitSlideshow();
                var timer = null;
                jQuery(window).on('resize visibilitychange', function() {
                    clearTimeout(timer);
                    timer = setTimeout(reinitSlideshow, 15);
                });
            }
					
		} catch (ex) {
			debugger;
		}
	}
	setTimeout(initSlideshow,150);    
});
