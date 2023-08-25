import PropTypes from 'prop-types'; // ES6

const SwitchIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={ props.width }
			height={ props.height }
			aria-hidden="true"
		>
			<path
				fill={ props.fill }
				d="M14.5 13.8c-1.1 0-2.1.7-2.4 1.8H4V17h8.1c.3 1 1.3 1.8 2.4 1.8s2.1-.7 2.4-1.8H20v-1.5h-3.1c-.3-1-1.3-1.7-2.4-1.7zM11.9 7c-.3-1-1.3-1.8-2.4-1.8S7.4 6 7.1 7H4v1.5h3.1c.3 1 1.3 1.8 2.4 1.8s2.1-.7 2.4-1.8H20V7h-8.1z"
			/>
		</svg>
	);
};

SwitchIcon.defaultProps = {
	width: 24,
	height: 24,
	fill: '#333333',
};

SwitchIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default SwitchIcon;
