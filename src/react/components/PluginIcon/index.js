import React from 'react';

const PluginIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			viewBox="0 0 24 24"
			{ ...props }
		>
			<path fill="currentColor" d="M7 5a1 1 0 0 0 2 0V3a1 1 0 0 0-2 0zM21 8a1 1 0 0 1-1 1h-1v3a7.001 7.001 0 0 1-6 6.93V21a1 1 0 1 1-2 0v-2.07A7.001 7.001 0 0 1 5 12V9H4a1 1 0 0 1 0-2h16a1 1 0 0 1 1 1zM16 6a1 1 0 0 1-1-1V3a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1z" />
		</svg>
	);
};

export default PluginIcon;
