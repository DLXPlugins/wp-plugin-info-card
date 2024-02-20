import React, { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
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
	FileImage,
	ImageDown,
} from 'lucide-react';
import ErrorBoundary from '../../components/ErrorBoundary';
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';
import SnackPop from '../../components/SnackPop';
import Wizard from './screens/wizard/index';

const ScreenshotsScreen = ( props ) => {
	const [ screenshotOptions, setScreenshotOptions ] = useState( null );

	useEffect( () => {
		if ( screenshotOptions ) {
			return;
		}

		// const cachedOptions = localStorage.getItem( 'wppic_screenshot_options' );
		// const cachedTimestamp = localStorage.getItem( 'wppic_screenshot_options_timestamp' );

		// if ( cachedOptions && cachedTimestamp ) {
		// 	// Do verison check.
		// 	const currentVersion = wppicAdmin.pluginVersion;
		// 	const cachedJson = JSON.parse( cachedOptions );
		// 	const cachedVersion = cachedJson.version;
		// 	if ( currentVersion !== cachedVersion ) {
		// 		localStorage.removeItem( 'wppic_screenshot_options' );
		// 		localStorage.removeItem( 'wppic_screenshot_options_timestamp' );
		// 		return;
		// 	}
		// 	const currentTime = new Date().getTime();
		// 	const cacheExpiration = parseInt( cachedTimestamp ) + 3600000;
		// 	if ( currentTime < cacheExpiration ) {
		// 		setScreenshotOptions( cachedJson );
		// 		return;
		// 	}
		// }

		const fetchOptions = async () => {
			const response = await SendCommand( 'wppic_get_screenshot_options', {
				nonce: wppicAdminScreenshots.getNonce,
			} );
			const { success, data } = response.data;
			if ( success ) {
				// Save to local storage.
				localStorage.setItem( 'wppic_screenshot_options', JSON.stringify( data ) );
				localStorage.setItem( 'wppic_screenshot_options_timestamp', new Date().getTime().toString() );

				setScreenshotOptions( data );
			}
		};
		// Fetch options.
		fetchOptions();
	}, [] );

	if ( ! screenshotOptions ) {
		return (
			<div className="wppic-admin-panel-loading">
				<h2>{ __( 'Loading Options', 'wp-plugin-info-card' ) }</h2>
				<BeatLoader color={ '#333' } loading={ true } cssOverride={ true } size={ 25 } speedMultiplier={ 0.65 } />
			</div>
		);
	}

	return (
		<Interface data={ screenshotOptions } { ...props } />
	);
};

const Interface = ( props ) => {
	const { data } = props;

	console.log( data );
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
			enable_screenshots: data.enable_screenshots,
			enable_local_screenshots: data.enable_local_screenshots,
			enable_local_screenshots_download_missing: data.enable_local_screenshots_download_missing,
			enable_local_screenshots_keep_current: data.enable_local_screenshots_keep_current,
			enable_local_screenshots_cli_command: data.enable_local_screenshots_cli_command,
			skip_animated_gifs: data.skip_animated_gifs,
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
	const onSubmit = ( formData ) => {
		// Update local storage.
		localStorage.setItem( 'wppic_screenshot_options', JSON.stringify( formData ) );
		localStorage.setItem( 'wppic_screenshot_options_timestamp', new Date().getTime().toString() );
	};

	return (
		<>
			<div className="wppic-admin-panel-container with-sidebar">
				<div className="wppic-admin-panel-options-wrapper">
					<div className="wppic-admin-panel-area">
						<div className="wppic-admin-panel-area__section">
							<h2>
								<FileImage />
								{ __( 'Screenshots', 'wp-plugin-info-card' ) }
							</h2>
							<p className="description">
								{ __(
									'With two blocks and two shortcodes, you can easily display a fully featured plugin and theme card with screenshots. This makes for a stylish way to display plugins and themes.',
									'wp-plugin-info-card',
								) }
							</p>
							<form onSubmit={ handleSubmit( onSubmit ) }>
								<table className="form-table form-table-row-sections">
									<tbody>
										<tr>
											<th scope="row">
												{ __( 'Options', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="enable_screenshots"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __( 'Enable Screenshots', 'wp-plugin-info-card' ) }
																checked={ value }
																onChange={ ( newValue ) => onChange( newValue ) }
																help={ __( 'Enable or disable screenshots for all blocks and shortcodes.', 'wp-plugin-info-card' ) }
															/>
														) }
													/>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">
												{ __( 'Local Screenshots', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="enable_local_screenshots"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __( 'Enable Local Screenshots', 'wp-plugin-info-card' ) }
																checked={ value }
																onChange={ ( newValue ) => onChange( newValue ) }
																help={ __( 'Local screenshots are stored on your server, which can be useful for privacy and performance.', 'wp-plugin-info-card' ) }
															/>
														) }
													/>
												</div>
												{ getValues( 'enable_local_screenshots' ) && (
													<>
														<div className="wppic-admin-row">
															<Controller
																name="skip_animated_gifs"
																control={ control }
																render={ ( { field: { onChange, value } } ) => (
																	<ToggleControl
																		label={ __( 'Skip Animated GIFs', 'wp-plugin-info-card' ) }
																		checked={ value }
																		onChange={ ( newValue ) => onChange( newValue ) }
																		help={ __( 'Animated GIFs can be large and slow to load. This option will skip them.', 'wp-plugin-info-card' ) }
																	/>
																) }
															/>
														</div>
														<div className="wppic-admin-row">
															<Controller
																name="enable_local_screenshots_download_missing"
																control={ control }
																render={ ( { field: { onChange, value } } ) => (
																	<ToggleControl
																		label={ __( 'Download Missing Screenshots', 'wp-plugin-info-card' ) }
																		checked={ value }
																		onChange={ ( newValue ) => onChange( newValue ) }
																		help={ __( 'Automatically download missing screenshots from the WordPress.org API.', 'wp-plugin-info-card' ) }
																	/>
																) }
															/>
														</div>
														<div className="wppic-admin-row">
															<Controller
																name="enable_local_screenshots_keep_current"
																control={ control }
																render={ ( { field: { onChange, value } } ) => (
																	<ToggleControl
																		label={ __( 'Keep Screenshots Up-to-Date', 'wp-plugin-info-card' ) }
																		checked={ value }
																		onChange={ ( newValue ) => onChange( newValue ) }
																		help={ __( 'Make sure old screenshots are refreshed when a plugin or theme releases new ones.', 'wp-plugin-info-card' ) }
																	/>
																) }
															/>
														</div>
														<div className="wppic-admin-row">
															<Controller
																name="enable_local_screenshots_cli_command"
																control={ control }
																render={ ( { field: { onChange, value } } ) => (
																	<ToggleControl
																		label={ __( 'Enable WP-CLI Command', 'wp-plugin-info-card' ) }
																		checked={ value }
																		onChange={ ( newValue ) => onChange( newValue ) }
																		help={ __( 'Use this command to update screenshots with WP-CLI.', 'wp-plugin-info-card' ) }
																	/>
																) }
															/>
														</div>
													</>
												) }
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
							<ImageDown />
							{ __( 'Image Queue', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'There are 200 images in the queue.',
								'wp-plugin-info-card',
							) }
						</p>
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
