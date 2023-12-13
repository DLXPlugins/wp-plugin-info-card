import Splide from '@splidejs/splide';

document.addEventListener( 'DOMContentLoaded', function() {
	const splide = new Splide(
		'.wp-pic-plugin-screenshots-images .splide',
		{
			type: 'loop',
			gap: '20px',
			width: '100%',
			focus: 'left',
			rewind: true,
			trimSpace: false,
			perPage: 3,
			perMove: 1,
			arrows: true,
			pagination: false,
			drag: true,
			autoplay: false,
			lazyload: 'nearby',
			mediaQuery: 'min',
			padding: {
				right: 30,
				left: 30,
			},
			breakpoints: {
				500: {
					perPage: 3,
				},
				625: {
					perPage: 4,
					focus: 'left',
				},
			},
		},
	);
	splide.mount();
} );
