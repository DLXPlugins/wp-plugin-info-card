import React, { useRef, useEffect, useState, useContext } from 'react';
import {
	Spinner,
	Button,
	ButtonGroup,
	Modal,
	RadioControl,
	Tooltip,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { HelpCircle } from 'lucide-react';
import CustomPresetsContext from './context';
import CustomPresetSaveModal from './CustomPresetSaveModal';
import PresetButtonEdit from './PresetButtonEdit';
import CustomPresetEditModal from './CustomPresetEditModal';
import CustomPresetDeleteModal from './CustomPresetDeleteModal';
import ColorPickerControl from '../ColorPicker';

const CustomPresetContainer = ( props ) => {
	const [ loading, setLoading ] = useState( true );
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ presetSaveLabel, setPresetSaveLabel ] = useState( '' );
	const { attributes, setAttributes, clientId, uniqueId } = props;

	const {
		savedPresets,
		setSavedPresets,
		savingPreset,
		setSavingPreset,
		editPresets,
		setEditPresets,
		showEditModal,
		showDeleteModal,
	} = useContext( CustomPresetsContext );

	const presetContainer = useRef( null );

	useEffect( () => {
		if ( presetContainer.current ) {
			// Perform fetch request to ajax endpoint.
			const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
			const data = new FormData();
			data.append( 'action', 'wppic_load_screenshot_presets' );
			data.append( 'nonce', wppic.screenshot_preset_get_nonce );
			fetch( ajaxUrl, {
				method: 'POST',
				body: data,
				/* get return in json */
				headers: {
					Accept: 'application/json',
				},
			} )
				.then( ( response ) => response.json() )
				.then( ( json ) => {
					const { presets } = json.data;
					setLoading( false );
					setSavedPresets( presets );
				} )
				.catch( ( error ) => {
					setLoading( false );
				} );
		}
	}, [ presetContainer ] );

	/**
	 * Show a loading spinner.
	 *
	 * @param {string} label Label of the loading spinner.
	 * @return {JSX} Loading spinner.
	 */
	const showLoading = ( label ) => {
		return (
			<div className="wppic-custom-preset-loading-container">
				<span className="wppic-custom-preset-loading-label">{ label }</span>
				<Spinner />
			</div>
		);
	};
	const getSavedPresets = () => {
		if ( savedPresets.length > 0 ) {
			// Map to preset buttons.
			return (
				<div className="wppic-presets">
					<ButtonGroup>
						{ savedPresets.map( ( preset ) => {
							return (
								<PresetButtonEdit
									key={ preset.id }
									editId={ preset.id }
									title={ preset.title }
									setAttributes={ setAttributes }
									uniqueId={ uniqueId }
									clientId={ clientId }
									slug={ preset.slug }
									attributes={ preset.content.attributes }
									saveNonce={ preset.save_nonce }
									deleteNonce={ preset.delete_nonce }
								/>
							);
						} ) }
					</ButtonGroup>
				</div>
			);
		}
		return (
			<>
				<p>
					{ __( 'No custom color themes have been saved yet.', 'wp-plugin-info-card' ) }
				</p>
			</>
		);
	};

	// Read in localized var and determine if user can save or edit presets.
	const canSavePresets = wppic.can_edit_others_posts;

	return (
		<>
			{ showEditModal && (
				<CustomPresetEditModal
					editId={ showEditModal.editId }
					title={ showEditModal.title }
					saveNonce={ showEditModal.saveNonce }
				/>
			) }
			{ showDeleteModal && (
				<CustomPresetDeleteModal
					editId={ showDeleteModal.editId }
					title={ showDeleteModal.title }
					deleteNonce={ showDeleteModal.deleteNonce }
				/>
			) }
			<div className="wppic-custom-preset-container" ref={ presetContainer }>
				{ loading && showLoading( 'Loading Presets' ) }
				{ ! loading && (
					<>
						{ getSavedPresets() }
						{ ( canSavePresets && 'custom' === attributes.colorTheme ) && (
							<>
								<div classNam="wppic-custom-preset-colors">
									<h3>
										{ __( 'Customize the Colors', 'wp-plugin-info-card' ) }
									</h3>
									<ColorPickerControl
										value={ attributes.colorBackground }
										key={ 'screenshot-background-color' }
										onChange={ ( slug, newValue ) => {
											setAttributes( { colorBackground: newValue } );
										} }
										label={ __( 'Background Color', 'highlight-and-share' ) }
										defaultColors={ wppic.palette }
										defaultColor={ '#FFFFFF' }
										slug={ 'screenshot-background-color' }
									/>
								</div>
								<div className="wppic-custom-preset-actions">
									<h3>{ __( 'Preset Actions', 'wp-plugin-info-card' ) }</h3>
									{ ! editPresets && (
										<Button
											variant={ 'primary' }
											onClick={ ( e ) => {
												e.preventDefault();
												setSavingPreset( true );
											} }
											label={ __( 'Save New Preset', 'wp-plugin-info-card' ) }
										>
											{ __( 'Save New Preset', 'wp-plugin-info-card' ) }
										</Button>
									) }
									{ ! editPresets && ! savingPreset && (
										<Button
											variant={ 'secondary' }
											onClick={ ( e ) => {
												e.preventDefault();
												setEditPresets( true );
											} }
											label={ __( 'Edit Presets', 'wp-plugin-info-card' ) }
										>
											{ __( 'Edit Presets', 'wp-plugin-info-card' ) }
										</Button>
									) }
									{ editPresets && ! savingPreset && (
										<Button
											variant={ 'primary' }
											onClick={ ( e ) => {
												e.preventDefault();
												setEditPresets( false );
											} }
											label={ __( 'Exit Edit Mode', 'wp-plugin-info-card' ) }
										>
											{ __( 'Exit Edit Mode', 'wp-plugin-info-card' ) }
										</Button>
									) }
								</div>
							</>
						) }
					</>
				) }
				{ savingPreset && (
					<CustomPresetSaveModal
						title={ __( 'Save Preset', 'wp-plugin-info-card' ) }
						{ ...props }
					/>
				) }
			</div>
		</>
	);
};
export default CustomPresetContainer;
