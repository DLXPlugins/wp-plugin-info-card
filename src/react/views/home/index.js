import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './home';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const container = document.getElementById( 'wppic-tab-home' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<DndProvider backend={ HTML5Backend }>
			<Home />
		</DndProvider>
	</React.StrictMode>
);
