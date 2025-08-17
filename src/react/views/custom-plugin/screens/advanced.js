import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Link } from '@tanstack/react-router';
import { __ } from '@wordpress/i18n';
import { ToggleControl, Button, Spinner, TextControl } from '@wordpress/components';
import { Cog, BookText, ExternalLink, TriangleAlert } from 'lucide-react';
import SendCommand from '../../../utils/SendCommand';
import SnackStatus from '../../../components/SnackStatus';
import Notice from '../../../components/Notice';

const Breadcrumbs = () => (
	<div className="wppic-admin-panel-breadcrumbs">
		<div className="wppic-admin-panel-breadcrumbs__item">
			<Link href="/">
				{ __( 'Custom Plugin Cards', 'wp-plugin-info-card' ) }
			</Link>
			{ ' > ' }
			<span className="wppic-admin-panel-breadcrumbs__item-current">
				{ __( 'Advanced Settings', 'wp-plugin-info-card' ) }
			</span>
		</div>
	</div>
);

const Advanced = () => {
	const [ advancedOptions, setAdvancedOptions ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ error, setError ] = useState( null );
	const [ saving, setSaving ] = useState( false );

	const [ snackbarOptions, setSnackbarOptions ] = useState( {
		isVisible: false,
		type: 'info',
		message: '',
		title: '',
		politeness: 'polite',
	} );

	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm( {
		defaultValues: {
			enable_rest_api: false,
			ping_rest_api_interval: 14,
			enable_custom_plugins: true,
			nonce: wppicAdminCustomPlugin.saveAdvancedNonce,
		},
	} );

	const formValues = useWatch( { control } );

	useEffect( () => {
		if ( advancedOptions ) {
			return;
		}

		setLoading( true );

		const fetchOptions = async () => {
			const response = await SendCommand( 'wppic_get_custom_plugin_advanced_options', {
				nonce: wppicAdminCustomPlugin.getNonce,
			} );
			const { success, data } = response.data;
			if ( success ) {
				reset( {
					enable_rest_api: data.options.enable_rest_api,
					enable_custom_plugins: data.options.enable_custom_plugins,
					ping_rest_api_interval: data.options.ping_rest_api_interval,
				} );
				setAdvancedOptions( data.options );
			} else {
				setError( data.message );
			}
			setLoading( false );
		};
		// Fetch options.
		fetchOptions();
	}, [] );

	/**
	 * Save the advanced settings.
	 *
	 * @param {Object} formData Form data to save.
	 */
	const onSubmit = async ( formData ) => {
		setSaving( true );
		try {
			const response = await SendCommand( 'wppic_save_custom_plugin_advanced_options', {
				nonce: wppicAdminCustomPlugin.saveAdvancedNonce,
				enable_rest_api: formData.enable_rest_api,
				enable_custom_plugins: formData.enable_custom_plugins,
				ping_rest_api_interval: formData.ping_rest_api_interval,
			} );

			const { success } = response.data;
			if ( success ) {
				// Show success notice.
				setSnackbarOptions( {
					isVisible: true,
					type: 'success',
					message: __( 'Settings saved', 'wp-plugin-info-card' ),
					title: __( 'Success', 'wp-plugin-info-card' ),
				} );
			}
		} catch ( e ) {
			setError( e.message );
			// Show error notice.
		}
		setSaving( false );
	};

	const tableContent = (
		<table className="form-table form-table-row-sections">
			<tbody>
				<tr>
					<th scope="row">
						{ __( 'Custom Plugins', 'wp-plugin-info-card' ) }
					</th>
					<td>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="enable_custom_plugins"
								render={ ( { field } ) => (
									<ToggleControl
										{ ...field }
										checked={ field.value }
										label={ __( 'Enable Custom Plugins', 'wp-plugin-info-card' ) }
										help={ __( 'Enable the custom plugins feature. Disabling this will prevent custom plugins from being rendered on the front-end. This will not disable the Custom Plugins interface in the admin panel.', 'wp-plugin-info-card' ) }
									/>
								) }
							/>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row">
						{ __( 'REST API Settings', 'wp-plugin-info-card' ) }
					</th>
					<td>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="enable_rest_api"
								render={ ( { field } ) => (
									<ToggleControl
										{ ...field }
										checked={ field.value }
										label={ __( 'Enable REST API', 'wp-plugin-info-card' ) }
										help={ __( 'Allow plugins to have a REST API enabled so that others can import the plugin data (if enabled). Disabilng this will remove all REST API access.', 'wp-plugin-info-card' ) }
									/>
								) }
							/>
						</div>
						{
							formValues.enable_rest_api && (
								<>
									<div className="wppic-admin-row">
										<Controller
											control={ control }
											name="ping_rest_api_interval"
											type="number"
											pattern="[1-9][0-9]*"
											render={ ( { field } ) => (
												<TextControl
													{ ...field }
													label={ __( 'Sync from REST API Interval (in days)', 'wp-plugin-info-card' ) }
													help={ __( 'If you sync plugins from REST, this is how often the plugin\'s REST API will be pinged to check for updates. The default is 14 days.', 'wp-plugin-info-card' ) }
												/>
											) }
										/>
										{
											errors?.ping_rest_api_interval?.pattern && (
												<Notice
													type="error"
													message={ __( 'Please enter a valid number above zero.', 'wp-plugin-info-card' ) }
													icon={ () => <TriangleAlert /> }
												/>
											)
										}
									</div>
								</>
							)
						}
					</td>
				</tr>
			</tbody>
		</table>
	);

	return (
		<>
			<div className="wppic-admin-panel-container with-sidebar">
				<div className="wppic-admin-panel-options-wrapper">
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<Breadcrumbs />
						<div className="wppic-admin-panel-area">
							<div className="wppic-admin-panel-area__section">
								<h2>
									<Cog />
									<span className="wppic-admin-panel-area__section-title">
										{ __( 'Advanced Settings', 'wp-plugin-info-card' ) }
									</span>
								</h2>
							</div>
							{ loading ? (
								<div className="wppic-admin-row">
									<Spinner />
								</div>
							) : (
								tableContent
							) }
							<div className="wppic-admin-panel-area__section">
								<Button
									type="submit"
									variant="primary"
									className={ classnames(
										'wppic__btn wppic__btn-secondary wppic__btn--icon-right',
									) }
									disabled={ saving }
									icon={ () => (
										saving ? <Spinner /> : null
									) }
								>
									{
										saving ? __( 'Saving…', 'wp-plugin-info-card' ) : __( 'Save Settings', 'wp-plugin-info-card' )
									}
								</Button>
							</div>
						</div>
					</form>
				</div>
				<div className="wppic-admin-panel-sidebar">
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<BookText />
							{ __( 'Documentation', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Learn more about the REST API and advanced settings in WP Plugin Info Card.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="secondary"
							href="https://docs.dlxplugins.com/wp-plugin-info-card/"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							target="_blank"
							onClick={ ( e ) => {
								e.preventDefault();
								window.open( 'https://docs.dlxplugins.com/wp-plugin-info-card/', '_blank' );
							} }
							rel="noopener noreferrer"
							icon={ () => <ExternalLink /> }
						>
							{ __( 'View Documentation', 'wp-plugin-info-card' ) }
						</Button>
					</div>
				</div>
			</div>
			<SnackStatus snackbarOptions={ snackbarOptions } onTimeout={ () => {
				const newSnackbarOptions = {
					...snackbarOptions,
					isVisible: false,
				};
				setSnackbarOptions( newSnackbarOptions );
			} } />
		</>
	);
};

export default Advanced;
