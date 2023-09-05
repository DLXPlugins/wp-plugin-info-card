import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
import { useState, useEffect, useRef } from 'react';
import { Rating } from 'react-simple-star-rating'
import { Code, DownloadCloud } from 'lucide-react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
const HtmlToReactParser = require( 'html-to-react' ).Parser;
import WordPressIcon from '../components/WordPressIcon';

const { __ } = wp.i18n;

const PluginScreenshots = ( props) => {

	const { assetData, attributes } = props;

	const { maxHeight } = attributes;

	const [ screenshots, setScreenshots ] = useState( null );
	const [ rating, setRating ] = useState( assetData.rating );

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
	let requires = assetData.requires;
	if ( requires && isNumeric( requires ) ) {
		requires = 'WP ' + requires + '+';
	} else {
		requires = assetData.tested;
	}
	let icon = '';
	if ( assetData.hasOwnProperty( 'icons' ) ) {
		if ( assetData.icons.hasOwnProperty( 'svg' ) ) {
			icon = assetData.icons.svg;
		} else if ( assetData.icons.hasOwnProperty( '2x' ) ) {
			icon = assetData.icons[ '2x' ];
		} else if ( assetData.icons.hasOwnProperty( '1x' ) ) {
			icon = assetData.icons[ '1x' ];
		} else {
			icon = assetData.defaultIcon;
		}
	}

	const pluginScreenshots = assetData?.local_screenshots ?? [];
	
	const bgImageStyles = {
		backgroundImage: `url(${ icon })`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	};
	const htmlToReactParser = new HtmlToReactParser();

	const ratingOneToFive = rating / 20;

	return (
		<div className={ wrapperClasses }>
			<div className={ classes }>
				<div className="wp-pic-plugin-screenshots-card">
					<div className="wp-pic-plugin-screenshots-avatar-wrapper">
						<a href={ assetData.url } onClick={ ( e ) => e.preventDefault() } target="_blank" rel="noopener noreferrer" className="wp-pic-plugin-screenshots-avatar">
							<img src={ icon } width="125" height="125" alt={ assetData.name } />
						</a>
					</div>
					<div className="wp-pic-plugin-screenshots-title">
						<h2>{ assetData.name }</h2>
					</div>
					<div className="wp-pic-plugin-screenshots-author">
						{
							`${ __( 'By:', 'wp-plugin-info-card' ) } ${ assetData.author }`
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
						<span className="wp-pic-plugin-screenshots-rating-count">{ assetData.num_ratings.toLocaleString('en') } { __( 'Ratings', 'wp-plugin-info-card' ) }</span>
					</div>
					<div className="wp-pic-plugin-screenshots-description">
						{ htmlToReactParser.parse( assetData.short_description ) }
					</div>
					<div className="wp-pic-plugin-screenshots-meta">
						<div className="wp-pic-plugin-screenshots-meta-item">
							<div className="wp-pic-plugin-screenshots-meta-item-svg">
								<Code />
							</div>
							<div className="wp-pic-plugin-screenshots-meta-item-label">
								v{ assetData.version}
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
								{ assetData.active_installs.toLocaleString('en') } { __( 'Installs', 'wp-plugin-info-card' ) }
							</div>
						</div>
					</div>
					{
						( Object.values( pluginScreenshots ).length > 0 && attributes.enableScreenshots ) && (
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
											perPage: 2,
											mediaQuery: 'min',
											breakpoints: {
												'500': {
													perPage: 3,
												},
												'625': {
													perPage: 4,
												},
											}
										}
									}
								>
								{
									Object.values( pluginScreenshots ).map( ( screenshot, index ) => {
										return (
											<SplideSlide className="wp-pic-plugin-screenshots-image" key={ index }>
												<a href={ screenshot.full } data-fancybox data-caption={ screenshot.caption }>
													<img src={ screenshot[ attributes.imageSize ] } alt={ screenshot.alt } />
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
