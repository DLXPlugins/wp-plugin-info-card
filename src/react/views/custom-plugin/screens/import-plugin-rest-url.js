import { useState } from 'react';
import classnames from 'classnames';
import { TextControl, Button, Spinner } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { isURL } from '@wordpress/url';
import Notice from '../../../components/Notice';
import { Download, X, Check} from 'lucide-react';

const ImportPluginRestUrl = ( props ) => {
	const [ importing, setImporting ] = useState( false );
	const [ statusMessage, setStatusMessage ] = useState( '' );
	const [ hasImported, setHasImported ] = useState( false );
	const [ restUrlInput, setRestUrlInput ] = useState( null );
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
			restUrl: '',
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
	const onSubmit = async ( formData) => {
		setImporting( true );

		const formDataObj = new FormData();
		formDataObj.append( 'restUrl', formData.restUrl );
		
		const response = await fetch( wppicAdminCustomPlugin.importPluginRestUrl, {
			method: 'POST',
			body: formDataObj,
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
				setError( 'restUrl', { message: errorMessage } );
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
		} else {
			setError( 'restUrl', { message: __( 'Error fetching data from Remote REST API.', 'wp-plugin-info-card' ) } );
		}
		setImporting( false );
	};
	
	return (
		<>
			<div className="wppic-import-plugin-rest-url">
				<form onSubmit={ handleSubmit( onSubmit ) }>
					{ ! hasImported && (
						<>
							<Controller
								control={ control }
								name="restUrl"
								rules={ { required: true, validate: ( value ) => isURL( value ) } }
								render={ ( { field } ) => (
									<>
										<TextControl
											id="wppic-import-plugin-rest-url-input"
											{ ...field }
											onChange={ field.onChange }
											type="url"
											placeholder={ __( 'https://', 'wp-plugin-info-card' ) }
											help={ __( 'Enter the REST URL to import. This should be the URL of the REST API endpoint that contains the plugin data.', 'wp-plugin-info-card' ) }
											label={ __( 'REST URL', 'wp-plugin-info-card' ) }
										/>
										{ errors?.restUrl?.required && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
										{ errors?.restUrl?.validate && (
											<Notice
												message={ __( 'This is not a valid URL.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
						</>
					) }
					{ errors?.restUrl?.message && (
						<Notice
							message={ errors?.restUrl?.message }
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
									disabled={ importing || ! formValues.restUrl || errors?.restUrl?.validate }
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

export default ImportPluginRestUrl;
