import { Fancybox, Carousel } from '@fancyapps/ui';

document.addEventListener( 'DOMContentLoaded', function() {
	// Load screenshot images in.
	const wppicScreenshotCarousels = document.querySelectorAll( '.wppic-screenshot-fancyapps' );
	if ( null === wppicScreenshotCarousels ) {
		return;
	}

	// Find all carousels, loop through them, and preload all the images.
	wppicScreenshotCarousels.forEach( function( carousel ) {
		const images = carousel.querySelectorAll( '.wppic-screenshot-lazy' );
		let imageCount = 0;
		images.forEach( function( image ) {
			const src = image.getAttribute( 'data-src' );
			if ( src ) {
				const img = new Image();
				img.src = src;
				img.alt = image.getAttribute( 'data-alt' );

				// Replace div with image after it's done loading.
				img.onload = async function() {
					image.parentNode.replaceChild( img, image );
					imageCount++;
					if ( imageCount === images.length ) {
						// Set carousel to display block.
						carousel.style.display = 'block';

						// All images are loaded, so init Fancybox.
						new Carousel( carousel, {
							Dots: false,
							infinite: false,
							adaptiveHeight: false,
						} );
					}
				};
			}
		} );
	} );
	Fancybox.bind( '[data-fancybox]', {
	} );
} );
