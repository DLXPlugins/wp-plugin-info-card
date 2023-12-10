import React, { useState, Suspense } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __ } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';
import SaveResetButtons from '../../components/SaveResetButtons';

import {
	TextControl,
	Button,
	ToggleControl,
} from '@wordpress/components';
import { AlertCircle, Info, FileCode2, ExternalLink } from 'lucide-react';
import ErrorBoundary from '../../components/ErrorBoundary';
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';

const retrieveHomeOptions = () => {
	return SendCommand( 'wppic_get_home_options', {
		nonce: wppicAdminHome.getNonce,
	} );
};

const HomeScreen = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource(
		retrieveHomeOptions,
		[],
	);
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Home options.', 'wp-plugin-info-card' ) }
					<br />
					<a
						href="https://dlxplugins.com/support/"
						target="_blank"
						rel="noopener noreferrer"
					>
						DLX Plugins Support
					</a>
				</p>
			}
		>
			<Suspense
				fallback={
					<>
						<h2>{ __( 'Loading Options', 'wp-plugin-info-card' ) }</h2>
						<BeatLoader
							color={ '#873F49' }
							loading={ true }
							cssOverride={ true }
							size={ 25 }
							speedMultiplier={ 0.65 }
						/>
					</>
				}
			>
				<Interface defaults={ defaults } { ...props } />
			</Suspense>
		</ErrorBoundary>
	);
};

const Interface = ( props ) => {
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		setError,
		trigger,
	} = useForm( {
		defaultValues: {
			enable: data.enable,
			debug: data.debug,
			menuHelper: data.menuHelper,
			scrollSpeed: data.scrollSpeed,
			autoUpdateIdleTime: data.autoUpdateIdleTime,
			saveNonce: wppicAdminHome.saveNonce,
			resetNonce: wppicAdminHome.resetNonce,
			caller: 'home',
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	const getCommentEditingHeader = () => {
		return (
			<>
				<h2>
					{ __( 'Ajaxify Settings Home', 'wp-plugin-info-card' ) }
				</h2>
				<p className="description">
					{ __(
						'Enable or disable Ajaxify comments, or place into debug mode.',
						'wp-plugin-info-card',
					) }
				</p>
			</>
		);
	};

	/**
	 * Placeholder for submit event.
	 *
	 * @param {Object} formData contains the form data.
	 */
	const onSubmit = ( formData ) => {
	};

	const getFirstTimeInstallNotification = () => {
		// See if first time install by checking `first_time_install` query var.
		// Get URL.
		const url = new URL( window.location.href );
		// Get query vars.
		const queryVars = new URLSearchParams( url.search );
		// Get first time install query var.
		const firstTimeInstall = queryVars.get( 'first_time_install' );
		// If first time install, show notification.
		if ( ! firstTimeInstall ) {
			return null;
		}
		return (
			<div className="ajaxify-admin-panel-area">
				<h2>
					{ __( 'Welcome to Ajaxify Comments', 'wp-plugin-info-card' ) }
				</h2>
				<p className="description">
					{ __(
						'Let\'s help you get started.',
						'wp-plugin-info-card',
					) }
				</p>
				<Notice
					message={ __(
						'When first activated, Ajaxify Comments is not enabled by default. This is so you can set up any necessary selectors and set the appearance before enabling the Ajax functionality. To get started, please start with setting the selectors.', 'wp-plugin-info-card' ) }
					status="info"
					politeness="assertive"
					inline={ false }
					icon={ () => <Info /> }
				>
					<div className="ajaxify-admin-component-row ajaxify-admin-component-row-button" style={ { marginTop: '15px' } }>
						<Button
							href={ wppicAdminHome.selectorsUrl }
							className="ajaxify-button ajaxify__btn-secondary"
							icon={ <FileCode2 style={ { color: 'currentColor' } } /> }
						>
							{ __( 'Set Selectors', 'wp-plugin-info-card' ) }
						</Button>
						<Button
							href="https://docs.dlxplugins.com/v/ajaxify-comments/first-time-users/getting-started"
							className="ajaxify-button ajaxify__btn-secondary"
							icon={ <ExternalLink style={ { color: 'currentColor' } } /> }
							target="_blank"
							rel="noopener noreferrer"
						>
							{ __( 'Getting Started Guide', 'wp-plugin-info-card' ) }
						</Button>
					</div>

				</Notice>
			</div>
		);
	};

	return (
		<>
			{ getFirstTimeInstallNotification() }
			<div className="ajaxify-admin-panel-area">
				{ getCommentEditingHeader() }
				<form onSubmit={ handleSubmit( onSubmit ) }>
					<div className="ajaxify-panel-row">
						<table className="form-table form-table-row-sections">
							<tbody>
								<tr>
									<th scope="row">{ __( 'Ajaxify Status', 'wp-plugin-info-card' ) }</th>
									<td>
										<Controller
											name="enable"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Enable Ajaxify Comments', 'wp-plugin-info-card' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'Configure whether to enable or disable Ajaxify Comments.',
														'wp-plugin-info-card',
													) }
												/>
											) }
										/>
										{
											getValues( 'enable' ) && (
												<>
													<Controller
														name="debug"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __( 'Enable Debug Mode', 'wp-plugin-info-card' ) }
																checked={ value }
																onChange={ ( boolValue ) => {
																	onChange( boolValue );
																} }
																help={ __(
																	'Debug mode will show you the Ajaxify Comments debug log in the browser console.',
																	'wp-plugin-info-card',
																) }
															/>
														) }
													/>
												</>
											)
										}
									</td>
								</tr>
								<tr>
									<th scope="row">{ __( 'Menu Helper', 'wp-plugin-info-card' ) }</th>
									<td>
										<Controller
											name="menuHelper"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Enable Menu Helper', 'wp-plugin-info-card' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'Turn on some menu shortcuts when viewing a post with comments. You can force Ajaxify comments to load, and check the page for selectors.',
														'wp-plugin-info-card',
													) }
												/>
											) }
										/>
									</td>
								</tr>
								<tr>
									<th scope="row">{ __( 'Miscellaneous', 'wp-plugin-info-card' ) }</th>
									<td>
										<Controller
											name="scrollSpeed"
											control={ control }
											rules={ { required: true, pattern: '\d+' } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __( 'Scroll speed (ms)', 'wp-plugin-info-card' ) }
													type="number"
													className={ classNames( 'ajaxify-admin__text-control', {
														'has-error': 'required' === errors.scrollSpeed?.type,
														'is-required': true,
													} ) }
													help={ __(
														'The scroll speed is the time it takes to scroll to the comment after successful submission.',
														'wp-plugin-info-card',
													) }
													aria-required="true"
													value={ value }
													onChange={ onChange }
												/>
											) }
										/>
										{ errors.scrollSpeed && (
											<Notice
												message={ __(
													'The value for the scroll speed is invalid.',
													'wp-plugin-info-card',
												) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ () => <AlertCircle /> }
											/>
										) }
										<Controller
											name="autoUpdateIdleTime"
											control={ control }
											rules={ { required: true, pattern: '\d+' } }
											render={ ( { field: { onChange, value } } ) => (
												<TextControl
													label={ __( 'Auto update idle time (ms)', 'wp-plugin-info-card' ) }
													type="number"
													className={ classNames( 'ajaxify-admin__text-control', {
														'has-error': 'required' === errors.autoUpdateIdleTime?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Leave empty or set to 0 to disable the auto update feature.',
														'wp-plugin-info-card',
													) }
													aria-required="true"
													value={ value }
													onChange={ onChange }
												/>
											) }
										/>
										{ errors.autoUpdateIdleTime && (
											<Notice
												message={ __(
													'The value for the idle time is invalid.',
													'wp-plugin-info-card',
												) }
												status="error"
												politeness="assertive"
												inline={ false }
												icon={ () => <AlertCircle /> }
											/>
										) }
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<SaveResetButtons
						formValues={ formValues }
						setError={ setError }
						reset={ reset }
						errors={ errors }
						isDirty={ isDirty }
						dirtyFields={ dirtyFields }
						trigger={ trigger }
					/>
				</form>
			</div>

		</>
	);
};
export default HomeScreen;
