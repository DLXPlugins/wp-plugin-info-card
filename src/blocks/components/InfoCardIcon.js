import PropTypes from 'prop-types'; // ES6

const InfoCardIcon = ( props ) => {
	return (
		<svg
			version="1.1"
			id="Calque_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width={ props.width }
			height={ props.height }
			viewBox="0 0 850.39 850.39"
			enableBackground="new 0 0 850.39 850.39"
		>
			<path
				fill={ props.fill }
				d="M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39
c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451
l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07
h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887
l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"
			/>
		</svg>
	);
};

InfoCardIcon.defaultProps = {
	width: 24,
	height: 24,
	fill: '#DB3939',
};

InfoCardIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default InfoCardIcon;
