import './editor.scss';
import React, { useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { Button, Popover, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PluginScreenshots from '../../templates/PluginScreenshots';
import BlockPreview from '../BlockPreview';

const PresetButton = ( props ) => {
	const { setAttributes, label, attributes, uniqueId, theme, customFormData = {}, isPresssed = false } = props;

	// Define state for the popover visibility
	const [ showPopover, setShowPopover ] = useState( false );
	const [ popoverAnchor, setPopoverAnchor ] = useState();

	// Define state for modal options.
	const [ showModal, setShowModal ] = useState( false );

	const handlePopoverOpen = () => {
		setShowPopover( true );
	};

	const handlePopoverClose = () => {
		setShowPopover( false );
	};

	const popoverContent = () => {
		const attributesFormData = { ...attributes.formData };
		const attributesOverride = { ...attributes, ...attributesFormData };
		attributesOverride.enableScreenshots = false;
		attributesOverride.colorTheme = theme;
		attributesOverride.uniqueId = `${ uniqueId }-preview`;

		return (
			<div className="wppic-screenshot-popover-wrapper">
				<PluginScreenshots
					assetData={ attributes.assetData }
					attributes={ attributesOverride }
				/>
			</div>
		);
	};
	return (
		<>
			<Button
				variant={ 'secondary' }
				onClick={ ( e ) => {
					e.preventDefault();
					const newAttributes = {
						...attributes,
						...customFormData,
						...{
							uniqueId,
							colorTheme: theme,
						},
					};
					setAttributes( newAttributes );
				} }
				className="wppic-preset-button"
				onMouseEnter={ () => handlePopoverOpen( true ) }
				onMouseLeave={ () => handlePopoverClose( false ) }
				label={ label }
				ref={ setPopoverAnchor }
				disabled={ props.disabled ?? false }
				{ ...props }
			>
				{ label }
			</Button>
			{ showModal && (
				<>
					<Modal
						title={ __( 'Apply Preset?', 'wp-plugin-info-card' ) }
						onRequestClose={ () => setShowModal( false ) }
						className="wppic-preset-modal"
					>
						<p>{ __( 'Are you sure you want to apply this preset?', 'wp-plugin-info-card' ) }</p>
						<Button
							variant="primary"
							onClick={ () => {
								const uniqueIdAttribute = { uniqueId };
								const blockAttributes = { ...props.attributes, customFormData, uniqueIdAttribute };
								setAttributes( blockAttributes );
								setShowModal( false );
							} }
							className="wppic-preset-modal-apply-button"
						>
							{ __( 'Apply Preset', 'wp-plugin-info-card' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => {
								setShowModal( false );
							} }
						>
							{ __( 'Cancel', 'wp-plugin-info-card' ) }
						</Button>
					</Modal>
				</>
			) }
			{ showPopover && (
				<>
					<Popover
						className="wppic-preset-popover"
						placement="left"
						onClose={ () => handlePopoverClose( false ) }
						noArrow={ false }
						offset={ 30 }
						anchor={ popoverAnchor }
					>
						{ popoverContent() }
					</Popover>
				</>
			) }
		</>
	);
};

PresetButton.propTypes = {
	previewBlock: Proptypes.element.isRequired,
	setAttributes: Proptypes.func.isRequired,
	label: Proptypes.string.isRequired,
	presetData: Proptypes.object.isRequired,
};
PresetButton.defaultProps = {
	label: 'Purple',
	previewBlock: <></>,
	setAttributes: () => {},
	presetData: {},
};
export default PresetButton;
