import React, { useState } from 'react';
import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
import { Rating } from 'react-simple-star-rating';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { __ } = wp.i18n;

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
							{ `Rating based on ${ props.data.num_ratings } ratings` }
						</div>
						<div className="wp-pic-bottom">
							<div className="wp-pic-bar">
								<span className="wp-pic-rating">
									{ props.data.rating }%
									<em>
										{ __(
											'Ratings',
											'wp-plugin-info-card'
										) }
									</em>
								</span>
								<span className="wp-pic-downloaded">
									{ props.data.active_installs.toLocaleString('en') }+
									<em>
										{ __(
											'Installs',
											'wp-plugin-info-card'
										) }
									</em>
								</span>
								<span className="wp-pic-requires">
									{ requires }
									<em>
										{ __(
											'Requires',
											'wp-plugin-info-card'
										) }
									</em>
								</span>
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
