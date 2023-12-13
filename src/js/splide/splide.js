import Splide from '@splidejs/splide';

document.addEventListener( 'DOMContentLoaded', function() {
	const splide = new Splide(
		'.wp-pic-plugin-screenshots-images .splide',
		{
			type: 'loop',
			gap: '20px',
			rewind: true,
			focus: 'left',
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
				right: '10px',
				left: '10px',
			},
			fixedWidth: '33%',
			breakpoints: {
				500: {
					perPage: 3,
					focus: 'center',
				},
				625: {
					perPage: 4,
					fixedWidth: '25%',
					focus: 'left',
				},
			},
		},
	);
	splide.mount();
} );
