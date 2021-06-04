import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
import BannerWrapper from '../components/BannerWrapper';

const { __ } = wp.i18n;

const PluginLarge = ( props ) => {
	const wrapperClasses = classnames( {
		large: true,
		'wp-pic-wrapper': true,
		'wp-pic-card': true,
	} );
	const classes = classnames( props.scheme, {
		'wp-pic': true,
		'wp-pic-card': true,
		large: true,
		plugin: true,
	} );
	// WordPress Requires.
	let requires = props.data.requires;
	if ( isNumeric( requires ) ) {
		requires = 'WP ' + requires + '+';
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
	return (
		<div className={ wrapperClasses }>
			<div className={ classes }>
				<div className="wp-pic-large" style={ { display: 'none' } }>
					<div className="wp-pic-large-content">
						<div className="wp-pic-asset-bg">
							<BannerWrapper
								name={ props.data.name }
								bannerImage={ props.data.banners }
								image={ props.image }
							/>
							<span className="wp-pic-asset-bg-title">
								<span>{ props.data.name }</span>
							</span>
						</div>
						<div className="wp-pic-half-first">
							<span
								className="wp-pic-logo"
								style={ bgImageStyles }
							></span>
							<p className="wp-pic-author">
								{ __( 'Author(s):', 'wp-plugin-info-card' ) }{ ' ' }
								{ props.data.author }
							</p>
							<p className="wp-pic-version">
								<span>
									{ __(
										'Current Version:',
										'wp-plugin-info-card'
									) }
								</span>{ ' ' }
								{ props.data.version }
							</p>
							<p className="wp-pic-updated">
								<span>
									{ __(
										'Last Updated:',
										'wp-plugin-info-card'
									) }
								</span>{ ' ' }
								{ props.data.last_updated }
							</p>
						</div>
						<div className="wp-pic-half-last">
							<div className="wp-pic-bottom">
								<div className="wp-pic-bar">
									<span className="wp-pic-rating">
										{ props.data.rating }%{ ' ' }
										<em>
											{ __(
												'Ratings',
												'wp-plugin-info-card'
											) }
										</em>
									</span>
									<span className="wp-pic-downloaded">
										{ props.data.active_installs }
										{ '+' }{ ' ' }
										<em>
											{ __(
												'Installs',
												'wp-plugin-info-card'
											) }
										</em>
									</span>
									<span className="wp-pic-requires">
										{ props.data.requires }
										<em>
											{ __(
												'Requires',
												'wp-plugin-info-card'
											) }
										</em>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PluginLarge;
