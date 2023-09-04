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
 * ScreenImageProcessor component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const ScreenImageProcessor = (props) => {

	const [ loading, setLoading ] = useState( true );
	const [ isImageProcessing, setIsImageProcessing ] = useState( false );
	const [ currentImageOrder, setCurrentImageOrder ] = useState( 0 );
	const [ totalImageCount, setTotalImageCount ] = useState( 0 );
	const [ showErrorModal, setShowErrorModal ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( '' );

	const { attributes, setAttributes } = props;

	const { slug, assetData } = attributes;

	const loadImages = ( pluginSlug, screenshotOrder = -1, needsSideload = false ) => {
		setLoading( true );
		const restUrl = wppic.rest_url + 'wppic/v2/get_plugin_images_to_process';
		axios
			.get(
				restUrl + `?type=plugin&slug=${ encodeURIComponent( pluginSlug ) }&order=${ screenshotOrder }&needsSideload=${ needsSideload}`,
				{
					headers: {
						'X-WP-Nonce': wppic.rest_nonce,
					},
				}
			).then( ( response ) => {
				const data = response.data.data;
				if ( response.data.success ) {
					const newOrder = data.sideloadOrder;
					const needsSideload = data.needsSideload;
					const imageCount = data.totalScreenshots;
					setTotalImageCount( imageCount );
					if ( imageCount >= newOrder ) {
						setCurrentImageOrder( newOrder );
						setIsImageProcessing( true );
						loadImages( pluginSlug, newOrder, needsSideload );
					} else {
						setAttributes( { assetData: data.pluginData, screen: 'plugin-preview' } );
					}
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

	if ( isImageProcessing || loading ) {
		return (
			<LoadingImageProgressScreen
				totalImageCount={ totalImageCount }
				currentCount={ currentImageOrder }
				label={ __( 'Processing images...', 'wp-plugin-info-card' ) }
			/>
		);
	}

	if ( loading ) {
		return ( <LoadingScreen label={ __( 'Determining if there are images to process...', 'wp-plugin-info-card' ) } /> );
	}

	return null;
};
export default ScreenImageProcessor;
