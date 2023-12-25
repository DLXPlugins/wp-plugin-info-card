
import { useAsyncResource } from 'use-async-resource';
import SendCommand from '../utils/SendCommand';
import PluginCard from '../../blocks/templates/PluginCard';
import PluginFlex from '../../blocks/templates/PluginFlex';
import PluginLarge from '../../blocks/templates/PluginLarge';
import PluginWordPress from '../../blocks/templates/PluginWordPress';
import ThemeCard from '../../blocks/templates/ThemeCard';
import ThemeFlex from '../../blocks/templates/ThemeFlex';
import ThemeLarge from '../../blocks/templates/ThemeLarge';
import ThemeWordPress from '../../blocks/templates/ThemeWordPress';

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
	const [ defaults ] = useAsyncResource( retrieveSamplePlugin, [] );

	const response = defaults();
	/**
	 * Launch a preview of the plugin based on type and size.
	 *
	 * @param {string} type   card, flex, large, or wordpress.
	 * @param {string} scheme the color scheme.
	 */
	const getPreview = ( type, scheme ) => {
		if ( ! response ) {
			return;
		}

		const newResponse = {
			...response,
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
	};
}
