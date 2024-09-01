import PropTypes from 'prop-types'; // ES6

const AvatarIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={ props.width }
			height={ props.height }
			data-name="Layer 1"
			viewBox="0 0 24 24"
		>
			<path fill={ props.fill } d="M19 2H5C2.24 2 0 4.24 0 7v10c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5Zm-7 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4ZM7.64 20c-.64 0-1.02-.72-.67-1.26C8.04 17.09 9.89 16 12 16s3.97 1.09 5.03 2.74c.35.54-.03 1.26-.67 1.26H7.64Z" />
		</svg>
	);
};

AvatarIcon.defaultProps = {
	width: 24,
	height: 24,
	fill: '#333333',
};

AvatarIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default AvatarIcon;
