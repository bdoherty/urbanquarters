domready(function() {
	function initPage() {
		try {
			if(jQuery('#input_arrival').length) {
				jQuery('#input_arrival').attr("placeholder", "ARRIVAL").parent().addClass('booking-datepicker');
				jQuery('#input_departure').attr("placeholder", "DEPARTURE").parent().addClass('booking-datepicker');
				jQuery('.select-people').parent().addClass('booking-people');	
				
				if(jQuery('.page--house').length) {
				
					debugger;
					if(window.isMobile) {

						if(jQuery.Fotorama.instances.length) {
							jQuery.Fotorama.instances[0].destroy();
						}

							var galleryRow = jQuery('.gallery-wrapper').parentsUntil('.row');
						galleryRow.clone().prependTo(".col-md-9.is-multi").addClass('slideshow-container');
						galleryRow.remove();
						
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
						jQuery(window).resize(reinitSlideshow);
					}
					
					jQuery('#contact-info-container').detach();
					jQuery("<div id='booking-container' class='col-xs-12'/>").insertAfter( jQuery("#content").children().first() );
					jQuery('#booking-container').next().children().first().children().first().removeClass('col-md-9').addClass('col-md-12');
					
					jQuery('#widget-container').appendTo('#booking-container');
					
					var bottom = jQuery('#content').children().first().offset().top + jQuery('#content').children().first().height() + jQuery('#booking-container').height();
					jQuery( window ).scroll(function() {
						jQuery('#booking-container').toggleClass('sticky', jQuery(document).scrollTop() > bottom);
					});
					
					if(jQuery('input[name="Arrival"]').val() == '') {
						jQuery('.BookingSearch-mobile-price').addClass('hide-deposit');
					}
				}
			} else {
				setTimeout(initPage,150);
			}
		} catch (ex) {
			debugger;
		}
	}
	setTimeout(initPage,150);
	if(jQuery('.page--allproperties').length) {
		(function($){
			try {
				var __formatPrice = window.ldgfy.currency.formatPrice;
				window.ldgfy.currency.formatPrice = function (t,e,i,n,s,a) {			
					if(jQuery('#datepicker-id2').val() != '' && jQuery('#datepicker-id3').val() != '') {
						arguments[0] -= 800/e.conversion;
					}
					return __formatPrice.apply(this,arguments);
				}
			} catch (ex) {
				debugger;
			}
		})(jQuery);		
	}
});
