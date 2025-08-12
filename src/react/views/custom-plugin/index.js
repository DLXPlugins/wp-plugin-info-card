import React from 'react';
import { createRoot } from 'react-dom/client';
import {
	createHashHistory,
	createRouter,
	RouterProvider,
	Outlet,
	createRoute,
	createRootRoute,
} from '@tanstack/react-router';
import CustomPlugin from './custom-plugin';
import PluginHome from './screens/home';
import NewPlugin from './screens/new-plugin';
import Advanced from './screens/advanced';

const container = document.getElementById( 'wppic-tab-custom-plugin' );
const root = createRoot( container );

const hashHistory = createHashHistory( {
	initialEntries: [ '/', '#/' ],
} );

// Define your routes with different components or views
const rootRoute = createRootRoute( {
	component: () => <Outlet />,
} );

const customPluginRoute = createRoute( {
	path: '/',
	getParentRoute: () => rootRoute,
	component: () => <PluginHome />,
} );

const newPluginRoute = createRoute( {
	path: '/new-plugin',
	getParentRoute: () => rootRoute,
	component: () => <NewPlugin />,
} );

const advancedRoute = createRoute( {
	path: '/advanced',
	getParentRoute: () => rootRoute,
	component: () => <Advanced />,
} );

const routeTree = rootRoute.addChildren( [ customPluginRoute, newPluginRoute, advancedRoute ] );

// Create a router instance
const router = createRouter( {
	routeTree,
	history: hashHistory,
	defaultPreload: true,
	defaultPreloadDelay: 0,
	context: {
		history: hashHistory,
	},
} );
root.render(
	<React.StrictMode>
		<RouterProvider router={ router } />
	</React.StrictMode>,
);
