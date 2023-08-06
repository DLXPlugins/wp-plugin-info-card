import classnames from 'classnames';
import isNumeric from 'validator/lib/isNumeric';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { __ } = wp.i18n;

const PluginCard = ( props ) => {
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
				<div className="wp-pic-flip" style={ { display: 'none' } }>
					<div className="wp-pic-face wp-pic-front">
						<span
							className="wp-pic-logo"
							style={ bgImageStyles }
						></span>
						<span className="wp-pic-name">{ htmlToReactParser.parse( props.data.name ) }</span>
						<p className="wp-pic-author">
							{ __( 'Author(s):', 'wp-plugin-info-card' ) }{ ' ' }
							{ htmlToReactParser.parse( props.data.author ) }
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

export default PluginCard;
