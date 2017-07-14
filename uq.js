domready(function() {
	function initPage() {
		try {
			if(jQuery('#input_arrival').length) {
				jQuery('#input_arrival').attr("placeholder", "ARRIVAL").parent().addClass('booking-datepicker');
				jQuery('#input_departure').attr("placeholder", "DEPARTURE").parent().addClass('booking-datepicker');
				jQuery('.select-people').parent().addClass('booking-people');	
				
				if(jQuery('.page--house').length) {
				
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
						var timer = null;
						jQuery(window).on('resize visibilitychange', function() {
							clearTimeout(timer);
							timer = setTimeout(reinitSlideshow, 15);
						});
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
	if(jQuery('.page--allproperties').length  || jQuery('.page--house').length) {
		var prices = {};
		var params = {};
		var timer = null;

		(function($){
			try {
				var __formatPrice = window.ldgfy.currency.formatPrice;
				window.ldgfy.currency.formatPrice = function (t,e,i,n,s,a) {
					var params = {
						e: e,
						i: i,
						n: n,
						s: s,
						a: a
					};
					var retval = __formatPrice.apply(this,arguments);
					prices[retval] = t;
					console.log("window.ldgfy.currency.formatPrice(", t, e, i, n, s, a, ") returned ",retval);

					clearTimeout(timer);
					timer = setTimeout(function() {

						if(jQuery('#datepicker-id2').val() != '' && jQuery('#datepicker-id3').val() != '' 
								&& jQuery('.advanced-search__app .alert-info').length == 0
								&& jQuery('.results-header__total-viewing').html() != "We found <strong>0</strong> results, viewing 0") {

							for(var x in prices) {

								var c = (window.ldgfy.getCurrency() == 80) ? 1 : window.ldgfy.currency.getCurrency('NZD').conversion;
								jQuery('span:contains("'+x+'")').text(
									__formatPrice(
										prices[x] - 800/window.ldgfy.currency.getCurrency('NZD').conversion, 
										params.e,
										params.i,
										params.n,
										params.s,
										params.a
									)
								);
							}
						}
						prices = {};
						
					}, 10);

					return retval;
				}
			} catch (ex) {
				debugger;
			}
		})(jQuery);		
	}
});

