/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */

import { useContext, useState } from '@wordpress/element';
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
	MenuGroup,
	MenuItem,
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
const SlugEntryScreen = (props) => {

	const [ loading, setLoading ] = useState( false );
	const [ showErrorModal, setShowErrorModal ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( '' );

	const { attributes, setAttributes } = props;

	const { slug } = attributes;

	const loadData = () => {
		setLoading( true );
		const restUrl = wppic.rest_url + 'wppic/v2/get_data';
		axios
			.get(
				restUrl + `?type=plugin&slug=${ encodeURIComponent( slug ) }`
			)
			.then( ( response ) => {
				if ( response.data.success ) {
					// Set asset data.
					setAttributes(
						{
							assetData: response.data.data,
							screen: 'image-loader',
						}
					);
				} else {
					setErrorMessage( response.data.data.message );
					setShowErrorModal( true );
				}
			} ).catch( ( error ) => {
			} ).then( () => {
				setLoading( false );
			} );
	};

	if ( loading ) {
		return ( <LoadingScreen label={ __( 'Loading plugin data...', 'wp-plugin-info-card' ) } /> );
	}

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls />
	);

	const maybeShowModal = () => {
		if ( showErrorModal ) {
			return (
				<Modal
					title={ __( 'Error', 'wp-plugin-info-card' ) }
					onRequestClose={ () => {
						setShowErrorModal( false );
					} }
				>
					<p>{ errorMessage }</p>
					<Button
						variant="primary"
						onClick={ () => {
							setShowErrorModal( false );
						} }
					>
						{ __( 'Close', 'wp-plugin-info-card' ) }
					</Button>
				</Modal>
			);
		}
		return null;
	};

	const block = (
		<>
			<div className="wppic-query-block wppic-query-block-panel">
				<div className="wppic-block-svg">
					<Logo size="75" />
				</div>
				<div className="wp-pic-tab-panel">
					<>
						<TextControl
							label={__(
								'Plugin Slug',
								'wp-plugin-info-card'
							)}
							value={attributes.slug}
							onChange={(value) => {
								if (!isURL(value)) {
									setAttributes({
										slug: value,
									});
								}

							}}
							help={__(
								'Please only enter one slug.',
								'wp-plugin-info-card'
							)}
							onPaste={(event) => {

								// Get contents from clipboard.
								const clipboardData = event.clipboardData
									.getData('text/plain')
									.trim();


								if (isURL(clipboardData)) {
									// Extract out the slug from the URL.
									const urlRegex = /([^\/]*)\/$/g;
									const newSlug = urlRegex.exec(
										clipboardData
									)[1];
									setSlug(newSlug)
									setAttributes({
										slug: newSlug,
									});
								}
							}}

						/>
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
			{ maybeShowModal() }
			{localInspectorControls}
			{block}
		</>
	);
};
export default SlugEntryScreen;
