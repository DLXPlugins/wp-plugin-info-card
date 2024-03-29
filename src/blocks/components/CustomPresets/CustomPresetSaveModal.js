import React, { useRef, useEffect, useState, useContext } from 'react';
import {
	Spinner,
	Button,
	Modal,
	RadioControl,
	TextControl,
} from '@wordpress/components';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { __ } from '@wordpress/i18n';
import { AlertCircle } from 'lucide-react';
import CustomPresetsContext from './context';
import Notice from '../Notice';

const CustomPresetSaveModal = ( props ) => {
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ isSaving, setIsSaving ] = useState( false );
	const { title, attributes, setAttributes, clientId } = props;

	const { savedPresets, setSavedPresets, savingPreset, setSavingPreset } =
		useContext( CustomPresetsContext );

	const getDefaultValues = () => {
		return {
			presetTitle: '',
			selectedPreset: null,
			colorBackground: attributes.colorBackground ?? 'transparent',
			colorText: attributes.colorText ?? 'transparent',
			colorBorder: attributes.colorBorder ?? 'transparent',
			colorMenu: attributes.colorMenu ?? 'transparent',
			colorMenuBorder: attributes.colorMenuBorder ?? 'transparent',
			colorMenuHover: attributes.colorMenuHover ?? 'transparent',
			colorMenuText: attributes.colorMenuText ?? 'transparent',
			colorMenuTextHover: attributes.colorMenuTextHover ?? 'transparent',
			colorScreenshotsBackground: attributes.colorScreenshotsBackground ?? 'transparent',
			colorScreenshotsBorder: attributes.colorScreenshotsBorder ?? 'transparent',
			colorStar: attributes.colorStar ?? 'transparent',
			colorMetaBackground: attributes.colorMetaBackground ?? 'transparent',
			colorMetaText: attributes.colorMetaText ?? 'transparent',
			colorScreenshotsArrowBackground: attributes.colorScreenshotsArrowBackground ?? 'transparent',
			colorScreenshotsArrowBackgroundHover: attributes.colorScreenshotsArrowBackgroundHover ?? 'transparent',
			colorScreenshotsArrow: attributes.colorScreenshotsArrow ?? 'transparent',
			colorScreenshotsArrowHover: attributes.colorScreenshotsArrowHover ?? 'transparent',
		};
	};
	const { control, handleSubmit, setValue } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		if ( 'new' === presetSaveType ) {
			saveNewPreset( formData );
		} else {
			overridePreset( formData );
		}
	};

	/**
	 * Save a new preset via Ajax.
	 *
	 * @param {Array} formData Form data array.
	 */
	const saveNewPreset = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'wppic_save_screenshot_presets' );
		data.append( 'nonce', wppic.screenshot_preset_save_nonce );
		data.append( 'formData', JSON.stringify( formData ) );
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
				setIsSaving( false );
				setSavingPreset( false );
				setSavedPresets( presets );
			} )
			.catch( ( error ) => {
				setSavingPreset( false );
			} );
	};

	/**
	 * Save a new preset via Ajax.
	 *
	 * @param {Array} formData Form data array.
	 */
	const overridePreset = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'wppic_override_screenshot_preset' );
		data.append( 'nonce', wppic.screenshot_preset_save_nonce );
		data.append( 'formData', JSON.stringify( formData ) );
		data.append( 'editId', formData.selectedPreset );
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
				setIsSaving( false );
				setSavingPreset( false );
				setSavedPresets( presets );
			} )
			.catch( ( error ) => {
				setSavingPreset( false );
			} );
	};

	/**
	 * Get the preset options in radio group format.
	 *
	 * @return {Array} Array of objects with label and value properties.
	 */
	const getPresetRadioOptions = () => {
		const options = [];
		savedPresets.forEach( ( preset ) => {
			options.push( {
				label: preset.title,
				value: preset.id + '',
			} );
		} );
		return options;
	};

	let radioOptions = [
		{
			label: __( 'Save Color Theme', 'wp-plugin-info-card' ),
			value: 'new',
		},
		{
			label: __( 'Override Color Theme', 'wp-plugin-info-card' ),
			value: 'override',
		},
	];
	if ( savedPresets.length === 0 ) {
		radioOptions = [
			{
				label: __( 'Save Color Theme', 'wp-plugin-info-card' ),
				value: 'new',
			},
		];
	}


	return (
		<div className="has-custom-preset-modal">
			<Modal
				title={ title }
				onRequestClose={ () => setSavingPreset( false ) }
				className="has-preset-modal"
				shouldCloseOnClickOutside={ false }
			>
				<RadioControl
					label={ __(
						'Save a new color theme or override an existing one.',
						'wp-plugin-info-card'
					) }
					className="has-preset-modal-radio-control"
					selected={ presetSaveType }
					options={ radioOptions }
					onChange={ ( value ) => {
						setPresetSaveType( value );
					} }
				/>
				<form onSubmit={ handleSubmit( onSubmit ) }>
					{ 'new' === presetSaveType && (
						<>
							<div className="has-preset-modal-new-preset">
								<Controller
									name="presetTitle"
									control={ control }
									rules={ {
										required: true,
										pattern: /^[a-zA-Z0-9-_ ]+$/,
									} }
									render={ ( { field } ) => (
										<TextControl
											{ ...field }
											label={ __( 'Color Theme Name', 'wp-plugin-info-card' ) }
											className="is-required"
										/>
									) }
								/>
								{ 'required' === errors.presetTitle?.type && (
									<Notice
										message={ __( 'This field is required.' ) }
										status="error"
										politeness="assertive"
										icon={ () => <AlertCircle style={ { color: 'currentColor' } } /> }
										inline={ false }
									/>
								) }
								{ 'pattern' === errors.presetTitle?.type && (
									<Notice
										message={ __( 'This field contains invalid characters.' ) }
										status="error"
										politeness="assertive"
										icon={ () => <AlertCircle style={ { color: 'currentColor' } } /> }
										inline={ false }
									/>
								) }
							</div>
						</>
					) }
					{ 'override' === presetSaveType && (
						<>
							{ savedPresets.length > 0 && (
								<div className="has-preset-modal-override-preset">
									<Controller
										name="selectedPreset"
										control={ control }
										rules={ {
											required: true,
										} }
										render={ ( { field: { onChange, value } } ) => (
											<RadioControl
												label={ __(
													'Select a color theme to override',
													'wp-plugin-info-card'
												) }
												className="is-required"
												selected={ value }
												options={ getPresetRadioOptions() }
												onChange={ ( radioValue ) => onChange( radioValue ) }
											/>
										) }
									/>
									{ 'required' === errors.selectedPreset?.type && (
										<Notice
											message={ __( 'Please select a theme to override.' ) }
											status="error"
											politeness="assertive"
											icon={ () => <AlertCircle style={ { color: 'currentColor' } } /> }
										/>
									) }
								</div>
							) }
						</>
					) }
					<div className="has-preset-modal-button-group">
						<Button
							type="submit"
							variant="primary"
							className="has-preset-modal-apply-button"
							disabled={ isSaving }
						>
							{ isSaving
								? __( 'Saving…', 'wp-plugin-info-card' )
								: __( 'Save Color Theme', 'wp-plugin-info-card' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => {
								setSavingPreset( false );
							} }
							className="has-preset-modal-cancel-button"
							disabled={ isSaving }
						>
							{ __( 'Cancel', 'wp-plugin-info-card' ) }
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
};
export default CustomPresetSaveModal;
