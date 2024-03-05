import { Fancybox, Carousel } from '@fancyapps/ui';

document.addEventListener( 'DOMContentLoaded', function() {
	new Carousel( '.wppic-screenshot-fancyapps', {
		slidesPerPage: 1,
		Dots: false,
		infinite: false,
		adaptiveHeight: false,
	} );
	Fancybox.bind( '.wppic-screenshot-fancyapps a', {
	} );
} );
