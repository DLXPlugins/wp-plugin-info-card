import React from 'react';
import { createRoot } from 'react-dom/client';
import Advanced from '../custom-plugin/screens/advanced';

const container = document.getElementById( 'wppic-tab-advanced' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Advanced />
	</React.StrictMode>
);

export default Advanced;
