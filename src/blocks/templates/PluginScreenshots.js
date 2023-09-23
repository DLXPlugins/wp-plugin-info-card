import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
import { useState, useEffect, useRef } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Code, DownloadCloud, Star, LineChart, Download } from 'lucide-react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
const HtmlToReactParser = require( 'html-to-react' ).Parser;
import WordPressIcon from '../components/WordPressIcon';
import { uniqueId } from 'lodash';

const { __, sprintf } = wp.i18n;

const PluginScreenshots = ( props ) => {
	const { assetData, attributes, isPreview = false } = props;

	const [ screenshots, setScreenshots ] = useState( null );
	const [ rating, setRating ] = useState( assetData.rating );

	const wrapperClasses = classnames( {
		large: true,
		'wp-pic-plugin-screenshots-wrapper': true,
		'wp-pic-card': true,
	} );
	const classes = classnames( `wppic-plugin-screenshot-theme-${ attributes.colorTheme }`, {
		'wp-pic-plugin-screenshots': true,
		'wp-pic-screenshots': true,
		large: true,
		plugin: true,
		'wp-pic-has-screenshots': ( null !== screenshots && screenshots.length > 0 ) ? true : false,
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
			icon = wppic.wppic_plugin_icon_default;
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

	let blockStyles = '';
	let customMatch = false;
	// Check to see if color theme has `custom` in the name.
	if ( attributes.customColors && ! isPreview ) {
		customMatch = true;
		blockStyles = `
			#${ attributes.uniqueId } {
				--wppic-plugin-screenshots-card-background: ${ attributes.colorBackground };
				--wppic-plugin-screenshots-card-text-color: ${ attributes.colorText };
				--wppic-plugin-screenshots-card-border-color: ${ attributes.colorBorder };
				--wppic-plugin-screenshots-card-menu-border-color: ${ attributes.colorMenuBorder };
				--wppic-plugin-screenshots-card-menu-color: ${ attributes.colorMenu };
				--wppic-plugin-screenshots-card-menu-color-hover: ${ attributes.colorMenuHover };
				--wppic-plugin-screenshots-card-menu-text-color: ${ attributes.colorMenuText };
				--wppic-plugin-screenshots-card-menu-text-color-hover: ${ attributes.colorMenuTextHover };
				--wppic-plugin-screenshots-card-screenshots-background: ${ attributes.colorScreenshotsBackground };
				--wppic-plugin-screenshots-card-screenshots-border-color: ${ attributes.colorScreenshotsBorder };
				--wppic-plugin-screenshots-card-screenshots-star-color: ${ attributes.colorStar };
				--wppic-plugin-screenshots-card-meta-background-color: ${ attributes.colorMetaBackground };
				--wppic-plugin-screenshots-card-meta-text-color: ${ attributes.colorMetaText };
				--wppic-plugin-screenshots-card-screenshots-arrow-background-color: ${ attributes.colorScreenshotsArrowBackground };
				--wppic-plugin-screenshots-card-screenshots-arrow-background-color-hover: ${ attributes.colorScreenshotsArrowBackgroundHover };
				--wppic-plugin-screenshots-card-screenshots-arrow-color: ${ attributes.colorScreenshotsArrow };
				--wppic-plugin-screenshots-card-screenshots-arrow-color-hover: ${ attributes.colorScreenshotsArrowHover };
			}
		`;
	}

	return (
		<div className={ wrapperClasses }>
			<style>{ blockStyles }</style>
			<div className={ classes } id={ customMatch ? attributes.uniqueId : null }>
				<div className="wp-pic-plugin-screenshots-card">
					<div className="wp-pic-plugin-screenshots-avatar-wrapper">
						<a href={ assetData.url } onClick={ ( e ) => e.preventDefault() } target="_blank" rel="noopener noreferrer" className={
							classnames( `wp-pic-plugin-screenshots-avatar style-${ attributes.iconStyle }`,
								{
									'is-rounded': attributes.enableRoundedIcon,
								} ) }>
							<img src={ icon } width="125" height="125" alt={ assetData.name } />
						</a>
						{ attributes.enableContextMenu && (
							<div className="wppic-meatball-menu wppic-meatball-menu-theme-light" style={ { display: 'none' } }>
								<div className="wppic-meatball-content">
									<input
										type="checkbox"
										aria-label={ __( 'Toggle Plugin Actions', 'wp-plugin-info-card' ) }
									/>
									<ul>
										<li className="wppic-meatball-menu-item wppic-meatball-menu-item-edit-comment" data-comment-action="edit">
											<a href="#" className="button-reset" onClick={ ( e ) => e.preventDefault() }>
												<span className="wppic-meatball-menu-icon">
													<WordPressIcon />
												</span>
												<span className="wppic-meatball-menu-label">
													{ __( 'View Plugin Page', 'wp-plugin-info-card' ) }
												</span>
											</a>
										</li>
										<li className="wppic-meatball-menu-item wppic-meatball-menu-item-approve-comment" data-comment-action="approve">
											<a href="#" className="button-reset" onClick={ ( e ) => e.preventDefault() }>
												<span className="wppic-meatball-menu-icon">
													<Star />
												</span>
												<span className="wppic-meatball-menu-label">
													{ __( 'View Ratings', 'wp-plugin-info-card' ) }
												</span>
											</a>
										</li>
										<li className="wppic-meatball-menu-item wppic-meatball-menu-item-approve-comment" data-comment-action="approve">
											<a href="#" className="button-reset" onClick={ ( e ) => e.preventDefault() }>
												<span className="wppic-meatball-menu-icon">
													<LineChart />
												</span>
												<span className="wppic-meatball-menu-label">
													{ __( 'View Plugin Stats', 'wp-plugin-info-card' ) }
												</span>
											</a>
										</li>
										<li className="wppic-meatball-menu-item wppic-meatball-menu-item-moderate-comment" data-comment-action="pending">
											<a href="#" className="button-reset" onClick={ ( e ) => e.preventDefault() }>
												<span className="wppic-meatball-menu-icon">
													<Download />
												</span>
												<span className="wppic-meatball-menu-label">
													{ __( 'Download Plugin', 'wp-plugin-info-card' ) }
												</span>
											</a>
										</li>
									</ul>
									<div className="wppic-meatball-icon-wrapper" aria-hidden="true">
										<div className="wppic-meatball-icon">
											<span></span>
										</div>
									</div>
								</div>
							</div>
						) }
					</div>
					<div className="wp-pic-plugin-screenshots-title">
						<h2>{ '' === attributes.pluginTitle ? assetData.name : attributes.pluginTitle }</h2>
					</div>
					<div className="wp-pic-plugin-screenshots-author">
						{
							`${ __( 'By:', 'wp-plugin-info-card' ) } ${ assetData.author }`
						}
					</div>
					<div className="wp-pic-plugin-screenshots-rating">
						<Rating
							initialValue={ ratingOneToFive }
							readonly={ true }
							allowFraction={ true }
							allowHover={ false }
							disableFillHover={ true }
							fillColor="var( --wppic-plugin-screenshots-card-screenshots-star-color )"
						/>
						<span className="wp-pic-plugin-screenshots-rating-count">{ assetData.num_ratings.toLocaleString( 'en' ) } { __( 'Ratings', 'wp-plugin-info-card' ) }</span>
					</div>
					<div className="wp-pic-plugin-screenshots-last-updated">
						{ sprintf( __( 'Last Updated: %s ago', 'wp-plugin-info-card' ), assetData.last_updated_human_time ) }
					</div>
					<div className="wp-pic-plugin-screenshots-description">
						{ htmlToReactParser.parse( assetData.short_description ) }
					</div>
				</div>
				<footer className="wp-pic-plugin-screenshots-footer">
					{
						( Object.values( pluginScreenshots ).length > 0 && attributes.enableScreenshots ) && (
							<div className="wp-pic-plugin-screenshots-images">
								<Splide
									options={
										{
											type: 'loop',
											width: '100%',
											gap: '20px',
											rewind: true,
											perPage: ( Object.values( pluginScreenshots ).length > 3 ) ? 3 : Object.values( pluginScreenshots ).length,
											perMove: 1,
											arrows: ( Object.values( pluginScreenshots ).length > 3 ) ? true : false,
											pagination: false,
											drag: true,
											autoplay: false,
											lazyload: 'nearby',
											perPage: Object.values( pluginScreenshots ).length < 2 ? 1 : 2,
											mediaQuery: 'min',
											breakpoints: {
												500: {
													perPage: Object.values( pluginScreenshots ).length < 3 ? Object.values( pluginScreenshots ).length : 3,
												},
												625: {
													perPage: Object.values( pluginScreenshots ).length < 4 ? Object.values( pluginScreenshots ).length : 4,
												},
											},
										}
									}
								>
									{
										Object.values( pluginScreenshots ).map( ( screenshot, index ) => {
											return (
												<SplideSlide className="wp-pic-plugin-screenshots-image" key={ index }>
													<a href={ screenshot.full } data-fancybox data-caption={ screenshot.caption } onClick={ ( e ) => e.preventDefault() }>
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
					<div className="wp-pic-plugin-screenshots-meta">
						<div className="wp-pic-plugin-screenshots-meta-item">
							<div className="wp-pic-plugin-screenshots-meta-item-svg">
								<Code />
							</div>
							<div className="wp-pic-plugin-screenshots-meta-item-label">
								v{ assetData.version }
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
								{ assetData.active_installs.toLocaleString( 'en' ) } { __( 'Installs', 'wp-plugin-info-card' ) }
							</div>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default PluginScreenshots;
