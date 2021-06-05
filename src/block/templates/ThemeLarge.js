import classnames from 'classnames';
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
		theme: true,
	} );

	return (
		<div className={ wrapperClasses }>
			<div className={ classes }>
				<div className="wp-pic-large" style={ { display: 'none' } }>
					<div className="wp-pic-large-content">
						<div className="wp-pic-asset-bg">
							<BannerWrapper
								name={ props.data.name }
								bannerImage={ props.data.banners }
								image={
									props.image || props.data.screenshot_url
								}
							/>
							<span className="wp-pic-asset-bg-title">
								<span>{ props.data.name }</span>
							</span>
						</div>
						<div className="wp-pic-half-first">
							<span className="wp-pic-logo" href="#"></span>
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
										{ props.data.downloaded }
										{ '+' }{ ' ' }
										<em>
											{ __(
												'Downloads',
												'wp-plugin-info-card'
											) }
										</em>
									</span>
									<span className="wp-pic-requires">
										{ props.data.version }
										<em>
											{ __(
												'Version',
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
