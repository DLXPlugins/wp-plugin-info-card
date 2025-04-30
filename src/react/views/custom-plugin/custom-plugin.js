import React, { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { useRouterState, useNavigate } from '@tanstack/react-router';
import { __ } from '@wordpress/i18n';
import { isURL, cleanForSlug } from '@wordpress/url';
import BeatLoader from 'react-spinners/BeatLoader';
import useMediaUploader from '../../hooks/useMediaUploader';
import PluginHome from './screens/home';
import NewPluginScreen from './screens/new-plugin';
import {
	TextControl,
	Button,
	ToggleControl,
	SelectControl,
	BaseControl,
} from '@wordpress/components';
import {
	AlertCircle,
	PlusCircle,
	ExternalLink,
	DatabaseZap,
	Cog,
	BookText,
	XCircle,
	Home,
	Loader2,
	Database,
	ClipboardCheck,
	Plug2,
	Paintbrush2,
	Plus,
} from 'lucide-react';
import SendCommand from '../../utils/SendCommand';
import PluginIcon from '../../components/PluginIcon';

const CustomPlugin = ( props ) => {
	const [ eddOptions, setEddOptions ] = useState( null );


	// useEffect( () => {
	// 	if ( eddOptions ) {
	// 		return;
	// 	}

	// 	const cachedOptions = localStorage.getItem( 'wppic_edd_options' );
	// 	const cachedTimestamp = localStorage.getItem( 'wppic_edd_options_timestamp' );

	// 	if ( cachedOptions && cachedTimestamp ) {
	// 		// Do verison check.
	// 		const currentVersion = wppicAdmin.pluginVersion;
	// 		const cachedJson = JSON.parse( cachedOptions );
	// 		const cachedVersion = cachedJson.version;
	// 		if ( currentVersion !== cachedVersion ) {
	// 			localStorage.removeItem( 'wppic_edd_options' );
	// 			localStorage.removeItem( 'wppic_edd_options_timestamp' );
	// 		}
	// 		const currentTime = new Date().getTime();
	// 		const cacheExpiration = parseInt( cachedTimestamp ) + 3600000;
	// 		if ( currentTime < cacheExpiration ) {
	// 			setEddOptions( cachedJson );
	// 			return;
	// 		}
	// 	}

	// 	const fetchOptions = async () => {
	// 		const response = await SendCommand( 'wppic_get_edd_options', {
	// 			nonce: wppicAdminCustomPlugin.getNonce,
	// 		} );
	// 		const { success, data } = response.data;
	// 		if ( success ) {
	// 			// Save to local storage.
	// 			localStorage.setItem( 'wppic_edd_options', JSON.stringify( data ) );
	// 			localStorage.setItem( 'wppic_edd_options_timestamp', new Date().getTime().toString() );

	// 			setEddOptions( data );
	// 		}
	// 	};
	// 	// Fetch options.
	// 	fetchOptions();
	// }, [] );

	return (
		<Interface data={ null } { ...props } />
	);

};

const Interface = ( props ) => {
	const { data } = props;
	const {
		control,
		handleSubmit,
		getValues,
		reset,
		setValue,
		setError,
		trigger,
	} = useForm( {
		defaultValues: {
			saveNonce: wppicAdminCustomPlugin.saveNonce,
			resetNonce: wppicAdminCustomPlugin.resetNonce,
		},
	} );

	const routerState = useRouterState();
	const navigate = useNavigate();

	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	// Media uploader for citation image upload.
	const { openMediaUploader } = useMediaUploader();

	/**
	 * Placeholder for submit event.
	 *
	 * @param {Object} formData contains the form data.
	 */
	const onSubmit = ( formData ) => {
		// Update local storage by clearing it.
		localStorage.removeItem( 'wppic_edd_options' );
		localStorage.removeItem( 'wppic_edd_options_timestamp' );
	};

	const renderScreen = () => {
		switch (routerState.location.pathname) {
			case '/':
				return <PluginHome />;
			case '/new-plugin':
				return <NewPluginScreen isEditing={ false } pluginData={ null } />;
			default:
				return <div>404</div>;
		}
	};

	return (
		<div>
			{ renderScreen() }
		</div>
	);
};
export default CustomPlugin;
