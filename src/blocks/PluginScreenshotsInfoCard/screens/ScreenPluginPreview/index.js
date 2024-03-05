/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */

import { useContext, useState } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
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
	DropdownMenu,
	ToolbarGroup,
	MenuItemsChoice,
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
import CustomPresets from '../../../components/CustomPresets';
import PresetButton from '../../../components/PresetButton/PresetButton';

/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
const ScreenPluginPreview = ( props ) => {
	const { attributes, setAttributes, clientId } = props;

	const {
		assetData,
		enableScreenshots,
		maxHeight,
		enableRoundedIcon,
		iconStyle,
		enableContextMenu,
		pluginTitle,
		colorTheme,
		uniqueId,
	} = attributes;

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Block Customization', 'wp-plugin-info-card' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Rounded Icon', 'wp-plugin-info-card' ) }
					checked={ enableRoundedIcon }
					onChange={ ( value ) => {
						setAttributes( { enableRoundedIcon: value } );
					} }
					help={ __( 'Make the icon rounded.', 'wp-plugin-info-card' ) }
				/>
				<SelectControl
					label={ __( 'Icon Style', 'wp-plugin-info-card' ) }
					value={ iconStyle }
					onChange={ ( value ) => {
						setAttributes( { iconStyle: value } );
					} }
					help={ __( 'Set the style of the icon.', 'wp-plugin-info-card' ) }
					options={
						[
							{ label: __( 'None', 'wp-plugin-info-card' ), value: 'none' },
							{ label: __( 'Border', 'wp-plugin-info-card' ), value: 'border' },
							{ label: __( 'B&W With Border', 'wp-plugin-info-card' ), value: 'bw' },
						]
					}
				/>
				<ToggleControl
					label={ __( 'Enable Context Menu', 'wp-plugin-info-card' ) }
					checked={ enableContextMenu }
					onChange={ ( value ) => {
						setAttributes( { enableContextMenu: value } );
					} }
					help={ __( 'Make the icon rounded.', 'wp-plugin-info-card' ) }
				/>
				<TextControl
					label={ __( 'Override Plugin Title', 'wp-plugin-info-card' ) }
					help={ __( 'Leave blank for no override. Otherwise enter a custom title for the plugin.', 'wp-plugin-info-card' ) }
					value={ pluginTitle }
					onChange={ ( value ) => {
						setAttributes( { pluginTitle: value } );
					} }
				/>
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
			</PanelBody>
			<PanelBody
				title={ __( 'Color Themes', 'wp-plugin-info-card' ) }
				initialOpen={ true }
				className="wppic-presets-panel"
				icon="admin-customizer"
			>
				<div className="wppic-screenshot-presets-button-group">
					<h3>{ __( 'Select a color theme', 'wp-plugin-info-card' ) }</h3>
					<ButtonGroup>
						<PresetButton
							label={ __( 'Default', 'wp-plugin-info-card' ) }
							setAttributes={ setAttributes }
							attributes={ attributes }
							uniqueId={ uniqueId }
							isPressed={ 'default' === colorTheme }
							theme="default"
						/>
						<PresetButton
							label={ __( 'Blossom', 'wp-plugin-info-card' ) }
							setAttributes={ setAttributes }
							attributes={ attributes }
							uniqueId={ uniqueId }
							isPressed={ 'blossom' === colorTheme }
							theme="blossom"
						/>
						<PresetButton
							label={ __( 'Crimson', 'wp-plugin-info-card' ) }
							setAttributes={ setAttributes }
							attributes={ attributes }
							uniqueId={ uniqueId }
							isPressed={ 'crimson' === colorTheme }
							theme="crimson"
						/>
						<PresetButton
							label={ __( 'Velvet', 'wp-plugin-info-card' ) }
							setAttributes={ setAttributes }
							attributes={ attributes }
							uniqueId={ uniqueId }
							isPressed={ 'velvet' === colorTheme }
							theme="velvet"
						/>
						<PresetButton
							label={ __( 'Dark', 'wp-plugin-info-card' ) }
							setAttributes={ setAttributes }
							attributes={ attributes }
							uniqueId={ uniqueId }
							isPressed={ 'dark' === colorTheme }
							theme="dark"
						/>
						<PresetButton
							label={ __( 'Light', 'wp-plugin-info-card' ) }
							setAttributes={ setAttributes }
							attributes={ attributes }
							uniqueId={ uniqueId }
							isPressed={ 'light' === colorTheme }
							theme="light"
						/>
						<PresetButton
							label={ __( 'Soft as Feathers', 'wp-plugin-info-card' ) }
							setAttributes={ setAttributes }
							attributes={ attributes }
							uniqueId={ uniqueId }
							isPressed={ 'feathers' === colorTheme }
							theme="feathers"
						/>
						<PresetButton
							label={ __( 'Caramel', 'wp-plugin-info-card' ) }
							setAttributes={ setAttributes }
							attributes={ attributes }
							uniqueId={ uniqueId }
							isPressed={ 'caramel' === colorTheme }
							theme="caramel"
						/>
					</ButtonGroup>
				</div>
				<CustomPresets
					clientId={ clientId }
					uniqueId={ uniqueId }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</PanelBody>
		</InspectorControls>
	);

	const blockToolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="edit"
					title={ __(
						'Edit Plugin Slug',
						'wp-plugin-info-card',
					) }
					onClick={ () => setAttributes( { screen: 'slug-entry' } ) }
				/>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarItem as="button">
					{ ( toolbarItemHTMLProps ) => (
						<DropdownMenu
							toggleProps={ toolbarItemHTMLProps }
							label={ __(
								'Select a Color Theme',
								'wp-plugin-info-card',
							) }
							icon="admin-customizer"
						>
							{ ( { onClose } ) => (
								<>
									<MenuItemsChoice
										choices={
											[
												{ label: __( 'Default', 'wp-plugin-info-card' ), value: 'default' },
												{ label: __( 'Blossom', 'wp-plugin-info-card' ), value: 'blossom' },
												{ label: __( 'Crimson', 'wp-plugin-info-card' ), value: 'crimson' },
												{ label: __( 'Velvet', 'wp-plugin-info-card' ), value: 'velvet' },
											]
										}
										onSelect={ ( value ) => {
											setAttributes( {
												colorTheme: value,
											} );
											setScheme( value );
											onClose();
										} }
										value={ colorTheme }
									/>
								</>
							) }
						</DropdownMenu>
					) }
				</ToolbarItem>
			</ToolbarGroup>
		</BlockControls>
	);

	const block = (
		<>
			{ blockToolbar }
			<PluginScreenshots
				assetData={ assetData }
				attributes={ attributes }
			/>
		</>
	);

	return (
		<>
			{ localInspectorControls }
			{ block }
		</>
	);
};
export default ScreenPluginPreview;
