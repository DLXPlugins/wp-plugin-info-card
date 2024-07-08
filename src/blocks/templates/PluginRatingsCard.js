import React, { useState } from 'react';
import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
import { Rating } from 'react-simple-star-rating';
import { Code, DownloadCloud, Star, LineChart, Download } from 'lucide-react';
import WordPressIcon from '../components/WordPressIcon';

const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { __, sprintf } = wp.i18n;

const PluginRatingsCard = ( props ) => {
	const { data, scheme, image, align } = props;
	const [ rating, setRating ] = useState( data.rating );
	const ratingOneToFive = rating / 20;
	const wrapperClasses = classnames( {
		'wp-pic-wrapper': true,
		'wp-pic-card': true,
	} );
	const classes = classnames( props.scheme, {
		'wp-pic': true,
		'wp-pic-card': true,
		plugin: true,
	} );
	// WordPress Requires.
	let requires = props.data.requires;
	if ( requires && isNumeric( requires ) ) {
		requires = 'WP ' + requires + '+';
	} else {
		requires = props.data.tested;
	}
	let icon = '';
	if ( props.data.icons.svg ) {
		icon = props.data.icons.svg;
	} else if ( props.data.icons[ '2x' ] ) {
		icon = props.data.icons[ '2x' ];
	} else if ( props.data.icons[ '1x' ] ) {
		icon = props.data.icons[ '1x' ];
	} else {
		icon = props.defaultIcon;
	}

	const bgImageStyles = {
		backgroundImage: `url(${ icon })`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	};
	const htmlToReactParser = new HtmlToReactParser();

	return (
		<div className={ wrapperClasses }>
			<div className={ classes }>
				<div className="wp-pic-ratings wp-pic-plugin-ratings">
					<div className="wp-pic-ratings wp-pic-ratings-front">
						<div
							className="wp-pic-logo"
							style={ bgImageStyles }
						></div>
						<div className="wp-pic-rating-row">
							<Rating
								initialValue={ ratingOneToFive }
								readonly={ true }
								allowFraction={ true }
								allowHover={ false }
								disableFillHover={ true }
								fillColor="var( --wppic-plugin-ratings-card-star-color )"
							/>
						</div>
						<div className="wp-pic-name">{ htmlToReactParser.parse( props.data.name ) }</div>
						<div className="wp-pic-rating-stats">
							{ `Based on ${ props.data.num_ratings.toLocaleString( 'en' ) } ratings` }
						</div>
						<div className="wp-pic-ratings-last-updated">
							{ sprintf( __( 'Last Updated: %s ago', 'wp-plugin-info-card' ), data.last_updated_human_time ) }
						</div>
						<div className="wp-pic-bottom">
							<div className="wp-pic-bar">
								<div className="wp-pic-bar-item">
									<div className="wp-pic-plugin-screenshots-meta-item-svg">
										<Code />
									</div>
									<div className="wp-pic-plugin-screenshots-meta-item-label">
										v{ data.version }
									</div>
								</div>
								<div className="wp-pic-bar-item">
									<div className="wp-pic-plugin-screenshots-meta-item-svg">
										<WordPressIcon fill="currentColor" />
									</div>
									<div className="wp-pic-plugin-screenshots-meta-item-label">
										{ `${ requires }` }
									</div>
								</div>
								<div className="wp-pic-bar-item">
									<div className="wp-pic-plugin-screenshots-meta-item-svg">
										<DownloadCloud />
									</div>
									<div className="wp-pic-plugin-screenshots-meta-item-label">
										{ data.active_installs.toLocaleString( 'en' ) } { __( 'Installs', 'wp-plugin-info-card' ) }
									</div>
								</div>
							</div>
							<div className="wp-pic-download">
								<span>
									{ __( 'Download', 'wp-plugin-info-card' ) }
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PluginRatingsCard;
