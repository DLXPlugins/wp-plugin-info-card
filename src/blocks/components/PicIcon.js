const { Fragment } = wp.element;

const PicIcon = ( { defaultIcon, image = false, data } ) => {
	let icon = defaultIcon;
	if ( image ) {
		icon = image;
	} else if ( data.icons.svg ) {
		icon = data.icons.svg;
	} else if ( data.icons[ '2x' ] ) {
		icon = data.icons[ '2x' ];
	} else if ( data.icons[ '1x' ] ) {
		icon = data.icons[ '1x' ];
	}

	return (
		<Fragment>
			<img
				src={ icon }
				className="wp-pic-plugin-icon"
				alt={ data.name }
			/>
		</Fragment>
	);
};

export default PicIcon;
