import { useState } from 'react';
import classnames from 'classnames';
import { TextControl, Button, Spinner } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import Notice from '../../../components/Notice';
import { Download, X, Check} from 'lucide-react';

const ImportPluginFile = ( props ) => {
	const [ importing, setImporting ] = useState( false );
	const [ statusMessage, setStatusMessage ] = useState( '' );
	const [ hasImported, setHasImported ] = useState( false );
	const {
		control,
		handleSubmit,
		getValues,
		reset,
		setValue,
		setError,
		clearErrors,
		trigger,
	} = useForm( {
		defaultValues: {
			jsonFile: '',
		},
	} );
	const formValues = useWatch( { control } );
	const { errors } = useFormState( {
		control,
	} );

	/**
	 * Placeholder for submit event.
	 *
	 * @param {Object} formData contains the form data.
	 */
	const onSubmit = async () => {
		setImporting( true );
		const fileInput = document.getElementById( 'wppic-import-plugin-file-input' );
		const file = fileInput.files[0];

		if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
			return alert( 'Please upload a .json file.' );
		}
		const formData = new FormData();
		formData.append( 'jsonFile', file );
		const response = await fetch( wppicAdminCustomPlugin.restUrl, {
			method: 'POST',
			body: formData,
			headers: {
				'X-WP-Nonce': wppicAdminCustomPlugin.restNonce,
			},
		} );
		if ( response.ok ) {
			const data = await response.json();
			const maybeErrors = data.errors;
			if ( maybeErrors.length > 0 ) {
				let errorMessage = '';
				maybeErrors.forEach( ( error ) => {
					errorMessage += error + '\n\r';
				} );
				setError( 'jsonFile', { message: errorMessage } );
			}
			setStatusMessage(
				sprintf(
					/* translators: %d: total items, %s: current item */
					_n(
						'Imported %1$d of %2$d items.',
						'Imported %1$d of %2$d items.',
						data.total_items,
						'wp-plugin-info-card',
					),
					data.current_item,
					data.total_items,
					'wp-plugin-info-card',
				),
			);
			setHasImported( true );
		}
		setImporting( false );
	};
	
	return (
		<>
			<div className="wppic-import-plugin-file">
				<form onSubmit={ handleSubmit( onSubmit ) }>
					{ ! hasImported && (
						<>
							<Controller
								control={ control }
								name="jsonFile"
								rules={ { required: true } }
								render={ ( { field } ) => (
									<>
										<TextControl
											id="wppic-import-plugin-file-input"
											{ ...field }
											onChange={ ( value ) => {
												field.onChange( value );
											} }
											accept="application/json"
											type="file"
											help={ __( 'Select a JSON file to import.', 'wp-plugin-info-card' ) }
											label={ __( 'Upload JSON File', 'wp-plugin-info-card' ) }
										/>
										{ errors?.jsonFile?.required && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
						</>
					) }
					{ errors?.jsonFile?.message && (
						<Notice
							message={ errors?.jsonFile?.message }
							status="error"
							politeness="assertive"
						/>
					) }
					<div className="wppic-admin-buttons">
						{
							! hasImported && (
								<Button
									className={ classnames(
										'wppic__btn wppic__btn-secondary wppic__btn--icon-right',
									) }
									variant="primary"
									type="submit"
									text={ importing ? __( 'Importing…', 'wp-plugin-info-card' ) : __( 'Import', 'wp-plugin-info-card' ) }
									icon={ importing ? <Spinner /> : <Download /> }
									iconSize="18"
									iconPosition="right"
									disabled={ importing || ! formValues.jsonFile }
								/>
							)
						}
						{
							hasImported && (
								<Button
									className={ classnames(
										'wppic__btn wppic__btn-secondary wppic__btn--icon-right',
									) }
									variant="primary"
									type="button"
									text={ __( 'Close Import Modal', 'wp-plugin-info-card' ) }
									icon={ <X /> }
									iconSize="18"
									iconPosition="left"
									onClick={ props.onClose }
								/>
							)
						}
					</div>
					{ statusMessage && (
						<Notice
							message={ statusMessage }
							status="success"
							politeness="assertive"
							icon={ Check }
						/>
					) }
				</form>
			</div>
		</>
	)
};

export default ImportPluginFile;
