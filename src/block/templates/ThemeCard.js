import classnames from 'classnames';

const { __ } = wp.i18n;

const ThemeCard = ( props ) => {
	const wrapperClasses = classnames( {
		'wp-pic-wrapper': true,
		'wp-pic-card': true,
	} );
	const classes = classnames( props.scheme, {
		'wp-pic': true,
		'wp-pic-card': true,
		theme: true,
	} );

	const banner = props.image || props.data.screenshot_url;

	const bgImageStyles = {
		backgroundImage: `url(${ banner })`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	};

	return (
		<div className={ wrapperClasses }>
			<div className={ classes }>
				<div className="wp-pic-flip" style={ { display: 'none' } }>
					<div className="wp-pic-face wp-pic-front">
						<span
							className="wp-pic-logo"
							style={ bgImageStyles }
						></span>
						<span className="wp-pic-name">{ props.data.name }</span>
						<p className="wp-pic-author">
							{ __( 'Author(s):', 'wp-plugin-info-card' ) }{ ' ' }
							{ props.data.author }
						</p>
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
									{ props.data.downloaded }
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
							<div className="wp-pic-download">
								<span>
									{ __( 'More info', 'wp-plugin-info-card' ) }
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThemeCard;
