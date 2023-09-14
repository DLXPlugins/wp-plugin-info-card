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

// Array with key value.
const colorKeysWithLabel = [
	{
		key: 'colorBackground',
		label: __( 'Background Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorText',
		label: __( 'Text Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorBorder',
		label: __( 'Border Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorStar',
		label: __( 'Star Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorMenu',
		label: __( 'Menu Background Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorMenuBorder',
		label: __( 'Menu Border Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorMenuHover',
		label: __( 'Menu Hover Background Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorMenuText',
		label: __( 'Menu Text Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorMenuTextHover',
		label: __( 'Menu Hover Text Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorScreenshotsBackground',
		label: __( 'Screenshots Background Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorScreenshotsBorder',
		label: __( 'Screenshots Border Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorScreenshotsArrowBackground',
		label: __( 'Arrow Background Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorScreenshotsArrowBackgroundHover',
		label: __( 'Arrow Hover Background Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorScreenshotsArrow',
		label: __( 'Arrow Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorScreenshotsArrowHover',
		label: __( 'Arrow Hover Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorMetaBackground',
		label: __( 'Meta Background Color', 'wp-plugin-info-card' ),
	},
	{
		key: 'colorMetaText',
		label: __( 'Meta Text Color', 'wp-plugin-info-card' ),
	},
];

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
							const newAttributes = { ...attributes, ...preset.content.formData, colorTheme: `custom-${ preset.slug }` };
							return (
								<PresetButtonEdit
									key={ preset.id }
									editId={ preset.id }
									title={ preset.title }
									setAttributes={ setAttributes }
									uniqueId={ uniqueId }
									clientId={ clientId }
									slug={ preset.slug }
									isPressed={ attributes.colorTheme === `custom-${ preset.slug }` }
									attributes={ newAttributes }
									saveNonce={ preset.save_nonce }
									deleteNonce={ preset.delete_nonce }
									theme={ `custom-${ preset.slug }` }
									customFormData={ preset.content.formData ?? {} }
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
						{ ( canSavePresets && 'custom' === attributes.colorTheme ) && (
							<>
								<div className="wppic-custom-preset-colors">
									<h3>
										{ __( 'Customize the Colors', 'wp-plugin-info-card' ) }
									</h3>
									{ Object.values( colorKeysWithLabel ).map( ( objValues, index ) => {
										return (
											<div className="wppic-custom-preset-color" key={ index }>
												<ColorPickerControl
													value={ attributes[ objValues.key ] ?? 'transparent' }
													key={ index }
													onChange={ ( oldSlug, newValue ) => {
														const newAttributes = { ...attributes };
														newAttributes[ objValues.key ] = newValue;
														setAttributes( newAttributes );
													} }
													label={ objValues.label }
													defaultColors={ wppic.palette }
													defaultColor={ '#FFFFFF' }
													slug={ objValues.key }
												/>
											</div>
										);
									} ) }
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
