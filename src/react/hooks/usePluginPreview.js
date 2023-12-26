import { useState, useEffect } from 'react';
import SendCommand from '../utils/SendCommand';
import PluginCard from '../../blocks/templates/PluginCard';
import PluginFlex from '../../blocks/templates/PluginFlex';
import PluginLarge from '../../blocks/templates/PluginLarge';
import PluginWordPress from '../../blocks/templates/PluginWordPress';

const retrieveSamplePlugin = async () => {
	const response = await SendCommand( 'wppic_get_sample_plugin', {
		nonce: wppicAdmin.getPluginNonce,
	} );
	const { data, success } = response.data;
	if ( success ) {
		return data.pluginData;
	}
	return response;
};

export default function usePluginPreview( props ) {
	const [ samplePlugin, setSamplePlugin ] = useState( false );

	useEffect( () => {
		// Get local storage.
		const cachedOptions = localStorage.getItem( 'wppic-sample-plugin' );
		const cachedTimestamp = localStorage.getItem( 'wppic-sample-plugin-timestamp' );
		if ( cachedOptions && cachedTimestamp ) {
			const currentTime = new Date().getTime();
			const cacheExpiration = parseInt( cachedTimestamp ) + 3600000;
			if ( currentTime < cacheExpiration ) {
				setSamplePlugin( JSON.parse( cachedOptions ) );
				return;
			}
		}


		const fetchPlugin = async () => {
			const response = await SendCommand( 'wppic_get_sample_plugin', {
				nonce: wppicAdmin.getPluginNonce,
			} );
			const { data, success } = response.data;
			if ( success ) {
				// Set local storage.
				localStorage.setItem( 'wppic-sample-plugin', JSON.stringify( data.pluginData ) );
				localStorage.setItem( 'wppic-sample-plugin-timestamp', new Date().getTime().toString() );
				setSamplePlugin( data.pluginData );
			}
			return response;
		};
		fetchPlugin();
	}, [] );
	/**
	 * Launch a preview of the plugin based on type and size.
	 *
	 * @param {string} type   card, flex, large, or wordpress.
	 * @param {string} scheme the color scheme.
	 */
	const getPreview = ( type, scheme ) => {
		if ( ! samplePlugin ) {
			return;
		}

		const newResponse = {
			...samplePlugin,
			scheme,
		};
		let preview = '';
		switch ( type ) {
			case 'card':
				preview = <PluginCard data={ newResponse } scheme={ scheme } align="wide" />;
				break;
			case 'flex':
				preview = <PluginFlex data={ newResponse } scheme={ scheme } align="wide" />;
				break;
			case 'large':
				preview = <PluginLarge data={ newResponse } scheme={ scheme } align="wide" />;
				break;
			case 'wordpress':
				preview = <PluginWordPress data={ newResponse } scheme={ scheme } align="wide" />;
				break;
			default:
				preview = <PluginCard data={ newResponse } scheme={ scheme } align="wide" />;
				break;
		}
		return preview;
	};

	return {
		getPreview,
		previewReady: samplePlugin ? true : false,
	};
}
