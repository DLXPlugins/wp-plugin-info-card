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
	} = attributes;

	console.log( assetData );

	// Set the local inspector controls.
	const localInspectorControls = (
		<InspectorControls />
	);

	const block = (
		<>
			<PluginScreenshots
				{ ...assetData[0] }
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
