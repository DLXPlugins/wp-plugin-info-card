import React, { useState } from 'react';
import { AlertCircle, Loader2, ClipboardCheck } from 'lucide-react';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { Button, Snackbar } from '@wordpress/components';
import Notice from '../Notice';
import SendCommand from '../../utils/SendCommand';
import SnackPop from '../SnackPop';

export function onSave( formData, setError ) {

}

export function onReset( { formValues, setError, reset } ) {

}

const SaveResetButtons = ( props ) => {
	// Gather props.
	const {
		formValues,
		setError,
		reset,
		errors,
		isDirty,
		dirtyFields,
		trigger,
	} = props;

	const [ saving, setSaving ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );
	const [ savePromise, setSavePromise ] = useState( null );
	const [ resetPromise, setResetPromise ] = useState( null );

	/**
	 * Save the options by setting promise as state.
	 */
	const saveOptions = async () => {
		const saveOptionsPromise = SendCommand( 'wpac_save_options', { ajaxifyFormData: formValues } );
		setSavePromise( saveOptionsPromise );
		setSaving( true );
		await saveOptionsPromise;
		setSaving( false );
	};

	/**
	 * Reset the options by setting promise as state.
	 */
	const resetOptions = async () => {
		const resetOptionsPromise = SendCommand( 'wpac_reset_options', { ajaxifyFormData: formValues } );
		setResetPromise( resetOptionsPromise );
		setResetting( true );
		const resetResponse = await resetOptionsPromise;
		reset(
			resetResponse.data.data.formData,
			{
				keepErrors: false,
				keepDirty: false,
			},
		);
		setResetting( false );
	};

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const getSaveIcon = () => {
		if ( saving ) {
			return () => <Loader2 />;
		}
		if ( isSaved ) {
			return () => <ClipboardCheck />;
		}
		return false;
	};

	const getSaveText = () => {
		if ( saving ) {
			return __( 'Saving…', 'wp-plugin-info-card' );
		}
		if ( isSaved ) {
			return __( 'Saved', 'wp-plugin-info-card' );
		}
		return __( 'Save Options', 'wp-plugin-info-card' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Resetting to Defaults…', 'wp-plugin-info-card' );
		}
		if ( isReset ) {
			return __( 'Options Restored to Defaults', 'wp-plugin-info-card' );
		}
		return __( 'Reset to Defaults', 'wp-plugin-info-card' );
	};

	return (
		<>
			<div className="ajaxify-admin-buttons">
				<Button
					className={ classNames(
						'ajaxify__btn ajaxify__btn-primary ajaxify__btn--icon-right',
						{ 'has-error': hasErrors() },
						{ 'has-icon': saving || isSaved },
						{ 'is-saving': saving && ! isSaved },
						{ 'is-saved': isSaved },
					) }
					type="button"
					text={ getSaveText() }
					icon={ getSaveIcon() }
					iconSize="18"
					iconPosition="right"
					disabled={ saving }
					onClick={ async ( e ) => {
						e.preventDefault();
						const validationResult = await trigger();
						if ( validationResult ) {
							saveOptions();
						}
					} }
				/>
				<Button
					className={ classNames(
						'ajaxify__btn ajaxify__btn-danger ajaxify__btn--icon-right',
						{ 'has-icon': resetting },
						{ 'is-resetting': { resetting } },
					) }
					type="button"
					text={ getResetText() }
					icon={ resetting ? <Loader2 /> : false }
					iconSize="18"
					iconPosition="right"
					disabled={ saving || resetting }
					onClick={ ( e ) => {
						e.preventDefault();
						resetOptions();
					} }
				/>
			</div>
			<div className="ajaxify-admin-notices-bottom">
				<SnackPop
					ajaxOptions={ savePromise }
					loadingMessage={ __( 'Saving Options…', 'wp-plugin-info-card' ) }
				/>
				<SnackPop
					ajaxOptions={ resetPromise }
					loadingMessage={ __( 'Resetting to defaults…', 'wp-plugin-info-card' ) }
				/>
				{ hasErrors() && (
					<Notice
						message={ __(
							'There are form validation errors. Please correct them above.',
							'wp-plugin-info-card',
						) }
						status="error"
						politeness="polite"
					/>
				) }
			</div>
		</>
	);
};
export default SaveResetButtons;
