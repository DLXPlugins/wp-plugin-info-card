import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
import ImageSelector from '../../blocks/components/ImageSelector/index.js';

const { __ } = wp.i18n;

const PluginLargeCustom = ( attributes ) => {
	const wrapperClasses = classnames( {
		large: true,
		'wp-pic-wrapper': true,
		'wp-pic-card': true,
	} );
	const classes = classnames( attributes.scheme, {
		'wp-pic': true,
		'wp-pic-card': true,
		large: true,
		plugin: true,
	} );
	// WordPress Requires.
	let requires = '3.7';
	if ( isNumeric( requires ) ) {
		requires = 'WP ' + '5.0' + '+';
	}
	let icon = '';

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
							<ImageSelector

							/>
							<span className="wp-pic-asset-bg-title">
								<span>Plugin Title</span>
							</span>
						</div>
						<div className="wp-pic-half-first">
							<span
								className="wp-pic-logo"
								style={ bgImageStyles }
							></span>
							<p className="wp-pic-author">
								{ __( 'Author(s):', 'wp-plugin-info-card' ) }{ ' ' }
								author
							</p>
							<p className="wp-pic-version">
								<span>
									Current Version
								</span>{ ' ' }
								2.0.0
							</p>
							<p className="wp-pic-updated">
								<span>
									Last Updated
								</span>{ ' ' }
								3 weeks ago
							</p>
						</div>
						<div className="wp-pic-half-last">
							<div className="wp-pic-bottom">
								<div className="wp-pic-bar">
									<span className="wp-pic-rating">
										100%{ ' ' }
										<em>
											Ratings
										</em>
									</span>
									<span className="wp-pic-downloaded">
										800
										{ '+' }{ ' ' }
										<em>
											Installs
										</em>
									</span>
									<span className="wp-pic-requires">
										3.7
										<em>
											Requires
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

export default PluginLargeCustom;
