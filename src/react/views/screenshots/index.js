import React from 'react';
import { createRoot } from 'react-dom/client';
import Screenshots from './screenshots';

const container = document.getElementById( 'wppic-tab-screenshots' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Screenshots />
	</React.StrictMode>
);
