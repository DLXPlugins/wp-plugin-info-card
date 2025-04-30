import React, { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classnames from 'classnames';
import { Link, useNavigate } from '@tanstack/react-router';
import { __ } from '@wordpress/i18n';
import { isURL, cleanForSlug } from '@wordpress/url';
import BeatLoader from 'react-spinners/BeatLoader';
import useMediaUploader from '../../../hooks/useMediaUploader';
import PluginIcon from '../../../components/PluginIcon';
import Notice from '../../../components/Notice';

import {
	TextControl,
	Button,
	ToggleControl,
	SelectControl,
	BaseControl,
	TextareaControl,
} from '@wordpress/components';
import {
	CloudDownload,
	Download,
	ExternalLink,
	BookText,
	Plug2,
	Plus,
	AlertCircle,
} from 'lucide-react';
import SendCommand from '../../../utils/SendCommand';
const Breadcrumbs = ( { screen, isEditing } ) => (
	<div className="wppic-admin-panel-breadcrumbs">
		<div className="wppic-admin-panel-breadcrumbs__item">
			<Link href="/">
				{ __( 'Custom Plugins', 'wp-plugin-info-card' ) }
			</Link>
			{ ' > ' }
			{ ! isEditing && (
				<span className="wppic-admin-panel-breadcrumbs__item-current">{ screen }</span>

			) }
			{ isEditing && ' > ' }
			{ isEditing && <span className="wppic-admin-panel-breadcrumbs__item-current">{ __( 'Edit', 'wp-plugin-info-card' ) }</span> }
		</div>
	</div>
);

const Plugin = ( props ) => {
	const [ pluginData, setPluginData ] = useState( {} );

	const { isEditing } = props;

	useEffect( () => {
		if ( pluginData || ! isEditing ) {
			return;
		}

		const fetchPlugin = async () => {
			const response = await SendCommand( 'wppic_get_plugin_data', {
				nonce: wppicAdminCustomPlugin.getNonce,
			} );
			const { success, data } = response.data;
			if ( success ) {
				// Save to local storage.
				localStorage.setItem( 'wppic_edd_options', JSON.stringify( data ) );
				localStorage.setItem( 'wppic_edd_options_timestamp', new Date().getTime().toString() );

				setPluginData( data );
			}
		};
		// Fetch options.
		fetchPlugin();
	}, [ isEditing, pluginData ] );

	if ( ! pluginData && isEditing ) {
		return (
			<div className="wppic-admin-panel-loading">
				<h2>{ __( 'Loading Options', 'wp-plugin-info-card' ) }</h2>
				<BeatLoader color={ '#333' } loading={ true } cssOverride={ true } size={ 25 } speedMultiplier={ 0.65 } />
			</div>
		);
	}

	return (
		<Interface data={ pluginData } { ...props } />
	);
};

const Interface = ( props ) => {
	const { isEditing, data } = props;
	const navigate = useNavigate();
	const [ isChecking, setIsChecking ] = useState( false );
	const [ isError, setIsError ] = useState( false );
	const [ isWarning, setIsWarning ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ warningMessage, setWarningMessage ] = useState( '' );
	const pluginSlugInputRef = useRef();

	const checkPluginSlug = async ( slug ) => {
		const checkPluginPromise = SendCommand( 'wppic_check_plugin_slug', { slug, nonce: wppicAdminCustomPlugin.checkPluginSlugNonce } );
		checkPluginPromise.catch( () => {
			setErrorMessage( __( 'There has been an error communicating with the server. Please try again.', 'wp-plugin-info-card' ) );
			setIsError( true );
			setIsChecking( false );
		} );
		const response = await checkPluginPromise;

		setIsChecking( false );
		const { success } = response.data;
		if ( success ) {
			const { data: responseData } = response.data;
			if ( responseData.display ) {
				setWarningMessage( responseData.message );
				setIsWarning( true );
			} else {
				setWarningMessage( '' );
				setIsWarning( false );
			}
		} else {
			const { data: responseData } = response.data;
			setErrorMessage( responseData.message );
			setIsError( true );
			pluginSlugInputRef.focus();
		}
	};

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
			saveNonce: wppicAdminCustomPlugin.saveNonce,
			resetNonce: wppicAdminCustomPlugin.resetNonce,
			custom_plugin_icon_id: data.custom_plugin_icon_id || 0,
			custom_plugin_banner_id: data.custom_plugin_banner_id || 0,
			custom_plugin_icon_url: data.custom_plugin_icon_url || '',
			custom_plugin_banner_url: data.custom_plugin_banner_url || '',
			name: data.name || '',
			slug: data.slug || '',
			short_description: data.short_description || '',
			url: data.url || '',
			homepage: data.homepage || '',
			download_link: data.download_link || '',
			version: data.version || '',
			author: data.author || '',
			author_profile: data.author_profile || '',
			contributors: data.contributors || '',
			requires: data.requires || '',
			tested: data.tested || '',
			rating: data.rating || '',
			num_ratings: data.num_ratings || '',
			downloaded: data.downloaded || '',
			active_installs: data.active_installs || '',
			last_updated: data.last_updated || '',
			ratings: data.ratings || '',
			added: data.added || '',
			icons: data.icons || {},
			banners: data.banners || {},
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	// Media uploader for citation image upload.
	const { openMediaUploader } = useMediaUploader();

	return (
		<>
			<div className="wppic-admin-panel-container with-sidebar">
				<div className="wppic-admin-panel-options-wrapper">
					<Breadcrumbs screen={ __( 'New Plugin', 'wp-plugin-info-card' ) } isEditing={ isEditing } />
					<div className="wppic-admin-panel-area">
						<div className="wppic-admin-panel-area__section">
							<h2>
								<PluginIcon />
								{ isEditing && (
									<span className="wppic-admin-panel-area__section-title-edit">
										{ __( 'Edit Plugin', 'wp-plugin-info-card' ) }
									</span>
								) }
								{ ! isEditing && (
									<span className="wppic-admin-panel-area__section-title-new">{ __( 'New Plugin', 'wp-plugin-info-card' ) }</span>
								) }
							</h2>
						</div>
						<table className="form-table form-table-row-sections">
							<tbody>
								<tr>
									<th scope="row">
										{ __( 'Plugin Name', 'wp-plugin-info-card' ) }
									</th>
									<td>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="name"
												rules={ { required: true } }
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														placeholder={ __( 'Enter Plugin Name', 'wp-plugin-info-card' ) }
														className="wppic-admin-input is-required"
														help={ __( 'Enter the name of the plugin.', 'wp-plugin-info-card' ) }
														label={ __( 'Plugin Name', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="slug"
												rules={ {
													required: true,
													pattern: /^[-_a-z0-9]+$/,
												} }
												render={ ( { field } ) => (
													<>
														<TextControl
															{ ...field }
															placeholder={ __( 'Enter Plugin Slug', 'wp-plugin-info-card' ) }
															className={ classnames( 'wppic-admin-input', { 'is-required': true } ) }
															help={ __( 'Enter the slug of the plugin. It must be unique and contain only lowercase letters, dashes, and underscores.', 'wp-plugin-info-card' ) }
															label={ __( 'Plugin Slug', 'wp-plugin-info-card' ) }
															onChange={ ( value ) => {
																clearErrors( 'slug' );
																field.onChange( value );
															} }
															ref={ pluginSlugInputRef }
															onBlur={ ( value ) => {
																trigger( 'slug' );
																setIsChecking( true );
																setErrorMessage( '' );
																setIsError( false );
																checkPluginSlug( getValues( 'slug' ) ); // todo - possibly exclude when editing.
															} }
														/>
														{ isChecking && (
															<div className="wppic-admin-row">
																<BeatLoader color={ '#333' } loading={ true } cssOverride={ true } size={ 10 } speedMultiplier={ 0.65 } />
															</div>
														) }
														{ ( isWarning && warningMessage ) && (
															<div className="wppic-admin-row">
																<Notice
																	message={ warningMessage }
																	status="warning"
																	politeness="assertive"
																	icon={ () => <AlertCircle style={ { color: 'currentColor' } } /> }
																	inline={ false }
																/>
															</div>
														) }
														{ ( errors?.slug && errors?.slug?.type === 'pattern' ) && (
															<div className="wppic-admin-row">
																<Notice
																	message={ __( 'The slug must contain only lowercase letters and underscores.', 'wp-plugin-info-card' ) }
																	status="error"
																	politeness="assertive"
																	icon={ () => <AlertCircle style={ { color: 'currentColor' } } /> }
																	inline={ false }
																/>
															</div>
														) }
													</>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="short_description"
												rules={ { required: true } }
												render={ ( { field } ) => (
													<TextareaControl
														{ ...field }
														placeholder={ __( 'Enter a Short Description', 'wp-plugin-info-card' ) }
														className="wppic-admin-input is-required"
														help={ __( 'Enter the a short description of the plugin. Max 150 characters.', 'wp-plugin-info-card' ) }
														label={ __( 'Short Description', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">
										{ __( 'Icons and Banners', 'wp-plugin-info-card' ) }
									</th>
									<td>
										<div className="wppic-admin-row">
											<BaseControl
												id="wppic-admin-plugin-icon-control"
												help={ __( 'Select an Icon with dimensions 256x256', 'wp-plugin-inf	o-card' ) }
											>
												{ getValues( 'custom_plugin_icon_url' ) && (
													<div className="wppic-admin-image-preview">
														<img
															src={ getValues( 'custom_plugin_icon_url' ) }
															alt={ __( 'Default Icon', 'wp-plugin-info-card' ) }
															width="180"
															height="180"
															style={ {
																width: '180px',
																height: '180px',
															} }
														/>
													</div>
												) }
												<div className="wppic-admin-button-row">
													<Button
														variant="secondary"
														className="wppic-btn wppic-btn-alt"
														onClick={ () => {
															openMediaUploader( {
																attachmentId: 0,
																title: __( 'Select Default Plugin Icon', 'wp-plugin-info-card' ),
																suggestedWidth: 256,
																suggestedHeight: 256,
																cropSettings: {
																	width: 256,
																	height: 256,
																},
																aspectRatio: '1:1',
															}, ( media ) => {
																setValue( 'custom_plugin_icon_id', media.id );
																setValue( 'custom_plugin_icon_url', media.url );
															} );
														} }
														help={ __( 'Select an Icon with dimensions 256x256', 'wp-plugin-info-card' ) }
													>
														{ __( 'Upload Icon', 'wp-plugin-info-card' ) }
													</Button>
													{ ( getValues( 'custom_plugin_icon_id' ) !== 0 ) && (
														<Button
															variant="secondary"
															className="wppic-btn wppic-btn-alt"
															onClick={ () => {
																setValue( 'custom_plugin_icon_id', 0 );
																setValue( 'custom_plugin_icon_url', '' );
															} }
															isDestructive={ true }
														>
															{ __( 'Remove Icon', 'wp-plugin-info-card' ) }
														</Button>
													) }

												</div>
											</BaseControl>
										</div>
										<div className="wppic-admin-row">
											<BaseControl
												id="wppic-admin-plugin-banner-control"
												help={ __( 'Select an Icon with dimensions 1544x720', 'wp-plugin-info-card' ) }
											>
												{ getValues( 'custom_plugin_banner_url' ) && (
													<div className="wppic-admin-image-preview">
														<img
															src={ getValues( 'custom_plugin_banner_url' ) }
															alt={ __( 'Default Icon', 'wp-plugin-info-card' ) }
															width="180"
															height="180"
															style={ {
																width: '772px',
																height: '250px',
															} }
														/>
													</div>
												) }
												<div className="wppic-admin-button-row">
													<Button
														variant="secondary"
														className="wppic-btn wppic-btn-alt"
														onClick={ () => {
															openMediaUploader( {
																attachmentId: 0,
																title: __( 'Select Plugin Banner', 'wp-plugin-info-card' ),
																suggestedWidth: 1544,
																suggestedHeight: 500,
																cropSettings: {
																	width: 1544,
																	height: 500,
																},
																aspectRatio: '386:125',
															}, ( media ) => {
																setValue( 'custom_plugin_banner_id', media.id );
																setValue( 'custom_plugin_banner_url', media.url );
															} );
														} }
														help={ __( 'Select an Icon with dimensions 1544x720', 'wp-plugin-info-card' ) }
													>
														{ __( 'Upload Banner Image', 'wp-plugin-info-card' ) }
													</Button>
													{ ( getValues( 'custom_plugin_banner_id' ) !== 0 ) && (
														<Button
															variant="secondary"
															className="wppic-btn wppic-btn-alt"
															onClick={ () => {
																setValue( 'custom_plugin_banner_id', 0 );
																setValue( 'custom_plugin_banner_url', '' );
															} }
															isDestructive={ true }
														>
															{ __( 'Remove Banner', 'wp-plugin-info-card' ) }
														</Button>
													) }
												</div>
											</BaseControl>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">
										{ __( 'Plugin Details', 'wp-plugin-info-card' ) }
									</th>
									<td>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="version"
												rules={ { required: true } }
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														placeholder={ __( 'Enter Plugin Version', 'wp-plugin-info-card' ) }
														className="wppic-admin-input is-required"
														help={ __( 'Enter the version of the plugin.', 'wp-plugin-info-card' ) }
														label={ __( 'Version', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="requires"
												rules={ { required: true } }
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														placeholder={ __( 'Enter Required WordPress Version', 'wp-plugin-info-card' ) }
														className="wppic-admin-input is-required"
														help={ __( 'Enter the minimum WordPress version required.', 'wp-plugin-info-card' ) }
														label={ __( 'Required WordPress Version', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="tested"
												rules={ { required: true } }
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														placeholder={ __( 'Enter Tested WordPress Version', 'wp-plugin-info-card' ) }
														className="wppic-admin-input is-required"
														help={ __( 'Enter the WordPress version this plugin has been tested with.', 'wp-plugin-info-card' ) }
														label={ __( 'Tested WordPress Version', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">
										{ __( 'Plugin Links', 'wp-plugin-info-card' ) }
									</th>
									<td>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="homepage"
												rules={ {
													required: true,
													pattern: /^https?:\/\/.+/,
												} }
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														placeholder={ __( 'Enter Plugin Homepage URL', 'wp-plugin-info-card' ) }
														className="wppic-admin-input is-required"
														help={ __( 'Enter the homepage URL for the plugin.', 'wp-plugin-info-card' ) }
														label={ __( 'Homepage URL', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="download_link"
												rules={ {
													required: true,
													pattern: /^https?:\/\/.+/,
												} }
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														placeholder={ __( 'Enter Plugin Download URL', 'wp-plugin-info-card' ) }
														className="wppic-admin-input is-required"
														help={ __( 'Enter the download URL for the plugin.', 'wp-plugin-info-card' ) }
														label={ __( 'Download URL', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">
										{ __( 'Plugin Author', 'wp-plugin-info-card' ) }
									</th>
									<td>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="author"
												rules={ { required: true } }
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														placeholder={ __( 'Enter Plugin Author', 'wp-plugin-info-card' ) }
														className="wppic-admin-input is-required"
														help={ __( 'Enter the name of the plugin author.', 'wp-plugin-info-card' ) }
														label={ __( 'Author Name', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="author_profile"
												rules={ {
													pattern: /^https?:\/\/.+/,
												} }
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														placeholder={ __( 'Enter Author Profile URL', 'wp-plugin-info-card' ) }
														className="wppic-admin-input"
														help={ __( 'Enter the URL to the author\'s profile.', 'wp-plugin-info-card' ) }
														label={ __( 'Author Profile URL', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="contributors"
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														placeholder={ __( 'Enter Plugin Contributors', 'wp-plugin-info-card' ) }
														className="wppic-admin-input"
														help={ __( 'Enter comma-separated WordPress.org usernames of contributors.', 'wp-plugin-info-card' ) }
														label={ __( 'Contributors', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">
										{ __( 'Plugin Stats', 'wp-plugin-info-card' ) }
									</th>
									<td>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="rating"
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														type="number"
														min="0"
														max="100"
														placeholder={ __( 'Enter Plugin Rating', 'wp-plugin-info-card' ) }
														className="wppic-admin-input"
														help={ __( 'Enter the plugin rating percentage (0-100%).', 'wp-plugin-info-card' ) }
														label={ __( 'Rating', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="num_ratings"
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														type="number"
														min="0"
														placeholder={ __( 'Enter Number of Ratings', 'wp-plugin-info-card' ) }
														className="wppic-admin-input"
														help={ __( 'Enter the total number of ratings.', 'wp-plugin-info-card' ) }
														label={ __( 'Number of Ratings', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="downloaded"
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														type="number"
														min="0"
														placeholder={ __( 'Enter Download Count', 'wp-plugin-info-card' ) }
														className="wppic-admin-input"
														help={ __( 'Enter the total number of downloads.', 'wp-plugin-info-card' ) }
														label={ __( 'Downloads', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="active_installs"
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														type="number"
														min="0"
														placeholder={ __( 'Enter Active Installs', 'wp-plugin-info-card' ) }
														className="wppic-admin-input"
														help={ __( 'Enter the number of active installations.', 'wp-plugin-info-card' ) }
														label={ __( 'Active Installs', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
										<div className="wppic-admin-row">
											<Controller
												control={ control }
												name="last_updated"
												render={ ( { field } ) => (
													<TextControl
														{ ...field }
														type="date"
														placeholder={ __( 'Enter Last Updated Date', 'wp-plugin-info-card' ) }
														className="wppic-admin-input"
														help={ __( 'Enter the date when the plugin was last updated.', 'wp-plugin-info-card' ) }
														label={ __( 'Last Updated', 'wp-plugin-info-card' ) }
													/>
												) }
											/>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="wppic-admin-panel-sidebar">
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<Plug2 />
							{ __( 'Add New Plugin', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Add a new plugin to the list of plugins.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="primary"
							href="#"
							onClick={ ( e ) => {
								e.preventDefault();
								navigate( { to: '/new-plugin' } );
							} }
							iconPosition="left"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <Plus /> }
						>
							{ __( 'Add New Plugin', 'wp-plugin-info-card' ) }
						</Button>
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<CloudDownload />
							{ __( 'Import Plugin', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Import a plugin from a REST API endpoint.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="secondary"
							href="#"
							onClick={ ( e ) => {
								e.preventDefault();
								// todo: import modal.
							} }
							iconPosition="left"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <Download /> }
						>
							{ __( 'Import Plugin', 'wp-plugin-info-card' ) }
						</Button>
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<BookText />
							{ __( 'Documentation', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Find out how to display your custom plugins with WP Plugin Info Card.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="secondary"
							href="https://wppic.dlxplugins.com/"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <ExternalLink /> }
							iconPosition="left"
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

export default Plugin;
