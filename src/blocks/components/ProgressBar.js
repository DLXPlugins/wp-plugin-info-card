import PropTypes from 'prop-types'; // ES6
import { useEffect, useState } from '@wordpress/element';

const baseColor = '#99cc33';
const progressColor = '#4F8A10';

const ProgressBar = ( props ) => {
	const { percentage } = props;
	const [ lineStyle, setLineStyle ] = useState( {
		width: '0',
		backgroundColor: baseColor,
	} );

	useEffect( () => {
		setLineStyle( {
			width: getPercentage(),
			backgroundColor: progressColor,
		} );
	}, [ percentage ] );

	const getPercentage = () => {
		if ( percentage >= 100 ) {
			return '100%';
		}
		return percentage + '%';
	};

	return (
		<div className="wppic-line-count">
			<span style={ lineStyle }></span>
		</div>
	);
};

ProgressBar.defaultProps = {
	percentage: 0,
};

ProgressBar.propTypes = {
	percentage: PropTypes.number,
};

export default ProgressBar;
