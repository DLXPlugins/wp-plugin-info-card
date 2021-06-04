/* eslint-disable @wordpress/i18n-translator-comments */
import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
import PicIcon from '../components/PicIcon';
import StarRatings from 'react-star-ratings';

const { __, _n, sprintf } = wp.i18n;

const PluginWordPress = ( props ) => {
	const wrapperClasses = classnames( {
		wordpress: true,
		'wp-pic-wrapper': true,
		'wp-pic-card': true,
	} );
	const classes = classnames( props.scheme, `align${ props.align }`, {
		'wp-pic': true,
		'wp-pic-wordpress': true,
		wordpress: true,
		full: false,
		plugin: true,
	} );
	// WordPress Requires.
	let requires = props.data.requires;
	if ( isNumeric( requires ) ) {
		requires = 'WP ' + requires + '+';
	}

	return (
		<div className={ wrapperClasses }>
			<div className={ classes }>
				<div className="wp-pic-wordpress" style={ { display: 'none' } }>
					<div className="wp-pic-wordpress-content">
						<div className="wp-pic-plugin-card-top">
							<div className="wp-pic-column-name">
								<h3>
									{ props.data.name }
									<PicIcon
										image={ props.image }
										data={ props.data }
									/>
								</h3>
							</div>
							<div className="wp-pic-action-links">
								<span className="wp-pic-action-buttons">
									{ __( 'Download', 'wp-plugin-info-card' ) }
								</span>
							</div>
							<div className="wp-pic-column-description">
								<p>{ props.data.short_description }</p>
								<p className="authors">
									<cite>
										{ sprintf(
											__(
												'By %s',
												'wp-plugin-info-card'
											),
											props.data.author
										) }
									</cite>
								</p>
							</div>
						</div>
						<div className="wp-pic-plugin-card-bottom">
							<div
								className="wp-pic-column-rating"
								title={ sprintf(
									_n(
										'(based on %s rating)',
										'(based on %s ratings)',
										props.data.num_ratings,
										'wp-plugin-info-card'
									),
									props.data.num_ratings
								) }
							>
								<span
									className="wp-pic-num-ratings"
									aria-hidden="true"
								>
									<StarRatings
										rating={
											( props.data.rating / 100 ) * 5
										}
										starRatedColor="orange"
										starDimension="20px"
										starSpacing="0"
										numberOfStars={ 5 }
										name=""
									/>
									&nbsp; ({ props.data.num_ratings })
								</span>
							</div>
							<div className="wp-pic-column-updated">
								<strong>
									{ __(
										'Last Updated:',
										'wp-plugin-info-card'
									) }
								</strong>{ ' ' }
								{ props.data.last_updated }
							</div>
							<div className="wp-pic-column-downloaded">
								{ sprintf(
									__(
										'%s+ Active Installs',
										'wp-plugin-info-card'
									),
									props.data.active_installs
								) }
							</div>
							<div className="wp-pic-column-compatibility">
								<span className="wp-pic-compatibility-compatible">
									{ __(
										'Compatible with WordPress',
										'wp-plugin-info-card'
									) }{ ' ' }
									{ props.data.requires }
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PluginWordPress;
