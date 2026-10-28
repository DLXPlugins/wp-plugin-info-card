import { Fancybox, Carousel } from '@fancyapps/ui';

/**
 * Escapes a string for safe use in HTML attributes.
 *
 * Used in place of @wordpress/escape-html which isn't available on the frontend.
 *
 * @param {string} value - The value to escape.
 * @return {string} The escaped value.
 */
const escapeAttribute = function( value ) {
	if ( value === null || value === undefined ) {
		return '';
	}

	return String( value ).replace( /[&<>"']/g, ( match ) => {
		switch ( match ) {
			case '&':
				return '&amp;';
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '"':
				return '&quot;';
			case "'":
				return '&#039;';
			default:
				return match;
		}
	} );
};

document.addEventListener( 'wppicFancyboxCarouselInit', function( event ) {
	const iframeWindow = event.detail.window;
	const wrapper = event.detail.screenshotsWrapper;
	iframeWindow.Carousel = Carousel; // Make Carousel available in the iframe window. This could also set it in non-iframe window, but that's fine for block.json v2 outliers.

	// IMPORTANT: call Fancybox FROM iframe window
	new iframeWindow.Carousel( wrapper, {
		slidesPerPage: 1,
		Dots: false,
		infinite: false,
		adaptiveHeight: false,
	} );
} );
document.addEventListener( 'DOMContentLoaded', function() {
	const maybeIframe = document.querySelector( '.block-editor-iframe__body' );
	if ( null !== maybeIframe ) {
		return;
	}

	/**
	 * Re-scan the page so FooBox binds screenshot links added after its first init.
	 */
	const initFoobox = function() {
		if ( window.FOOBOX && 'function' === typeof window.FOOBOX.init ) {
			window.FOOBOX.init();
		}
	};

	/**
	 * Apply either FooBox or Fancybox attributes to a screenshot anchor.
	 *
	 * @param {HTMLAnchorElement} anchorEl  Screenshot link.
	 * @param {string}            caption   Screenshot caption.
	 * @param {string}            slug      Plugin slug.
	 * @param {string}            uniqueId  Card instance id.
	 * @param {boolean}           useFoobox Whether FooBox should open the image.
	 */
	const applyLightboxAttributes = function( anchorEl, caption, slug, uniqueId, useFoobox ) {
		if ( useFoobox ) {
			anchorEl.setAttribute( 'data-caption-title', escapeAttribute( caption ) );
			// FooBox uses the image alt as the caption description when no description is set.
			// "none" returns an empty description before that fallback, so the alt is not shown again under the title.
			anchorEl.setAttribute( 'data-caption-desc', '' );
			anchorEl.setAttribute( 'data-desc-source', 'none' );
			return;
		}

		// Fancybox attributes.
		anchorEl.setAttribute( 'data-fancybox', escapeAttribute( `wppic-screenshot-${ slug }-${ uniqueId }` ) );
		anchorEl.setAttribute( 'data-caption', escapeAttribute( caption ) );
	};

	const buildSlide = function( anchor, caption, slug, uniqueId, useFoobox ) {
		const liSlide = document.createElement( 'li' );
		liSlide.classList.add( 'f-carousel__slide' );

		const aSlide = document.createElement( 'a' );
		aSlide.href = anchor;

		applyLightboxAttributes( aSlide, caption, slug, uniqueId, useFoobox );

		const imgSlide = document.createElement( 'img' );
		imgSlide.src = anchor;
		imgSlide.alt = escapeAttribute( caption );

		aSlide.appendChild( imgSlide );
		liSlide.appendChild( aSlide );

		return liSlide;
	};

	const buildSlideNoLi = function( anchor, caption, slug, uniqueId, useFoobox ) {
		const aSlide = document.createElement( 'a' );
		aSlide.href = anchor;

		applyLightboxAttributes( aSlide, caption, slug, uniqueId, useFoobox );

		const imgSlide = document.createElement( 'img' );
		imgSlide.src = anchor;
		imgSlide.alt = escapeAttribute( caption );

		aSlide.appendChild( imgSlide );
		return aSlide;
	};

	// Load the screenshots in.
	const wppicScreenshotCarousels = document.querySelectorAll( '.wp-pic-plugin-screenshots-images' );
	if ( null === wppicScreenshotCarousels ) {
		return;
	}

	// Get all the internal images for the carousel.
	let bindFancybox = false;
	wppicScreenshotCarousels.forEach( function( carouselWrapper ) {
		const carouselImageWrapper = carouselWrapper.querySelector( '.wppic-screenshots-lazy' );
		const carouselUl = carouselWrapper.querySelector( '.wppic-screenshot-fancyapps' );
		if ( null === carouselImageWrapper || null === carouselUl ) {
			return;
		}

		const carouselImages = carouselImageWrapper.querySelectorAll( '.wppic-screenshot-lazy' );

		if ( null === carouselImages ) {
			return;
		}

		const deferredImages = [];
		let countImage = 0;
		const slug = carouselUl.getAttribute( 'data-slug' );
		const uniqueId = carouselUl.getAttribute( 'data-unique-id' );
		const useFoobox = 'foobox' === carouselWrapper.getAttribute( 'data-lightbox' );
		if ( ! useFoobox ) {
			bindFancybox = true;
		}
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
					carouselUl.appendChild( buildSlide( image.getAttribute( 'data-src' ), image.getAttribute( 'data-alt' ), slug, uniqueId, useFoobox ) );
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
							slidesPerPage: 1,
						} );
						if ( useFoobox ) {
							initFoobox();
						}
						// Let's go for the deferred images and load them in.
						deferredImages.forEach( function( deferredImage ) {
							const newDeferredImage = new Image();
							newDeferredImage.src = deferredImage.src;
							newDeferredImage.alt = deferredImage.alt;
							newDeferredImage.onload = async function() {
								newCarousel.appendSlide( buildSlideNoLi( deferredImage.src, deferredImage.alt, slug, uniqueId, useFoobox ) );
								if ( useFoobox ) {
									initFoobox();
								}
							};
						} );
					}
				};
			}
		} );
	} );
	if ( bindFancybox ) {
		Fancybox.bind( '[data-fancybox]', {
			Thumbs: {
				type: 'classic',
			},
		} );
	}
} );
