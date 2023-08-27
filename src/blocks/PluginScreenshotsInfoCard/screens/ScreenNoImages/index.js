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
const ScreenNoImages = (props) => {

	const [ loading, setLoading ] = useState( true );
	const [ showErrorModal, setShowErrorModal ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ isProceedPreviewChecked, setIsProceedPreviewChecked ] = useState( true );

	const { attributes, setAttributes } = props;

	const { slug, assetData } = attributes;

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
							label={ __( 'No plugin screenshots have been found. Please select an option below.', 'wp-plugin-info-card' ) }
							value={ isProceedPreviewChecked ? 'preview' : 'slug' }
							onChange={ ( value ) => {
								if ( 'preview' === value ) {
									setIsProceedPreviewChecked( true );
								} else {
									setIsProceedPreviewChecked( false );
								}
								
							} }
							isBlock={ true }
							help={ __( 'No screenshots have been found. You can still proceed with a preview, without images, or go back and enter a new plugin slug.', 'wp-plugin-info-card' ) }
						>
								<ToggleGroupControlOption
									label={ __( 'Back to Plugin Slug', 'wp-plugin-info-card' ) }
									aria-label={ __( 'Start over with a new plugin slug to enter.', 'wp-plugin-info-card' ) }
									value={ 'slug' }
									showTooltip={ true }
								/>
								<ToggleGroupControlOption
								variant="primary"
									label={ __( 'Proceed to Preview', 'wp-plugin-info-card' ) }
									value={ 'preview' }
									aria-label={ __( 'Load the plugin layout without any screenshots.', 'wp-plugin-info-card' ) }
									showTooltip={ true }
								/>
						</ToggleGroupControl>
						<Button
							variant="primary"
							label={ isProceedPreviewChecked ? __( 'Proceed to Preview', 'wp-plugin-info-card' ) : __( 'Back to Plugin Slug', 'wp-plugin-info-card' ) }
							onClick={ () => {
								if ( ! isProceedPreviewChecked ) {
									setAttributes(
										{
											screen: 'slug-entry'
										}
									);
								} else {
									setAttributes(
										{
											screen: 'plugin-preview'
										}
									);
								}
							} }
						>
							{ __( 'Go', 'wp-plugin-info-card' ) }
						</Button>
					</>
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
export default ScreenNoImages;
