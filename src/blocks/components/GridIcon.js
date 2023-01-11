import PropTypes from 'prop-types'; // ES6

const GridIcon = ( props ) => {
	return (
		<svg
			height={ props.width }
			viewBox="0 0 122.88 122.88"
			width={ props.height }
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill={ props.fill }
				d="M0 0v122.88h122.88V0zm115.2 38.4H84.479V7.68H115.2zM46.08 76.8V46.08H76.8V76.8zm30.72 7.68v30.72H46.08V84.48zM38.4 76.8H7.68V46.08H38.4zm7.68-38.4V7.68H76.8V38.4zm38.399 7.68H115.2V76.8H84.479zM38.4 7.68V38.4H7.68V7.68zM7.68 84.48H38.4v30.72H7.68zm76.799 30.72V84.48H115.2v30.72z"
			/>
		</svg>
	);
};

GridIcon.defaultProps = {
	width: 24,
	height: 24,
	fill: '#333333',
};

GridIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default GridIcon;
