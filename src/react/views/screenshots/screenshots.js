import React, { useState, Suspense, useCallback, useRef } from 'react';
import update from 'immutability-helper'
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __ } from '@wordpress/i18n';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { isURL, cleanForSlug } from '@wordpress/url';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BeatLoader from 'react-spinners/BeatLoader';
import SaveResetButtons from '../../components/SaveResetButtons';

import {
	TextControl,
	Button,
	ToggleControl,
	SelectControl,
	BaseControl,
} from '@wordpress/components';
import {
	AlertCircle,
	PlusCircle,
	ExternalLink,
	DatabaseZap,
	Cog,
	BookText,
	XCircle,
	Loader2,
	Database,
	ClipboardCheck,
	Plug2,
	Paintbrush2,
} from 'lucide-react';
import ErrorBoundary from '../../components/ErrorBoundary';
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';
import SnackPop from '../../components/SnackPop';

const retrieveHomeOptions = () => {
	return SendCommand( 'wppic_get_screenshot_options', {
		nonce: wppicAdminScreenshots.getNonce,
	} );
};

const ScreenshotsScreen = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveHomeOptions, [] );
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
						<div className="wppic-admin-panel-loading">
							<h2>{ __( 'Loading Options', 'wp-plugin-info-card' ) }</h2>
							<BeatLoader
								color={ '#DB3939' }
								loading={ true }
								cssOverride={ true }
								size={ 25 }
								speedMultiplier={ 0.65 }
							/>
						</div>
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
		setValue,
		setError,
		trigger,
	} = useForm( {
		defaultValues: {
			enable_plugin_screenshots: data.enable_plugin_screenshots,
			sync_plugin_screenshots: data.sync_plugin_screenshots,
			saveNonce: wppicAdminScreenshots.saveNonce,
			resetNonce: wppicAdminScreenshots.resetNonce,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	/**
	 * Placeholder for submit event.
	 *
	 * @param {Object} formData contains the form data.
	 */
	const onSubmit = ( formData ) => { };

	return (
		<>
			<div className="wppic-admin-panel-container with-sidebar">
				<div className="wppic-admin-panel-options-wrapper">
					<div className="wppic-admin-panel-area">
						<div className="wppic-admin-panel-area__section">
							<h2>
								<Cog />
								{ __( 'Screenshots', 'wp-plugin-info-card' ) }
							</h2>
							<p className="description">
								{ __(
									'Set the defaults for WP Plugin Info Card.',
									'wp-plugin-info-card',
								) }
							</p>
							<form onSubmit={ handleSubmit( onSubmit ) }>
								<table className="form-table form-table-row-sections">
									<tbody>
										<tr>
											<th scope="row">
												{ __( 'Layout and Colors', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="default_layout"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<SelectControl
																label={ __(
																	'Default Layout',
																	'wp-plugin-info-card',
																) }
																value={ value }
																options={ [
																	{
																		label: __( 'Card', 'wp-plugin-info-card' ),
																		value: 'default',
																	},
																	{
																		label: __(
																			'WordPress Appearance',
																			'wp-plugin-info-card',
																		),
																		value: 'wordpress',
																	},
																	{
																		label: __(
																			'Large Card Layout',
																			'wp-plugin-info-card',
																		),
																		value: 'large',
																	},
																	{
																		label: __(
																			'Flex Layout',
																			'wp-plugin-info-card',
																		),
																		value: 'flex',
																	},
																] }
																onChange={ onChange }
															/>
														) }
													/>
												</div>
												<div className="wppic-admin-row">
													<Controller
														name="colorscheme"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<SelectControl
																label={ __(
																	'Color Scheme',
																	'wp-plugin-info-card',
																) }
																value={ value }
																options={ [
																	/* Color Schemes 1-14 */
																	{
																		label: __( 'Default', 'wp-plugin-info-card' ),
																		value: 'default',
																	},
																	{
																		label: __(
																			'Color Scheme 1',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme1',
																	},
																	{
																		label: __(
																			'Color Scheme 2',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme2',
																	},
																	{
																		label: __(
																			'Color Scheme 3',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme3',
																	},
																	{
																		label: __(
																			'Color Scheme 4',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme4',
																	},
																	{
																		label: __(
																			'Color Scheme 5',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme5',
																	},
																	{
																		label: __(
																			'Color Scheme 6',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme6',
																	},
																	{
																		label: __(
																			'Color Scheme 7',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme7',
																	},
																	{
																		label: __(
																			'Color Scheme 8',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme8',
																	},
																	{
																		label: __(
																			'Color Scheme 9',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme9',
																	},
																	{
																		label: __(
																			'Color Scheme 10',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme10',
																	},
																	{
																		label: __(
																			'Color Scheme 11',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme11',
																	},
																	{
																		label: __(
																			'Color Scheme 12',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme12',
																	},
																	{
																		label: __(
																			'Color Scheme 13',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme13',
																	},
																	{
																		label: __(
																			'Color Scheme 14',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme14',
																	},
																] }
																onChange={ onChange }
															/>
														) }
													/>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">
												{ __( 'Scripts and Styles', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="widget"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __(
																	'Force Enqueue Scripts and Styles',
																	'wp-plugin-info-card',
																) }
																checked={ value }
																onChange={ onChange }
																help={ __(
																	'By default the plugin enqueues scripts (JS & CSS) only for pages containing the shortcode. If you wish to force scripts enqueuing, check this box.',
																	'wp-plugin-info-card',
																) }
															/>
														) }
													/>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">{ __( 'Cache', 'wp-plugin-info-card' ) }</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="cache_expiration"
														control={ control }
														rules={ { required: true } }
														render={ ( { field: { onChange, value } } ) => (
															<TextControl
																label={ __(
																	'Cache Expiration',
																	'wp-plugin-info-card',
																) }
																value={ value }
																onChange={ onChange }
																help={ __(
																	'Set the cache expiration in seconds. Default is 3600 seconds (1 hour).',
																	'wp-plugin-info-card',
																) }
															/>
														) }
													/>
													{ 'required' === errors.cache_expiration?.type && (
														<Notice
															message={ __(
																'This is a required field.',
																'wp-plugin-info-card',
															) }
															status="error"
															politeness="assertive"
															inline={ false }
															icon={ () => <AlertCircle /> }
														/>
													) }
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">
												{ __( 'Dashboard Widget', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="widget"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __(
																	'Enable Dashboard Widget',
																	'wp-plugin-info-card',
																) }
																checked={ value }
																onChange={ onChange }
																help={ __(
																	'Check this box to enable the Dashboard Widget. Be sure to show the widget in the WordPress dashboard settings by enabling it in screen options.',
																	'wp-plugin-info-card',
																) }
															/>
														) }
													/>
												</div>
												<div className="wppic-admin-row">
													<Controller
														name="ajax"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __(
																	'Enable Ajax Loading',
																	'wp-plugin-info-card',
																) }
																checked={ value }
																onChange={ onChange }
																help={ __(
																	'Check this box to enable the Ajax loading of the Dashboard Widget.',
																	'wp-plugin-info-card',
																) }
															/>
														) }
													/>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">
												{ __( 'Plugins', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<p className="wppic-admin-description">{ __( 'Add or remove plugins that will display in the WordPress Dashboard.', 'wp-plugin-info-card' ) }</p>
												</div>
												<div className="wppic-admin-row">
													<AddPlugin
														onChange={ ( value ) => {
															const oldPlugins = getValues( 'list' );
															const newPlugins = [ ...oldPlugins, value ];
															setValue( 'list', newPlugins );
														} }
														formValues={ formValues }
													/>
												</div>
												<div className="wppic-admin-row">{ getPlugins() }</div>
											</td>
										</tr>
										<tr>
											<th scope="row">
												{ __( 'Themes', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<AddTheme
														onChange={ ( value ) => {
															const oldThemes = getValues( 'theme-list' );
															const newThemes = [ ...oldThemes, value ];
															setValue( 'theme-list', newThemes );
														} }
														formValues={ formValues }
													/>
												</div>
												<div className="wppic-admin-row">{ getThemes() }</div>
											</td>
										</tr>
									</tbody>
								</table>
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
					</div>
				</div>
				<div className="wppic-admin-panel-sidebar">
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<DatabaseZap />
							{ __( 'Cache Options', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'WP Plugin Info Card uses a cache system to improve performance. You can clear the cache manually by clicking the button below.',
								'wp-plugin-info-card',
							) }
						</p>
						<CacheButton />
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<BookText />
							{ __( 'Documentation', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Find out how to use WP Plugin Info Card, its blocks, and its shortcodes.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="primary"
							href="https://wppic.dlxplugins.com/"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <ExternalLink /> }
							iconPosition="right"
							target="_blank"
							rel="noopener noreferrer"
						>
							{ __( 'English Documentation', 'wp-plugin-info-card' ) }
						</Button>
						<Button
							variant="primary"
							href="https://www.b-website.com/wp-plugin-info-card-plugin-base-plugin-api-wordpress-org"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <ExternalLink /> }
							iconPosition="right"
							target="_blank"
							rel="noopener noreferrer"
						>
							{ __( 'French Documentation', 'wp-plugin-info-card' ) }
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default ScreenshotsScreen;
