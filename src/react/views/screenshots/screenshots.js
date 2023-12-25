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

const retrieveHomeOptions = async () => {
	const response = await SendCommand( 'wppic_get_screenshot_options', {
		nonce: wppicAdminScreenshots.getNonce,
	} );
	console.log( response );
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
									'Set the screenshot options for WP Plugin Info Card.',
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
													hi
												</div>
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
			</div>
		</>
	);
};
export default ScreenshotsScreen;
