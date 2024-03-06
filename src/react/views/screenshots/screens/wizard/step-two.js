import React, { useEffect } from 'react';
import { Button, ToggleControl, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { useDispatch, useSelect } from '@wordpress/data';
import './store.js';
import { Check, Wand2, AlertCircle } from 'lucide-react';
import Notice from '../../../../components/Notice/index.js';
const StepTwo = ( props ) => {
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

	useEffect( () => {
		if ( ! getValues( 'enable_table_creation' ) ) {
			navigate( '/' );
		}
	}
	, [] );

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
							{ __( 'Local Screenshot Setup', 'wp-plugin-info-card' ) }
						</h2>
						<p className="description">
							{ __(
								'Here are some settings to fine-tune how local screenshots are handled.',
								'wp-plugin-info-card',
							) }
						</p>
						<form onSubmit={ handleSubmit( onSubmit ) }>
							<div className="wppic-admin-row">
								<Controller
									name="exclude_animated_gifs"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<CheckboxControl
											label={ __(
												'Exclude Animated Gifs',
												'wp-plugin-info-card',
											) }
											checked={ value }
											onChange={ onChange }
											help={ __(
												'Animated Gifs can be quite large and slow down the page load. If you do not need them, you can disable them here.',
												'wp-plugin-info-card',
											) }
										/>
									) }
								/>
							</div>
							<div className="wppic-admin-row">
								<Controller
									name="enable_local_screenshots_download_missing"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<CheckboxControl
											label={ __(
												'Download any Missing Images',
												'wp-plugin-info-card',
											) }
											checked={ value }
											onChange={ onChange }
											help={ __(
												'When using local screenshots, this option will download any missing screenshots from .org to your server.',
												'wp-plugin-info-card',
											) }
										/>
									) }
								/>
							</div>
							<div className="wppic-admin-row">
								<Controller
									name="enable_local_screenshots_keep_current"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<CheckboxControl
											label={ __(
												'Keep Local Screenshots Up to Date',
												'wp-plugin-info-card',
											) }
											checked={ value }
											onChange={ onChange }
											help={ __(
												'Screenshots get stale. This option will keep your local screenshots up to date with .org.',
												'wp-plugin-info-card',
											) }
										/>
									) }
								/>
							</div>
							<div className="wppic-admin-row">
								<Controller
									name="enable_local_screenshots_cli_command"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<CheckboxControl
											label={ __(
												'Enable Local Screenshots CLI Command',
												'wp-plugin-info-card',
											) }
											checked={ value }
											onChange={ onChange }
											help={ __(
												'Enable a CLI command that you can run using WP-CLI to download and update any missing or out-of-date screenshots.',
												'wp-plugin-info-card',
											) }
										/>
									) }
								/>
							</div>
							<div className="wppic-admin-button-row">
								<Button
									variant="secondary"
									className="wppic-btn wppic-btn--primary"
									onClick={ () => {
										prevStep();
										navigate( '/' );
									} }
								>
									{ __( 'Previous', 'wp-plugin-info-card' ) }
								</Button>
								<Button
									variant="primary"
									className="wppic-btn wppic-btn--primary"
									type="submit"
								>
									{ __( 'Next', 'wp-plugin-info-card' ) }
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>


	);
};
export default StepTwo;