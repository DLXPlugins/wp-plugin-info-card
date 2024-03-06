import React, { useEffect } from 'react';
import { Button, ToggleControl, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { useDispatch, useSelect } from '@wordpress/data';
import './store.js';
import { Check, Wand2, AlertCircle } from 'lucide-react';
import Notice from '../../../../components/Notice';
const StepThree = ( props ) => {
	const { go, nextStep, prevStep } = props;

	const { setFormData } = useDispatch( 'dlxplugins/pluginScreenshots' );
	const { getFormData } = useSelect( 'dlxplugins/pluginScreenshots' );

	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		getValues,
		reset,
		setValue,
		setError,
		trigger,
	} = useForm( {
		defaultValues: getFormData(),
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	const onSubmit = ( data ) => {
		setFormData( data );
		// Go to last step in wizard if missing images or local screenshots sync is enabled.
		if ( getValues( 'enable_local_screenshots_download_missing' ) || getValues( 'enable_local_screenshots_keep_current' ) ) {
			navigate( '/cron' );
		} else {
			navigate( '/finish' );
		}
	};

	return (
		<div className="wppic-admin-panel-container is-narrow">
			<div className="wppic-admin-panel-options-wrapper">
				<div className="wppic-admin-panel-area">
					<div className="wppic-admin-panel-area__section">
						<h2>
							<Wand2 />
							{ __( 'Finish Local Screenshots Setup', 'wp-plugin-info-card' ) }
						</h2>
						<p className="description">
							{ __(
								'Everything is ready to be saved and configured.',
								'wp-plugin-info-card',
							) }
						</p>
						<form onSubmit={ handleSubmit( onSubmit ) }>
							<div className="wppic-admin-button-row">
								<Button
									variant="primary"
									className="wppic-btn wppic-btn--primary"
									type="submit"
								>
									{ __( 'Finish Setup', 'wp-plugin-info-card' ) }
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>


	);
};
export default StepThree;