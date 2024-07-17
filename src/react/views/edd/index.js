import React from 'react';
import { createRoot } from 'react-dom/client';
import EDD from './edd';

const container = document.getElementById( 'wppic-tab-edd' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<EDD />
	</React.StrictMode>
);
