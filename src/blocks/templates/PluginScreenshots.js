import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import { Code, DownloadCloud } from 'lucide-react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
const HtmlToReactParser = require( 'html-to-react' ).Parser;
import WordPressIcon from '../components/WordPressIcon';

const { __ } = wp.i18n;

const PluginScreenshots = ( props ) => {
	const [ screenshots, setScreenshots ] = useState( null );
	const [ rating, setRating ] = useState( props.rating );

	const wrapperClasses = classnames( {
		large: true,
		'wp-pic-plugin-screenshots-wrapper': true,
		'wp-pic-card': true,
	} );
	const classes = classnames( 'scheme', {
		'wp-pic-plugin-screenshots': true,
		'wp-pic-screenshots': true,
		large: true,
		plugin: true,
		'wp-pic-has-screenshots': ( null !== screenshots && screenshots.length > 0  ) ? true : false
	} );
	// WordPress Requires.
	let requires = props.requires;
	if ( requires && isNumeric( requires ) ) {
		requires = 'WP ' + requires + '+';
	} else {
		requires = props.tested;
	}
	let icon = '';
	if ( props.hasOwnProperty( 'icons' ) ) {
		if ( props.icons.hasOwnProperty( 'svg' ) ) {
			icon = props.icons.svg;
		} else if ( props.icons.hasOwnProperty( '2x' ) ) {
			icon = props.icons[ '2x' ];
		} else if ( props.icons.hasOwnProperty( '1x' ) ) {
			icon = props.icons[ '1x' ];
		} else {
			icon = props.defaultIcon;
		}
	}

	const pluginScreenshots = props?.local_screenshots ?? [];
	
console.log( Object.values( pluginScreenshots ) );
	const bgImageStyles = {
		backgroundImage: `url(${ icon })`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	};
	const htmlToReactParser = new HtmlToReactParser();

	const ratingOneToFive = rating / 20;

	return (
		<div className={ wrapperClasses } style={ { maxWidth: '400px' } }>
			<div className={ classes }>
				<div className="wp-pic-plugin-screenshots-card">
					<div className="wp-pic-plugin-screenshots-avatar-wrapper">
						<a href={ props.url } onClick={ ( e ) => e.preventDefault() } target="_blank" rel="noopener noreferrer" className="wp-pic-plugin-screenshots-avatar">
							<img src={ icon } width="125" height="125" alt={ props.name } />
						</a>
					</div>
					<div className="wp-pic-plugin-screenshots-title">
						<h2>{ props.name }</h2>
					</div>
					<div className="wp-pic-plugin-screenshots-author">
						{
							`${ __( 'By:', 'wp-plugin-info-card' ) } ${ props.author }`
						}
					</div>
					<div className="wp-pic-plugin-screenshots-rating">
						<Rating
							initialValue={ ratingOneToFive}
							readonly={ true }
							allowFraction={ true }
							allowHover={ false }
							disableFillHover={ true }
						/>
						<span className="wp-pic-plugin-screenshots-rating-count">{ props.num_ratings.toLocaleString('en') } { __( 'Ratings', 'wp-plugin-info-card' ) }</span>
					</div>
					<div className="wp-pic-plugin-screenshots-description">
						{ htmlToReactParser.parse( props.short_description ) }
					</div>
					<div className="wp-pic-plugin-screenshots-meta">
						<div className="wp-pic-plugin-screenshots-meta-item">
							<div className="wp-pic-plugin-screenshots-meta-item-svg">
								<Code />
							</div>
							<div className="wp-pic-plugin-screenshots-meta-item-label">
								v{ props.version}
							</div>
						</div>
						<div className="wp-pic-plugin-screenshots-meta-item">
							<div className="wp-pic-plugin-screenshots-meta-item-svg">
								<WordPressIcon />
							</div>
							<div className="wp-pic-plugin-screenshots-meta-item-label">
								{ __( 'Requires', 'wp-plugin-info-card' ) } { `${ requires }` }
							</div>
						</div>
						<div className="wp-pic-plugin-screenshots-meta-item">
							<div className="wp-pic-plugin-screenshots-meta-item-svg">
								<DownloadCloud />
							</div>
							<div className="wp-pic-plugin-screenshots-meta-item-label">
								{ props.active_installs.toLocaleString('en') } { __( 'Installs', 'wp-plugin-info-card' ) }
							</div>
						</div>
					</div>
					{
						Object.values( pluginScreenshots ).length > 0 && (
							<div className="wp-pic-plugin-screenshots-images">
								<Splide
									options={
										{
											type: 'loop',
											width:  '100%',
											gap: '20px',
											rewind: true,
											perPage: ( Object.values( pluginScreenshots ).length > 3 ) ? 3 : Object.values( pluginScreenshots ).length,
											perMove: 1,
											arrows: ( Object.values( pluginScreenshots ).length > 3 ) ? true : false,
											pagination: false,
											drag: true,
											autoplay: false,
											lazyload: true,
											breakpoints: {
												'400': {
													perPage: 1,
													width: '100%',
													fixedWidth: '33.33333%',
												},
												'800': {
													perPage: 3,
													width: '33.3333%',
												},
											}
										}
									}
								>
								{
									Object.values( pluginScreenshots ).map( ( screenshot, index ) => {
										console.log( screenshot );
										return (
											<SplideSlide className="wp-pic-plugin-screenshots-image" key={ index }>
												<a href={ screenshot.full } data-fancybox data-caption={ screenshot.caption }>
													<img src={ screenshot.thumbnail } alt={ screenshot.alt } />
												</a>
											</SplideSlide>
										);
									} )
								}
								</Splide>
							</div>
						)
					}
				</div>
			</div>
		</div>
	);
};

export default PluginScreenshots;
