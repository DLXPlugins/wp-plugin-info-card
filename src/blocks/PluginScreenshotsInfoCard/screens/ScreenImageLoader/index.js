/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */

import { useEffect, useState } from '@wordpress/element';
import {
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Spinner,
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	Modal,
	ToggleControl,
	Toolbar,
	ToolbarItem,
	ToolbarButton,
	ToolbarGroup,
	ToolbarDropdownMenu,
	Popover,
	PlaceHolder,
	Tooltip,
	MenuGroup,
	MenuItem,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import axios from 'axios';
import { __ } from '@wordpress/i18n';
import { isURL } from '@wordpress/url';
import Logo from '../../../Logo';
import LoadingScreen from '../../../components/Loading';
import LoadingImageProgressScreen from '../../../components/LoadingImageProgress';

/**
 * ScreenImageLoader component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const ScreenImageLoader = (props) => {

	const [ loading, setLoading ] = useState( true );
	const [ showErrorModal, setShowErrorModal ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( '' );

	const { attributes, setAttributes } = props;

	const { slug, assetData } = attributes;

	const loadImages = ( pluginSlug ) => {
		setLoading( true );
		const restUrl = wppic.rest_url + 'wppic/v2/get_plugin_images';
		axios
			.get(
				restUrl + `?type=plugin&slug=${ encodeURIComponent( pluginSlug ) }`,
				{
					headers: {
						'X-WP-Nonce': wppic.rest_nonce,
					},
				}
			).then( ( response ) => {
				const data = response.data.data;
				if ( response.data.success ) {
					if ( ! data.hasScreenshots ) {
						setAttributes( {
							assetData: data.pluginData,
						} );
						setAttributes(
							{
								screen: 'no-images',
							}
						);
						return;
					}
					if ( data.hasPluginScreenshots ) {
						setAttributes(
							{
								assetData: data.pluginData,
							}
						);
						setAttributes(
							{
								screen: 'plugin-preview',
							}
						);
						return;
					}
					setAttributes(
						{
							screen: 'image-processor',
						}
					);
				} else {
					setErrorMessage( response.data.data.message );
					setShowErrorModal( true );
				}
			} ).catch( ( error ) => {
			} ).then( () => {
			} );
	};

	// Load images.
	useEffect( () => {
		loadImages( slug );
	}, [] );

	if ( loading ) {
		return ( <LoadingScreen label={ __( 'Gathering plugin images...', 'wp-plugin-info-card' ) } /> );
	}

	return null;
};
export default ScreenImageLoader;
