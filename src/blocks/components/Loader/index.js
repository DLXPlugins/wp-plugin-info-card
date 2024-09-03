import React from 'react';
import {
	Spinner,
} from '@wordpress/components';

import Logo from '../../Logo';

const Loader = () => {
	return (
		<>
			<div className="wppic-loading-placeholder">
				<div className="wppic-loading">
					<Logo size="45" />
					<br />
					<div className="wppic-spinner">
						<Spinner />
					</div>
				</div>
			</div>
		</>
	);
};

export default Loader;
