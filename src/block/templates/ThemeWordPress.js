/* eslint-disable @wordpress/i18n-translator-comments */
import classnames from 'classnames';
import StarRatings from 'react-star-ratings';
import BannerWrapper from '../components/BannerWrapper';

const { __, _n, sprintf } = wp.i18n;

const ThemeWordPress = ( props ) => {
	const wrapperClasses = classnames( {
		wordpress: true,
		'wp-pic-wrapper': true,
		'wp-pic-card': true,
	} );
	const classes = classnames( props.scheme, {
		'wp-pic': true,
		'wp-pic-wordpress': true,
		wordpress: true,
		theme: true,
	} );
	return (
		<div className={ wrapperClasses }>
			<div className={ classes }>
				<div className="wp-pic-wordpress" style={ { display: 'none' } }>
					<div className="wp-pic-theme-card-top">
						<div className="wp-pic-theme-screenshot">
							<BannerWrapper
								name={ props.data.name }
								bannerImage={ props.data.banners }
								image={
									props.image || props.data.screenshot_url
								}
							/>
							<span className="wp-pic-theme-preview">
								{ __( 'Theme Preview', 'wp-plugin-info-card' ) }
							</span>
						</div>
						<h3>
							{ props.data.name }
							&nbsp;
							<span className="wp-pic-author">
								{ sprintf(
									__( 'By %s', 'wp-plugin-info-card' ),
									props.data.author
								) }
							</span>
						</h3>
						<div className="wp-pic-action-links">
							<span className="wp-pic-action-buttons">
								{ __( 'Download', 'wp-plugin-info-card' ) }
							</span>
						</div>
					</div>
					<div className="wp-pic-theme-card-bottom">
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
									rating={ ( props.data.rating / 100 ) * 5 }
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
								{ __( 'Last Updated:', 'wp-plugin-info-card' ) }
							</strong>{ ' ' }
							{ props.data.last_updated }
						</div>
						<div className="wp-pic-column-downloaded">
							{ sprintf(
								__( '%s+ Downloads', 'wp-plugin-info-card' ),
								props.data.downloaded
							) }
						</div>
						<div className="wp-pic-column-version">
							<span>
								{ __( 'Version', 'wp-plugin-info-card' ) }{ ' ' }
								{ props.data.version }
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThemeWordPress;
