import React, { useState, useContext } from 'react';
import {
	Button,
	Modal,
	TextControl,
} from '@wordpress/components';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { __ } from '@wordpress/i18n';
import CustomPresetsContext from './context';

const CustomPresetDeleteModal = ( props ) => {
	const { title, editId, deleteNonce } = props;
	const [ isDeleting, setIsDeleting ] = useState( false );

	const { setSavedPresets, showDeleteModal, setShowDeleteModal } =
		useContext( CustomPresetsContext );

	const getDefaultValues = () => {
		return {
			editId,
		};
	};
	const { control, handleSubmit } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setIsDeleting( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'wppic_delete_screenshot_preset' );
		data.append( 'nonce', deleteNonce );
		data.append( 'editId', formData.editId );
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
				setSavedPresets( presets );
				setIsDeleting( false );
				setShowDeleteModal( false );
			} )
			.catch( ( error ) => {
				setIsDeleting( false );
			} );
	};

	// Don't show modal unless explicitly set.
	if ( ! showDeleteModal ) {
		return null;
	}

	return (
		<Modal
			title={ __( 'Delete Preset', 'wp-plugin-info-card' ) }
			onRequestClose={ () => setShowDeleteModal( false ) }
			className="has-preset-modal"
			shouldCloseOnClickOutside={ false }
		>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<Controller
					name="editId"
					control={ control }
					render={ ( { field } ) => <TextControl type="hidden" { ...field } /> }
				/>
				<Button
					type="submit"
					variant="primary"
					className="has-preset-modal-apply-button"
					disabled={ isDeleting }
				>
					{ isDeleting
						? __( 'Deleting…', 'wp-plugin-info-card' )
						: __( 'Delete Preset', 'wp-plugin-info-card' ) }
				</Button>
				{ ! isDeleting && (
					<Button
						variant="secondary"
						onClick={ () => {
							setShowDeleteModal( false );
						} }
					>
						{ __( 'Cancel', 'wp-plugin-info-card' ) }
					</Button>
				) }
			</form>
		</Modal>
	);
};
export default CustomPresetDeleteModal;
