import React, { useState } from 'react';
import { AlertCircle, Loader2, ClipboardCheck } from 'lucide-react';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { Button, Snackbar } from '@wordpress/components';
import Notice from '../Notice';
import SendCommand from '../../utils/SendCommand';
import SnackPop from '../SnackPop';

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
		isEditing,
		onSave,
		onCancel,
	} = props;

	const [ saving, setSaving ] = useState( false );
	const [ deleting, setDeleting ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ isDeleted, setIsDeleted ] = useState( false );
	const [ savePromise, setSavePromise ] = useState( null );
	const [ deletePromise, setDeletePromise ] = useState( null );

	/**
	 * Save the options by setting promise as state.
	 */
	const saveOptions = async () => {
		console.log( 'saveOptions', formValues, isEditing );
		const saveOptionsPromise = SendCommand( 'wppic_save_custom_plugin', { wppicFormData: formValues, isEditing } );
		setSavePromise( saveOptionsPromise );
		setSaving( true );
		await saveOptionsPromise;
		saveOptionsPromise.then( ( response ) => {
			if ( response.data.success ) {
				setIsSaved( true );
				onSave( formValues, setError );
			}
		} );
		setSaving( false );
	};

	/**
	 * Reset the options by setting promise as state.
	 */
	const deletePlugin = async () => {
		const deletePluginPromise = SendCommand( 'wppic_delete_custom_plugin', { wppicFormData: formValues } );
		setDeletePromise( deletePluginPromise );
		setDeleting( true );
		const deleteResponse = await deletePluginPromise;
		reset(
			deleteResponse.data.data.formData,
			{
				keepErrors: false,
				keepDirty: false,
			},
		);
		setDeleting( false );
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
		return __( 'Save and Close', 'wp-plugin-info-card' );
	};

	const getDeleteText = () => {
		if ( deleting ) {
			return __( 'Deleting…', 'wp-plugin-info-card' );
		}
		if ( isDeleted ) {
			return __( 'Deleted', 'wp-plugin-info-card' );
		}
		return __( 'Delete Plugin', 'wp-plugin-info-card' );
	};

	return (
		<>
			<div className="wppic-admin-buttons">
				<Button
					className={ classNames(
						'wppic__btn wppic__btn-primary wppic__btn--icon-right',
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
						'wppic__btn wppic__btn-secondary wppic__btn--icon-right',
					) }
					type="button"
					text={ __( 'Cancel', 'wp-plugin-info-card' ) }
					disabled={ saving || deleting }
					onClick={ ( e ) => {
						e.preventDefault();
						onCancel();
					} }
				/>
				{ isEditing && (
					<Button
						className={ classNames(
							'wppic__btn wppic__btn-danger wppic__btn--icon-right',
							{ 'has-icon': deleting },
							{ 'is-deleting': deleting },
						) }
						type="button"
						text={ getDeleteText() }
						icon={ deleting ? <Loader2 /> : false }
						iconSize="18"
						iconPosition="right"
						disabled={ saving || deleting }
						onClick={ ( e ) => {
							e.preventDefault();
							deletePlugin();
						} }
					/>
				) }
			</div>
			<div className="wppic-admin-notices-bottom">
				<SnackPop
					ajaxOptions={ savePromise }
					loadingMessage={ __( 'Saving Options…', 'wp-plugin-info-card' ) }
				/>
				<SnackPop
					ajaxOptions={ deletePromise }
					loadingMessage={ __( 'Deleting Plugin…', 'wp-plugin-info-card' ) }
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
