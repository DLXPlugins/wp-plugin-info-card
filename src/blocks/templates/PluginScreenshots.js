import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import BannerWrapper from '../components/BannerWrapper';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

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
	if ( props.icons.svg ) {
		icon = props.icons.svg;
	} else if ( props.icons[ '2x' ] ) {
		icon = props.icons[ '2x' ];
	} else if ( props.icons[ '1x' ] ) {
		icon = props.icons[ '1x' ];
	} else {
		icon = props.defaultIcon;
	}

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
						<a href={ props.url } target="_blank" rel="noopener noreferrer" className="wp-pic-plugin-screenshots-avatar">
							<img src={ icon } width="125" height="125" alt={ props.name } />
						</a>
					</div>
					<div className="wp-pic-plugin-screenshots-title">
						<h2>{ props.name }</h2>
					</div>
					<div className="wp-pic-plugin-screenshots-author">
						{
							`${ __( 'By:', 'wp-plugin-info-card' ) } ${ props.author } | ${ __( 'Last Updated:', 'wp-plugin-info-card' ) } ${ props.last_updated }`
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
					</div>
					<div className="wp-pic-plugin-screenshots-description">
						{ htmlToReactParser.parse( props.short_description ) }
					</div>
					<div className="wp-pic-plugin-screenshots-meta">
						<div className="wp-pic-plugin-screenshots-meta-item">
							<div className="this-is-where-an-icon-would-be..."></div>
							<div className="wp-pic-plugin-screenshots-meta-item-label">
								v{ props.version}
							</div>
						</div>
						<div className="wp-pic-plugin-screenshots-meta-item">
							<div className="this-is-where-an-icon-would-be..."></div>
							<div className="wp-pic-plugin-screenshots-meta-item-label">
								{ __( 'Requires', 'wp-plugin-info-card' ) } { `${ requires }` }
							</div>
						</div>
						<div className="wp-pic-plugin-screenshots-meta-item">
							<div className="this-is-where-an-icon-would-be..."></div>
							<div className="wp-pic-plugin-screenshots-meta-item-label">
								{ props.active_installs.toLocaleString('en') } { __( 'Installs', 'wp-plugin-info-card' ) }
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PluginScreenshots;
