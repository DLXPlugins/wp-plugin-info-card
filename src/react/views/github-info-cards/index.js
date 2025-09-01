import React from 'react';
import { createRoot } from 'react-dom/client';
import GitHubInfoCards from './github-info-cards';

const container = document.getElementById( 'wppic-tab-github-info-cards' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<GitHubInfoCards />
	</React.StrictMode>,
);
