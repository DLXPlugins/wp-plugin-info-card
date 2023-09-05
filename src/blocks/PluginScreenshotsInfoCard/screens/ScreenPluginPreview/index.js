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
	SelectControl,
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
import PluginScreenshots from '../../../templates/PluginScreenshots';

/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const ScreenPluginPreview = (props) => {

	const { attributes, setAttributes } = props;

	const {
		assetData,
		enableScreenshots,
		maxHeight,
		imageSize,
	} = attributes;

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Screenshot Customization', 'wp-plugin-info-card' ) }
				initialOpen={ true }
			>
				<PanelRow>
					<ToggleControl
						label={ __( 'Enable Screenshots', 'wp-plugin-info-card' ) }
						checked={ enableScreenshots }
						onChange={ ( value ) => {
							setAttributes( { enableScreenshots: value } );
						} }
						help={ __( 'Enable or disable screenshots.', 'wp-plugin-info-card' ) }
					/>
				</PanelRow>
				{
					enableScreenshots &&
					<>
							<SelectControl
								label={ __( 'Image Size', 'wp-plugin-info-card' ) }
								value={ imageSize }
								onChange={ ( value ) => {
									setAttributes( { imageSize: value } );
								} }
								help={ __( 'Set the image size of the screenshots.', 'wp-plugin-info-card' ) }
								options={
									[
										{ label: __( 'Thumbnail', 'wp-plugin-info-card' ), value: 'thumbnail' },
										{ label: __( 'Medium', 'wp-plugin-info-card' ), value: 'medium' },
										{ label: __( 'Large', 'wp-plugin-info-card' ), value: 'large' },
									]
								}
							/>
					</>
				}
				
			</PanelBody>
		</InspectorControls>
	);

	const block = (
		<>
			<PluginScreenshots
				assetData={ assetData }
				attributes={ attributes }
			/>
		</>
	);

	return (
		<>
			{localInspectorControls}
			{block}
		</>
	);
};
export default ScreenPluginPreview;
