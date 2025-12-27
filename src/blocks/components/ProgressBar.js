import { useEffect, useState } from '@wordpress/element';

const baseColor = '#99cc33';
const progressColor = '#4F8A10';

const ProgressBar = ( { percentage = 0 } ) => {
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

export default ProgressBar;
