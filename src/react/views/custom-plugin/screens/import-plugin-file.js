import { useState } from 'react';
import classnames from 'classnames';
import { TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import Notice from '../../../components/Notice';
import { Download } from 'lucide-react';

const ImportPluginFile = ( props ) => {
	const [ importing, setImporting ] = useState( false );
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
		console.log( response );
		setImporting( false );
	};
	
	return (
		<>
			<div className="wppic-import-plugin-file">
				<form onSubmit={ handleSubmit( onSubmit ) }>
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
									label={ __( 'JSON File', 'wp-plugin-info-card' ) }
								/>
								{ errors?.jsonFile && (
									<Notice
										message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
										status="error"
										politeness="assertive"
									/>
								) }
							</>
						) }
					/>
					<div className="wppic-admin-buttons">
						<Button
							className={ classnames(
								'wppic__btn wppic__btn-secondary wppic__btn--icon-right',
							) }
							variant="primary"
							type="submit"
							text={ __( 'Import', 'wp-plugin-info-card' ) }
							icon={ <Download /> }
							iconSize="18"
							iconPosition="right"
							disabled={ importing }
						/>
					</div>
				</form>
			</div>
		</>
	)
};

export default ImportPluginFile;
