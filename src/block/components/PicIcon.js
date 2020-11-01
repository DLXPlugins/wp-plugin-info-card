const { Fragment } = wp.element;

const PicIcon = ( props ) => {
	let icon = props.defaultIcon;
	if ( props.image ) {
		icon = props.image;
	} else if ( props.data.icons.svg ) {
		icon = props.data.icons.svg;
	} else if ( props.data.icons[ '2x' ] ) {
		icon = props.data.icons[ '2x' ];
	} else if ( props.data.icons[ '1x' ] ) {
		icon = props.data.icons[ '1x' ];
	}

	return (
		<Fragment>
			<img
				src={ icon }
				className="wp-pic-plugin-icon"
				alt={ props.data.name }
			/>
		</Fragment>
	);
};

PicIcon.defaultProps = {
	name: '',
	image: false,
};

export default PicIcon;
