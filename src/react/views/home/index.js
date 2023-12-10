import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './home';

const container = document.getElementById( 'wppic-tab-home' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>
);
