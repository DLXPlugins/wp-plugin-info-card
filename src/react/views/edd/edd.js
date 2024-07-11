import React, { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __ } from '@wordpress/i18n';
import { useDrag, useDrop } from 'react-dnd';
import { isURL, cleanForSlug } from '@wordpress/url';
import BeatLoader from 'react-spinners/BeatLoader';
import SaveResetButtons from '../../components/SaveResetButtons';
import { Fancybox } from '@fancyapps/ui';

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
import usePluginPreview from '../../hooks/usePluginPreview';
import EDDIcon from '../../components/EDDIcon';

const EDD = ( props ) => {
	const [ eddOptions, setEddOptions ] = useState( null );

	useEffect( () => {
		if ( eddOptions ) {
			return;
		}

		const cachedOptions = localStorage.getItem( 'wppic_edd_options' );
		const cachedTimestamp = localStorage.getItem( 'wppic_edd_options_timestamp' );

		if ( cachedOptions && cachedTimestamp ) {
			// Do verison check.
			const currentVersion = wppicAdmin.pluginVersion;
			const cachedJson = JSON.parse( cachedOptions );
			const cachedVersion = cachedJson.version;
			if ( currentVersion !== cachedVersion ) {
				localStorage.removeItem( 'wppic_edd_options' );
				localStorage.removeItem( 'wppic_edd_options_timestamp' );
			}
			const currentTime = new Date().getTime();
			const cacheExpiration = parseInt( cachedTimestamp ) + 3600000;
			if ( currentTime < cacheExpiration ) {
				setEddOptions( cachedJson );
				return;
			}
		}

		const fetchOptions = async () => {
			const response = await SendCommand( 'wppic_get_edd_options', {
				nonce: wppicAdminEDD.getNonce,
			} );
			const { success, data } = response.data;
			console.log( response );
			if ( success ) {
				// Save to local storage.
				localStorage.setItem( 'wppic_edd_options', JSON.stringify( data ) );
				localStorage.setItem( 'wppic_edd_options_timestamp', new Date().getTime().toString() );

				setEddOptions( data );
			}
		};
		// Fetch options.
		fetchOptions();
	}, [] );

	if ( ! eddOptions ) {
		return (
			<div className="wppic-admin-panel-loading">
				<h2>{ __( 'Loading Options', 'wp-plugin-info-card' ) }</h2>
				<BeatLoader color={ '#333' } loading={ true } cssOverride={ true } size={ 25 } speedMultiplier={ 0.65 } />
			</div>
		);
	}

	return (
		<Interface data={ eddOptions } { ...props } />
	);
};

const Interface = ( props ) => {
	const { data } = props;
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
			saveNonce: wppicAdminEDD.saveNonce,
			resetNonce: wppicAdminEDD.resetNonce,
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
		// Update local storage by clearing it.
		localStorage.removeItem( 'wppic_edd_options' );
		localStorage.removeItem( 'wppic_edd_options_timestamp' );
	};

	return (
		<>
			<div className="wppic-admin-panel-container with-sidebar">
				<div className="wppic-admin-panel-options-wrapper">
					<div className="wppic-admin-panel-area">
						<div className="wppic-admin-panel-area__section">
							<h2>
								<EDDIcon />
								{ __( 'Easy Digital Downloads', 'wp-plugin-info-card' ) }
							</h2>
							<p className="description">
								{ __(
									'Set the options for retrieving and displaying EDD products.',
									'wp-plugin-info-card',
								) }
							</p>
							<form onSubmit={ handleSubmit( onSubmit ) }>
								<table className="form-table form-table-row-sections">
									<tbody>
										<tr>
											<th scope="row">
												{ __( 'Configuration', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													test
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
									onSave={ ( values ) => {
										onSubmit( values );
									} }
								/>
							</form>
						</div>
					</div>
				</div>
				<div className="wppic-admin-panel-sidebar">
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<DatabaseZap />
							{ __( 'Required Extensions', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'These extensions are required for the EDD integration to work properly.',
								'wp-plugin-info-card',
							) }
						</p>
						<div className="wppic-edd-extension">
							<h4>{ __( 'Software Licensing', 'wp-plugin-info-card' ) }</h4>
							<div className="wppic-edd-extension__image">
								<a href="https://easydigitaldownloads.com/downloads/software-licensing/" target="_blank" rel="noopener noreferrer">
									<img
										src={ wppicAdminEDD.softwareLicensingProductImage }
										alt={ __( 'Software Licensing', 'wp-plugin-info-card' ) }
										style={ {
											width: '100%',
											height: 'auto',
										} }
									/>
								</a>
							</div>
							<div className="wppic-edd-extension__status">
								{ wppicAdminEDD.softwareLicensingInstalled && (
									<>
										{ __( 'Installed and Activated', 'wp-plugin-info-card' ) }
									</>
								) }
								{ ! wppicAdminEDD.softwareLicensingInstalled && (
									<>
										{ __( 'Add-on Not Acivated', 'wp-plugin-info-card' ) }
									</>
								) }
							</div>
						</div>
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<BookText />
							{ __( 'Documentation', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Find out how to display your EDD plugins with WP Plugin Info Card.',
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
					</div>
				</div>
			</div>
		</>
	);
};
export default EDD;
