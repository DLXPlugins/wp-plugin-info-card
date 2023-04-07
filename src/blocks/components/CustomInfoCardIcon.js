import PropTypes from 'prop-types'; // ES6

const CustomInfoCardIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={ props.width }
			height={ props.height }
			viewBox="0 0 110 110"
		>
			<path
				fill={ props.fill }
				d="M49 75c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm16-24c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm45 4c0 30.4-24.6 55-55 55S0 85.4 0 55 24.6 0 55 0s55 24.6 55 55zM85 72H54.5c-1.3-4.1-5.1-7-9.5-7s-8.3 2.9-9.5 7H25v6h10.5c1.3 4.1 5.1 7 9.5 7s8.3-2.9 9.5-7H85zm0-20H74.5c-1.3-4.1-5.1-7-9.5-7s-8.3 2.9-9.5 7H25v6h30.5c1.3 4.1 5.1 7 9.5 7s8.3-2.9 9.5-7H85zm0-20H54.5c-1.3-4.1-5.1-7-9.5-7s-8.3 2.9-9.5 7H25v6h10.5c1.3 4.1 5.1 7 9.5 7s8.3-2.9 9.5-7H85zm-40-1c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
			/>
		</svg>
	);
};

CustomInfoCardIcon.defaultProps = {
	width: 24,
	height: 24,
	fill: '#DB3939',
};

CustomInfoCardIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default CustomInfoCardIcon;
