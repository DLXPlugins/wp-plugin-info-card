import React, { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classnames from 'classnames';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { __ } from '@wordpress/i18n';
import { isURL, cleanForSlug } from '@wordpress/url';
import BeatLoader from 'react-spinners/BeatLoader';
import useMediaUploader from '../../../hooks/useMediaUploader';
import PluginIcon from '../../../components/PluginIcon';
import Notice from '../../../components/Notice';
import SaveCustomPluginButtons from '../../../components/SaveCustomPluginButtons';

import {
	TextControl,
	Button,
	ToggleControl,
	Spinner,
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
			{ isEditing && (
				<>
					{ ' > ' }
					<span className="wppic-admin-panel-breadcrumbs__item-current">{ __( 'Edit', 'wp-plugin-info-card' ) }</span>
				</>
			) }
			{ ! isEditing && (
				<>
					{ ' > ' }
					<span className="wppic-admin-panel-breadcrumbs__item-current">{ __( 'Add New Plugin', 'wp-plugin-info-card' ) }</span>
				</>
			) }
		</div>
	</div>
);

const NewPlugin = ( props ) => {
	const [ pluginData, setPluginData ] = useState( {} );

	const { id, nonce } = useParams( {
		shouldThrow: false,
	} );

	useEffect( () => {
		if ( ! id || ! nonce ) {
			return;
		}

		const fetchPlugin = async () => {
			const response = await SendCommand( 'wppic_get_custom_plugin_data', {
				nonce,
				id,
			} );
			const { success, data } = response.data;
			if ( success ) {
				setPluginData( { ...data.data.content, post_id: id } );
			}
		};
		// Fetch options.
		fetchPlugin();
	}, [ id, nonce ] );

	return (
		<Interface data={ pluginData } editMode={ id > 0 } { ...props } />
	);
};

const Interface = ( props ) => {
	const { data, editMode } = props;
	const navigate = useNavigate();
	const [ isChecking, setIsChecking ] = useState( false );
	const [ isError, setIsError ] = useState( false );
	const [ isWarning, setIsWarning ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ warningMessage, setWarningMessage ] = useState( '' );
	const [ pluginSlugInputRef, setPluginSlugInputRef ] = useState( null );
	const [ isEditing, setIsEditing ] = useState( editMode ? true : false );
	const [ loading, setLoading ] = useState( editMode ? true : false );

	const checkPluginSlug = async ( slug ) => {
		// If data is set, we're editing, so we don't need to check the slug. Will check on save.
		if ( Object.keys( data ).length > 0 ) {
			setIsChecking( false );
			return;
		}

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
			setError( 'slug', { message: responseData.message, type: 'custom' } );
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
			post_id: data.id || 0,
			nonce: wppicAdminCustomPlugin.saveNonce,
			pluginIconId: data.pluginIconId || 0,
			pluginBannerId: data.pluginBannerId || 0,
			pluginIconUrl: data.pluginIconUrl || '',
			pluginBannerUrl: data.pluginBannerUrl || '',
			name: data.name || '',
			slug: data.slug || '',
			shortDescription: data.shortDescription || '',
			url: data.url || '',
			homepage: data.homepage || '',
			downloadLink: data.downloadLink || '',
			version: data.version || '',
			author: data.author || '',
			authorProfile: data.authorProfile || '',
			contributors: data.contributors || '',
			requires: data.requires || '',
			tested: data.tested || '',
			rating: data.rating || '',
			numRatings: data.numRatings || '',
			downloaded: data.downloaded || '',
			activeInstalls: data.activeInstalls || '',
			lastUpdated: data.lastUpdated || '',
			ratings: data.ratings || '',
			added: data.added || '',
			enableRestApi: data.enableRestApi || 'false',
			restApiPasscode: data.restApiPasscode || '',
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	// Media uploader for citation image upload.
	const { openMediaUploader } = useMediaUploader();

	/**
	 * Placeholder for submit event.
	 *
	 * @param {Object} formData contains the form data.
	 */
	const onSubmit = ( formData ) => {
	};

	useEffect( () => {
		if ( Object.keys( data ).length > 0 ) {
			setIsEditing( true );
			reset( data );
			setLoading( false );
		}
	}, [ data, reset ] );

	const formTable = (
		<table className="form-table form-table-row-sections">
			<tbody>
				<tr>
					<th scope="row">
						{ __( 'Plugin Details', 'wp-plugin-info-card' ) }
					</th>
					<td>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="name"
								rules={ { required: true } }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											placeholder={ __( 'Enter Plugin Name', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'name' );
											} }
											className={
												classnames( 'wppic-admin-input is-required',
													{ 'has-error': errors?.name },
												) }
											help={ __( 'Enter the name of the plugin.', 'wp-plugin-info-card' ) }
											label={ __( 'Plugin Name', 'wp-plugin-info-card' ) }
										/>
										{ errors?.name && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
							<Controller
								control={ control }
								name="post_id"
								render={ ( { field } ) => (
									<input type="hidden" { ...field } />
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
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.slug } ) }
											help={ __( 'Enter the slug of the plugin. It must be unique and contain only lowercase letters, dashes, and underscores.', 'wp-plugin-info-card' ) }
											label={ __( 'Plugin Slug', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												clearErrors( 'slug' );
												field.onChange( value );
											} }
											ref={ setPluginSlugInputRef }
											onBlur={ ( value ) => {
												trigger( 'slug' );
												setIsChecking( true );
												setErrorMessage( '' );
												setIsError( false );
												checkPluginSlug( getValues( 'slug' ) );
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
										{ ( errors?.slug && errors?.slug?.type === 'required' ) && (
											<div className="wppic-admin-row">
												<Notice
													message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
													status="error"
													inline={ false }
												/>
											</div>
										) }
										{ ( errors?.slug && errors?.slug?.type === 'custom' ) && (
											<div className="wppic-admin-row">
												<Notice
													message={ errors?.slug?.message }
													status="error"
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
								name="shortDescription"
								rules={ { required: true } }
								render={ ( { field } ) => (
									<>
										<TextareaControl
											{ ...field }
											maxLength={ 150 }
											placeholder={ __( 'Enter a Short Description', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.shortDescription } ) }
											help={ __( 'Enter the a short description of the plugin. Max 150 characters.', 'wp-plugin-info-card' ) }
											label={ __( 'Short Description', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'shortDescription' );
											} }
										/>
										{ errors?.shortDescription?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
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
								help={ __( 'Select an Icon with dimensions 256x256', 'wp-plugin-infocard' ) }
								label={ __( 'Upload a Plugin Icon', 'wp-plugin-info-card' ) }
								className={
									classnames( 'wppic-admin-input is-required',
										{ 'has-error': errors?.pluginIconUrl },
									)
								}
							>
								{ getValues( 'pluginIconUrl' ) && (
									<div className="wppic-admin-image-preview">
										<img
											src={ getValues( 'pluginIconUrl' ) }
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
												setValue( 'pluginIconId', media.id );
												setValue( 'pluginIconUrl', media.url );
											} );
										} }
										help={ __( 'Select an Icon with dimensions 256x256', 'wp-plugin-info-card' ) }
									>
										{ __( 'Upload Icon', 'wp-plugin-info-card' ) }
									</Button>
									{ ( getValues( 'pluginIconId' ) !== 0 ) && (
										<Button
											variant="secondary"
											className="wppic-btn wppic-btn-alt"
											onClick={ () => {
												setValue( 'pluginIconId', 0 );
												setValue( 'pluginIconUrl', '' );
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
								label={ __( 'Upload a Plugin Banner', 'wp-plugin-info-card' ) }
								className={
									classnames( 'wppic-admin-input is-required',
										{ 'has-error': errors?.pluginBannerUrl },
									)
								}
							>
								{ getValues( 'pluginBannerUrl' ) && (
									<div className="wppic-admin-image-preview">
										<img
											src={ getValues( 'pluginBannerUrl' ) }
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
												setValue( 'pluginBannerId', media.id );
												setValue( 'pluginBannerUrl', media.url );
											} );
										} }
										help={ __( 'Select an Icon with dimensions 1544x720', 'wp-plugin-info-card' ) }
									>
										{ __( 'Upload Banner Image', 'wp-plugin-info-card' ) }
									</Button>
									{ ( getValues( 'pluginBannerId' ) !== 0 ) && (
										<Button
											variant="secondary"
											className="wppic-btn wppic-btn-alt"
											onClick={ () => {
												setValue( 'pluginBannerId', 0 );
												setValue( 'pluginBannerUrl', '' );
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
									<>
										<TextControl
											{ ...field }
											placeholder={ __( 'Enter Plugin Version', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.version } ) }
											help={ __( 'Enter the version of the plugin.', 'wp-plugin-info-card' ) }
											label={ __( 'Version', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'version' );
											} }
										/>
										{ errors?.version?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
						</div>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="requires"
								rules={ { required: true } }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											placeholder={ __( 'Enter Required WordPress Version', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.requires } ) }
											help={ __( 'Enter the minimum WordPress version required (e.g., 6.5).', 'wp-plugin-info-card' ) }
											label={ __( 'Required WordPress Version', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'requires' );
											} }
										/>
										{ errors?.requires?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
						</div>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="tested"
								rules={ { required: true } }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											placeholder={ __( 'Enter Tested WordPress Version', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.tested } ) }
											help={ __( 'Enter the WordPress version this plugin has been tested with (e.g., 6.5).', 'wp-plugin-info-card' ) }
											label={ __( 'Tested WordPress Version', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'tested' );
											} }
										/>
										{ errors?.tested?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
						</div>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="requires_php"
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											placeholder={ __( 'Enter Required PHP Version', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input', { 'has-error': errors?.requires_php } ) }
											help={ __( 'Enter the minimum PHP version required (e.g., 8.0).', 'wp-plugin-info-card' ) }
											label={ __( 'Required PHP Version', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'requires' );
											} }
										/>
										{ errors?.requires_php?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
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
								name="url"
								rules={ {
									required: true,
									pattern: /^https?:\/\/.+/,
								} }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											placeholder={ __( 'Enter Plugin URL', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.url } ) }
											help={ __( 'Enter the URL for the plugin.', 'wp-plugin-info-card' ) }
											label={ __( 'Plugin URL', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'homepage' );
											} }
										/>
										{ errors?.url?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
						</div>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="homepage"
								rules={ {
									required: true,
									pattern: /^https?:\/\/.+/,
								} }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											placeholder={ __( 'Enter Plugin Homepage URL', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.homepage } ) }
											help={ __( 'Enter the homepage URL for the plugin.', 'wp-plugin-info-card' ) }
											label={ __( 'Homepage URL', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'homepage' );
											} }
										/>
										{ errors?.homepage?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
						</div>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="downloadLink"
								rules={ {
									required: true,
									pattern: /^https?:\/\/.+/,
								} }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											placeholder={ __( 'Enter Plugin Download URL', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.downloadLink } ) }
											help={ __( 'Enter the download URL for the plugin. This can be the same as the homepage URL.', 'wp-plugin-info-card' ) }
											label={ __( 'Download URL', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'downloadLink' );
											} }
										/>
										{ errors?.downloadLink?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
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
									<>
										<TextControl
											{ ...field }
											placeholder={ __( 'Enter Plugin Author', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.author } ) }
											help={ __( 'Enter the name of the plugin author.', 'wp-plugin-info-card' ) }
											label={ __( 'Author Name', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'author' );
											} }
										/>
										{ errors?.author?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
						</div>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="authorProfile"
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
								rules={ { required: true } }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											type="number"
											min="0"
											max="100"
											placeholder={ __( 'Enter Plugin Rating', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.rating } ) }
											help={ __( 'Enter the plugin rating percentage (0-100%).', 'wp-plugin-info-card' ) }
											label={ __( 'Rating', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'rating' );
											} }
										/>
										{ errors?.rating?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
												inline={ false }
											/>
										) }
									</>
								) }
							/>
						</div>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="numRatings"
								rules={ { required: true } }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											type="number"
											min="0"
											placeholder={ __( 'Enter Number of Ratings', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.numRatings } ) }
											help={ __( 'Enter the total number of ratings.', 'wp-plugin-info-card' ) }
											label={ __( 'Number of Ratings', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'numRatings' );
											} }
										/>
										{ errors?.numRatings?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
												inline={ false }
											/>
										) }
									</>
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
								name="activeInstalls"
								rules={ { required: true } }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											type="number"
											min="0"
											placeholder={ __( 'Enter Active Installs', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input is-required', { 'has-error': errors?.activeInstalls } ) }
											help={ __( 'Enter the number of active installations.', 'wp-plugin-info-card' ) }
											label={ __( 'Active Installs', 'wp-plugin-info-card' ) }
											onChange={ ( value ) => {
												field.onChange( value );
												clearErrors( 'activeInstalls' );
											} }
										/>
										{ errors?.activeInstalls?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
												inline={ false }
											/>
										) }
									</>
								) }
							/>
						</div>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="lastUpdated"
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
				<tr>
					<th scope="row">
						{ __( 'REST API', 'wp-plugin-info-card' ) }
					</th>
					<td>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="enableRestApi"
								render={ ( { field } ) => (
									<ToggleControl
										{ ...field }
										onChange={ ( value ) => {
											field.onChange( value ? 'true' : 'false' );
										} }
										checked={ field.value === 'true' ? true : false }
										label={ __( 'Enable REST API', 'wp-plugin-info-card' ) }
										help={ __( 'Enable the REST API for the plugin. This will allow others to fetch your plugin via an endpoint.', 'wp-plugin-info-card' ) }
									/>
								) }
							/>
						</div>
						<div className="wppic-admin-row">
							<Controller
								control={ control }
								name="restApiPasscode"
								rules={ {
									required: true,
								} }
								render={ ( { field } ) => (
									<>
										<TextControl
											{ ...field }
											type="text"
											placeholder={ __( 'Enter REST API Passcode', 'wp-plugin-info-card' ) }
											className={ classnames( 'wppic-admin-input', { 'has-error': errors?.restApiPasscode } ) }
											help={ __( '(Optional) Enter the passcode for the REST API if you want to add a passcode to the REST URL for validation. This can help prevent unauthorized access to your plugin data.', 'wp-plugin-info-card' ) }
											label={ __( 'REST API Passcode', 'wp-plugin-info-card' ) }
										/>
										{ errors?.restApiPasscode?.type === 'required' && (
											<Notice
												message={ __( 'This field is required.', 'wp-plugin-info-card' ) }
												status="error"
												politeness="assertive"
											/>
										) }
									</>
								) }
							/>
						</div>
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
							{ loading ? (
								<div className="wppic-admin-panel-area__section-loading">
									<Spinner />
								</div>
							) : (
								formTable
							) }
							<SaveCustomPluginButtons
								formValues={ formValues }
								setError={ setError }
								reset={ reset }
								errors={ errors }
								isDirty={ isDirty }
								dirtyFields={ dirtyFields }
								trigger={ trigger }
								onSave={ ( values ) => {
									setTimeout( () => {
										navigate( { to: '/' } );
									}, 1200 );
								} }
								isEditing={ isEditing }
								onCancel={ () => {
									navigate( { to: '/' } );
								} }
							/>
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

export default NewPlugin;
