import React from 'react';
import { BarLoader } from 'react-spinners'
import Logo from '../Logo';
const { Spinner } = wp.components;

const LoadingScreen = ( props ) => {
	return (
		<>
			<div className="wppic-loading-placeholder">
				<div className="wppic-loading">
					<Logo size="45" />
					<h2>{ props.label }</h2>
					<div className="wppic-spinner">
						<BarLoader
							color={ '#DB3939' }
							speedMultiplier={ 1 }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default LoadingScreen;