import React from 'react';
import Logo from '../Logo';

const LoadingImageProgressScreen = ( { totalImageCount, currentCount, label } ) => {
	return (
		<>
			<div className="wppic-loading-placeholder">
				<div className="wppic-loading">
					<Logo size="45" />
					<h2>{ label }</h2>
					<div className="progress-bar-wrapper" style={{ width: '100%' } }>
						<div className="progress-bar" style={{ display: 'flex', alignItems: 'center', width: '100%', height: '8px', background: '#DDDDDD', borderRadius: '10px', overflow: 'hidden' }}>
							<div className="progress-bar-inner" style={ { borderRadius: '10px', display: 'block', height: '4px', background: '#44873F', transition: "width 0.5s ease-in-out", width: `${ ( currentCount / totalImageCount ) * 100 }%` } }></div>
						</div>
						<div className="progress-bar-label" style={{ textAlign: 'center', marginTop: '15px' }}>
							{ currentCount } / { totalImageCount }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default LoadingImageProgressScreen;