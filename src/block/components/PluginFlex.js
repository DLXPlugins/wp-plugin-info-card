const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const flexPlugin = ( props ) => {
	return (
		<div className="wp-pic-flip" style={ { display: none } }>
			<div className="wp-pic-face wp-pic-front">
				{ props.bannerImage && (
					<div className="wp-pic-banner-wrapper">
						<img src={ bannerImage } alt={ props.pluginName } />
					</div>
				) }
				<div className="wp-pic-name-wrapper">
					<span className="wp-pic-name">
						<strong>{ props.pluginName }</strong>
					</span>
				</div>
				<div className="wp-pic-version-wrapper">
					<p className="wp-pic-version">
						<span>{ __( 'Current Version:', 'wp-plugin-info-card' ) }</span>{ ' ' }
						{ props.pluginVersion }
					</p>
				</div>
				<div className="wp-pic-updated-wrapper">
					<p className="wp-pic-updated">
						<span>{ __( 'Last Updated:', 'wp-plugin-info-card' ) }</span>{ ' ' }
						{ props.pluginUpdated }
					</p>
				</div>
				<div className="wp-pic-tested-wrapper">
					<p className="wp-pic-tested">
						<span>{ __( 'Tested Up To:', 'wp-plugin-info-card' ) }</span>{ ' ' }
						{ props.pluginTested }
					</p>
				</div>
				<div className="wp-pic-author-wrapper">
					<p className="wp-pic-author">
						{ __( 'Author(s):', 'wp-plugin-info-card' ) } { props.pluginAuthor }
					</p>
				</div>
				<div className="wp-pic-bottom">
					<div className="wp-pic-bar">
						<span className="wp-pic-rating">
							{ props.pluginRating }%{ ' ' }
							<em>{ __( 'Ratings', 'wp-plugin-info-card' ) }</em>
						</span>
						<span className="wp-pic-downloaded">
							{ props.pluginActiveInstalls } { '+' }{ ' ' }
							<em>{ __( 'Installs', 'wp-plugin-info-card' ) }</em>
						</span>
						<span className="wp-pic-requires">
							{ props.pluginRequires }
							<em>{ __( 'Requires', 'wp-plugin-info-card' ) }</em>
						</span>
					</div>
					<div className="wp-pic-download-link">
						<span>
							<span>
								{ __( 'Download', 'wp-plugin-info-card' ) } { props.pluginName }
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default flexPlugin;
