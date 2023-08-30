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

/**
 * InitialScreen component.
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

	const processImage = ( images ) => {
		const restUrl = wppic.rest_url + 'wppic/v2/process_images';
		axios
			.post(
				restUrl,
				{
					images,
				},
				{
					headers: {
						'X-WP-Nonce': wppic.rest_nonce,
					},
				}
			).then( ( response ) => {
				const data = response.data.data;
				if ( response.data.success ) {
					if ( data.images.length > 0 ) {
						processImage( data.images );
					}
				} else {
				}
			} ).catch( ( error ) => {
			} ).then( () => {
			} );
	}

	const loadImages = () => {
		setLoading( true );
		const restUrl = wppic.rest_url + 'wppic/v2/get_images_to_process';
		axios
			.get(
				restUrl + `?type=plugin&slug=${ encodeURIComponent( slug ) }`,
				{
					headers: {
						'X-WP-Nonce': wppic.rest_nonce,
					},
				}
			).then( ( response ) => {
				const data = response.data.data;
				if ( response.data.success ) {
					const images = data.images;
					const needsSideload = data.needs_sideload;
					console.log( images );
					if ( images.length > 0 ) {
						// processImage( images );
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
		loadImages();
	}, [] );

	if ( loading ) {
		return ( <LoadingScreen label={ __( 'Determining if there are images to process...', 'wp-plugin-info-card' ) } /> );
	}

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls />
	);

	const block = (
		<>
			<div className="wppic-query-block wppic-query-block-panel">
				<div className="wppic-block-svg">
					<Logo size="75" />
				</div>
				<div className="wp-pic-tab-panel">
					<>
					
						<ToggleGroupControl
							label={ __( 'Download the images locally, or load them from WordPress.org.', 'wp-plugin-info-card' ) }
							value={ 'local' }
							onChange={ ( value ) => {
								setAttributes( { imageSource: value } ); // can be local or remote. `local` means the images are sideloaded into WordPress.
							} }
							isBlock={ true }
							help={ __( 'Choose local to have the screenshots downloaded locally to your server.', 'wp-plugin-info-card' ) }
						>
								<ToggleGroupControlOption
									label={ __( 'Local', 'wp-plugin-info-card' ) }
									aria-label={ __( 'Choose local to have the screenshots downloaded locally to your server.', 'wp-plugin-info-card' ) }
									value={ 'local' }
									showTooltip={ true }
								/>
							<ToggleGroupControlOption
								label={ __( 'Remote', 'wp-plugin-info-card' ) }
								value={ 'remote' }
								aria-label={ __( 'Choose remote to load images from WordPress.org directly.', 'wp-plugin-info-card' ) }
								showTooltip={ true }
							/>
						</ToggleGroupControl>
					</>
				</div>
				<div className="wp-pic-gutenberg-button">
					<Button
						iconSize={20}
						icon={<Logo size="25" />}
						variant="secondary"
						id="wppic-input-submit"
						onClick={(event) => {
							event.preventDefault();
							loadData();
							
						}}
					>
						{__(
							'Preview and Configure',
							'wp-plugin-info-card'
						)}
					</Button>
				</div>
			</div>
		</>
	);

	return (
		<>
			{localInspectorControls}
			{block}
		</>
	);
};
export default ScreenImageLoader;
