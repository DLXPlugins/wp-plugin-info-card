import { Fancybox, Carousel } from '@fancyapps/ui';

document.addEventListener( 'DOMContentLoaded', function() {
	const carousels = document.querySelectorAll( '.wppic-screenshot-fancyapps' );
	if ( null === carousels ) {
		return;
	}
	carousels.forEach( ( carousel ) => {
		new Carousel( carousel, {
			Dots: false,
			infinite: false,
			adaptiveHeight: false,
			
		} );
	} );
	Fancybox.bind( '[data-fancybox]', {
	} );
} );
