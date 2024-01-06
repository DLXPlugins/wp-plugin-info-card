import React from 'react';
import { Button, ToggleControl, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { useDispatch, useSelect } from '@wordpress/data';
import './store.js';
import { Check, Wand2, AlertCircle } from 'lucide-react';
import Notice from '../../../../components/Notice';
const StepZero 
= ( props ) => {
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
		// Go to last step if table is disabled.
		if ( ! getValues( 'enable_local_screenshots' ) ) {
			navigate( '/finish' );
			return;
		}
		// Go to next step if table is enabled.
		navigate( '/setup' );
	};

	return (
		<div className="wppic-admin-panel-container is-narrow">
			<div className="wppic-admin-panel-options-wrapper">
				<div className="wppic-admin-panel-area">
					<div className="wppic-admin-panel-area__section">
						<h2>
							<Wand2 />
							{ __( 'Screenshots Wizard', 'wp-plugin-info-card' ) }
						</h2>
						<p className="description">
							{ __(
								'In order to enable the screenshot blocks and shortcodes, some settings need to be configured first.',
								'wp-plugin-info-card',
							) }
						</p>
						<form onSubmit={ handleSubmit( onSubmit ) }>
							<div className="wppic-admin-row">
								<Controller
									name="enable_screenshots"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable the Screenshots Blocks and Shortcodes',
												'wp-plugin-info-card',
											) }
											checked={ value }
											onChange={ onChange }
											help={ __(
												'Check this toggle to enable the screenshots blocks and shortcodes.',
												'wp-plugin-info-card',
											) }
										/>
									) }
								/>
							</div>
							{
								getValues( 'enable_screenshots' ) && (
									<>
										<div className="wppic-admin-row">
											<Controller
												name="enable_local_screenshots"
												control={ control }
												render={ ( { field: { onChange, value } } ) => (
													<ToggleControl
														label={ __(
															'Enable Local Screenshots',
															'wp-plugin-info-card',
														) }
														checked={ value }
														onChange={ onChange }
														help={ __(
															'Check this option to download .org screenshots to your server for faster and native loading.',
															'wp-plugin-info-card',
														) }
													/>
												) }
											/>
										</div>
										{
											getValues( 'enable_local_screenshots' ) && (
												<>
													<div className="wppic-admin-row">
														<Controller
															name="enable_table_creation"
															control={ control }
															render={ ( { field: { onChange, value } } ) => (
																<CheckboxControl
																	label={ __(
																		'Enable Table Creation',
																		'wp-plugin-info-card',
																	) }
																	checked={ value }
																	onChange={ onChange }
																	help={ __(
																		'Check this option to enable the creation of the screenshots tables, which are required for local screenshots.',
																		'wp-plugin-info-card',
																	) }
																/>
															) }
														/>
													</div>
												</>
											)
										}
									</>
								)
							}
							{
								( getValues( 'enable_screenshots' ) && getValues( 'enable_local_screenshots' ) && ! getValues( 'enable_table_creation' ) ) && (
									<Notice
										message={ __(
											'You must enable table creation in order to enable local screenshots.',
											'wp-plugin-info-card',
										) }
										status="warning"
										politeness="assertive"
										inline={ false }
										icon={ () => <AlertCircle /> }
									/>
								)
							}
							<div className="wppic-admin-button-row">
								<Button
									variant="primary"
									className="wppic-btn wppic-btn--primary"
									type="submit"
									disabled={ getValues( 'enable_screenshots' ) && getValues( 'enable_local_screenshots' ) && ! getValues( 'enable_table_creation' ) }
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
export default StepZero;
