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
import { Undo, Forward } from 'lucide-react';

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
					<p className="wp-pic-admin-description">
						{ __( 'No plugin screenshots have been found. Proceed to preview without images, or go back to the plugin slug.', 'wp-plugin-info-card' ) }
					</p>
					<div className="wp-pic-button-row">
						<Button
							variant="secondary"
							label={ __( 'Back to Plugin Slug', 'wp-plugin-info-card' ) }
							onClick={ () => {
								setAttributes(
									{
										screen: 'slug-entry'
									}
								);
							} }
							className="wp-pic-admin-button wp-pic-admin-button-secondary"
							icon={ <Undo /> }
						>
							{ __( 'Back to Slug', 'wp-plugin-info-card' ) }
						</Button>
						<Button
							variant="primary"
							label={ __( 'Proceed to Preview', 'wp-plugin-info-card' ) }
							onClick={ () => {
								setAttributes(
									{
										screen: 'plugin-preview'
									}
								);
							} }
							className="wp-pic-admin-button wp-pic-admin-button-primary"
							icon={ <Forward /> }
							iconPosition="right"
						>
							{ __( 'Proceed to Preview', 'wp-plugin-info-card' ) }
						</Button>
					</div>
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
