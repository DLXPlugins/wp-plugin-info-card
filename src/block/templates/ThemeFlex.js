import classnames from 'classnames';
import BannerWrapper from '../components/BannerWrapper';

const { __ } = wp.i18n;

const PluginFlex = ( props ) => {
	const wrapperClasses = classnames( {
		flex: true,
		'wp-pic-wrapper': true,
		'wp-pic-card': true,
	} );
	const classes = classnames( props.scheme, {
		'wp-pic': true,
		flex: true,
		'wp-pic-card': true,
		theme: true,
	} );
	return (
		<div className={ wrapperClasses }>
			<div className={ classes }>
				<div className="wp-pic-flip" style={ { display: 'none' } }>
					<div className="wp-pic-face wp-pic-front">
						<BannerWrapper
							name={ props.data.name }
							bannerImage={ props.data.banners }
							image={ props.image || props.data.screenshot_url }
						/>
						<div className="wp-pic-name-wrapper">
							<span className="wp-pic-name">
								<strong>{ props.data.name }</strong>
							</span>
						</div>
						<div className="wp-pic-preview-wrapper">
							<span className="wp-pic-preview">
								<span>
									{ __(
										'Theme Preview',
										'wp-plugin-info-card'
									) }
								</span>
							</span>

							<div className="wp-pic-updated-wrapper">
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
							<div className="wp-pic-author-wrapper">
								<p className="wp-pic-author">
									{ __(
										'Author(s):',
										'wp-plugin-info-card'
									) }{ ' ' }
									{ props.data.author }
								</p>
							</div>

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
									<span className="wp-pic-version">
										{ props.data.version }
										<em>
											{ __(
												'Version',
												'wp-plugin-info-card'
											) }
										</em>
									</span>
								</div>
								<div className="wp-pic-download-link">
									<span>
										<span>
											{ __(
												'Download',
												'wp-plugin-info-card'
											) }{ ' ' }
											{ props.data.name }
										</span>
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

export default PluginFlex;
