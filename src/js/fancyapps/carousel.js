import { Fancybox, Carousel } from '@fancyapps/ui';

document.addEventListener( 'wppicFancyboxCarouselInit', function( event ) {
	const iframeWindow = event.detail.window;
	const wrapper = event.detail.screenshotsWrapper;
	iframeWindow.Carousel = Carousel; // Make Carousel available in the iframe window. This could also set it in non-iframe window, but that's fine for block.json v2 outliers.

	// IMPORTANT: call Fancybox FROM iframe window
	new iframeWindow.Carousel( wrapper, {
		slidesPerPage: 1,
		Dots: false,
		infinite: true,
		adaptiveHeight: false,
	} );
} );
document.addEventListener( 'DOMContentLoaded', function() {
	const maybeIframe = document.querySelector( '.block-editor-iframe__body' );
	if ( null !== maybeIframe ) {
		return;
	}
	const buildSlide = function( anchor, caption ) {
		const liSlide = document.createElement( 'li' );
		liSlide.classList.add( 'f-carousel__slide' );

		const aSlide = document.createElement( 'a' );
		aSlide.href = anchor;

		// Fancybox attributes.
		aSlide.setAttribute( 'data-fancybox', '' );
		aSlide.setAttribute( 'data-caption', caption );

		const imgSlide = document.createElement( 'img' );
		imgSlide.src = anchor;
		imgSlide.alt = caption;

		aSlide.appendChild( imgSlide );
		liSlide.appendChild( aSlide );

		return liSlide;
	};

	const buildSlideNoLi = function( anchor, caption ) {
		const aSlide = document.createElement( 'a' );
		aSlide.href = anchor;

		// Fancybox attributes.
		aSlide.setAttribute( 'data-fancybox', '' );
		aSlide.setAttribute( 'data-caption', caption );

		const imgSlide = document.createElement( 'img' );
		imgSlide.src = anchor;
		imgSlide.alt = caption;

		aSlide.appendChild( imgSlide );
		return aSlide;
	};

	// Load the screenshots in.
	const wppicScreenshotCarousels = document.querySelectorAll( '.wp-pic-plugin-screenshots-images' );
	if ( null === wppicScreenshotCarousels ) {
		return;
	}

	// Get all the internal images for the carousel.
	wppicScreenshotCarousels.forEach( function( carouselWrapper ) {
		const carouselImageWrapper = carouselWrapper.querySelector( '.wppic-screenshots-lazy' );
		const carouselImages = carouselImageWrapper.querySelectorAll( '.wppic-screenshot-lazy' );

		if ( null === carouselImages ) {
			return;
		}

		const deferredImages = [];
		let countImage = 0;
		const carouselUl = carouselWrapper.querySelector( '.wppic-screenshot-fancyapps' );
		// Loop through the first three images and preload them.
		carouselImages.forEach( function( image, index ) {
			if ( index > 2 ) {
				deferredImages.push( {
					src: image.getAttribute( 'data-src' ),
					alt: image.getAttribute( 'data-alt' ),
				} );
			} else {
				const newImg = new Image();
				newImg.src = image.getAttribute( 'data-src' );
				newImg.alt = image.getAttribute( 'data-alt' );
				newImg.onload = async function() {
					carouselUl.appendChild( buildSlide( image.getAttribute( 'data-src' ), image.getAttribute( 'data-alt' ) ) );
					countImage++;
					if ( countImage === 3 || countImage === carouselImages.length ) {
						// Show carouselUL.
						carouselUl.style.display = 'block';
						// Remove all carousel images from the dom.
						carouselImageWrapper.remove();
						// Let's init the slider.
						const newCarousel = new Carousel( carouselUl, {
							Dots: false,
							infinite: false,
							adaptiveHeight: false,
						} );
						// Let's go for the deferred images and load them in.
						deferredImages.forEach( function( deferredImage ) {
							const newDeferredImage = new Image();
							newDeferredImage.src = deferredImage.src;
							newDeferredImage.alt = deferredImage.alt;
							newDeferredImage.onload = async function() {
								newCarousel.appendSlide( buildSlideNoLi( deferredImage.src, deferredImage.alt ) );
							};
						} );
					}
				};
			}
		} );
	} );
	Fancybox.bind( '[data-fancybox]', {
	} );
} );
