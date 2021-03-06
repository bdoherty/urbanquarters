var slideshowLoaded = false;
domready(function() {
	function initPage() {
		try {
			jQuery('.logo-box').each(function() { 
				jQuery(this).replaceWith( jQuery('<a class="logo-box" href="https://www.urbanquarters.co.nz/" />').html( this.innerHTML ) ); 
			})

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
						
					} else if (window.location.hash == '' || window.location.hash == '#Overview') {
						
						slideshowLoaded = true;

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
					} else {
						jQuery(window).on('hashchange', function() {						
							if(!slideshowLoaded && window.location.hash == '#Overview' && !window.isMobile) {
								window.location = '';
							}
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

						for(var x in prices) {
							var parent = jQuery('span.CurrencyText:contains("'+x+'")').parent();
							if(!parent.hasClass('PropertyPrices') && (jQuery('.search-datepicker input.hasDatepicker').length == 0 || jQuery('.search-datepicker input.hasDatepicker')[0].value != '')
									&& jQuery("span:contains('No results found matching your search criteria. Showing all properties instead.')").length == 0) {
								console.log('class: ' + parent.attr('class') + ' ' + x, prices[x], 800/window.ldgfy.currency.getCurrency('NZD').conversion, params);

								jQuery('span:contains("'+x+'")').text(
									__formatPrice(
										prices[x] - 800/ (params.n ? 1 : window.ldgfy.currency.getCurrency('NZD').conversion), 
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
				
				var content = jQuery("meta[name='description']").attr('content');
				if(content) {
					jQuery('.page.page--house .house-subheader .property-address').text(content.replace(' Auckland New Zealand, Auckland', ''));
				}
				
			} catch (ex) {
				debugger;
			}

		})(jQuery);		
	}
});

