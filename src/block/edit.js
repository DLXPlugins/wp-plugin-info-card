/**
 * External dependencies
 */
import axios from 'axios';
const HtmlToReactParser = require( 'html-to-react' ).Parser;
const { Component, Fragment, useState, useEffect } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	Placeholder,
	SelectControl,
	Spinner,
	Toolbar,
	CheckboxControl,
	TextControl,
} = wp.components;

const {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	AlignmentToolbar,
} = wp.blockEditor;

const PluginInfoCard = ( props ) => {
	const { attributes, setAttributes } = props;

	// State.
	const [ loading, setLoading ] = useState( true );
	const [ cardLoading, setCardLoading ] = useState( false );

	const {
		type,
		slug,
		html,
		image,
		containerid,
		margin,
		clear,
		expiration,
		ajax,
		scheme,
		layout,
		width,
		multi,
	} = attributes;

	const pluginOnClick = ( event ) => {
		if ( '' !== type && '' !== slug ) {
			setLoading( false );
			setCardLoading( true );

			// eslint-disable-next-line no-undef
			const restUrl = wppic.rest_url + 'wppic/v1/get_html/';
			axios
				.get(
					restUrl +
						`?type=${ attributes.type }&slug=${ attributes.slug }&align=${ attributes.align }&image=${ attributes.image }&containerid=${ attributes.containerid }&margin=${ attributes.margin }&clear=${ attributes.clear }&expiration=${ attributes.expiration }&ajax=${ attributes.ajax }&scheme=${ attributes.scheme }&layout=${ attributes.layout }&multi=${ attributes.multi }`
				)
				.then( ( response ) => {
					// Now Set State
					setCardLoading( false );
					setAttributes( { html: response.data } );
				} );
		}
	};

	const htmlToReactParser = new HtmlToReactParser();

	const resetSelect = [
		{
			icon: 'edit',
			title: __( 'Reset', 'wp-plugin-info-card' ),
			onClick: () => setLoading( true ),
		},
	];
	const assetType = [
		{ value: 'plugin', label: __( 'Plugin', 'wp-plugin-info-card' ) },
		{ value: 'theme', label: __( 'Theme', 'wp-plugin-info-card' ) },
	];
	const clearOptions = [
		{ value: 'none', label: __( 'None', 'wp-plugin-info-card' ) },
		{ value: 'before', label: __( 'Before', 'wp-plugin-info-card' ) },
		{ value: 'after', label: __( 'After', 'wp-plugin-info-card' ) },
	];
	const ajaxOptions = [
		{ value: 'false', label: __( 'No', 'wp-plugin-info-card' ) },
		{ value: 'true', label: __( 'Yes', 'wp-plugin-info-card' ) },
	];
	const schemeOptions = [
		{ value: 'default', label: __( 'Default', 'wp-plugin-info-card' ) },
		{ value: 'scheme1', label: __( 'Scheme 1', 'wp-plugin-info-card' ) },
		{ value: 'scheme2', label: __( 'Scheme 2', 'wp-plugin-info-card' ) },
		{ value: 'scheme3', label: __( 'Scheme 3', 'wp-plugin-info-card' ) },
		{ value: 'scheme4', label: __( 'Scheme 4', 'wp-plugin-info-card' ) },
		{ value: 'scheme5', label: __( 'Scheme 5', 'wp-plugin-info-card' ) },
		{ value: 'scheme6', label: __( 'Scheme 6', 'wp-plugin-info-card' ) },
		{ value: 'scheme7', label: __( 'Scheme 7', 'wp-plugin-info-card' ) },
		{ value: 'scheme8', label: __( 'Scheme 8', 'wp-plugin-info-card' ) },
		{ value: 'scheme9', label: __( 'Scheme 9', 'wp-plugin-info-card' ) },
		{ value: 'scheme10', label: __( 'Scheme 10', 'wp-plugin-info-card' ) },
		{ value: 'scheme11', label: __( 'Scheme 11', 'wp-plugin-info-card' ) },
		{ value: 'scheme12', label: __( 'Scheme 12', 'wp-plugin-info-card' ) },
		{ value: 'scheme13', label: __( 'Scheme 13', 'wp-plugin-info-card' ) },
		{ value: 'scheme14', label: __( 'Scheme 14', 'wp-plugin-info-card' ) },
	];
	const layoutOptions = [
		{ value: 'card', label: __( 'Card', 'wp-plugin-info-card' ) },
		{ value: 'large', label: __( 'Large', 'wp-plugin-info-card' ) },
		{ value: 'wordpress', label: __( 'WordPress', 'wp-plugin-info-card' ) },
		{ value: 'flex', label: __( 'Flex', 'wp-plugin-info-card' ) },
	];
	const widthOptions = [
		{ value: 'none', label: __( 'Default', 'wp-plugin-info-card' ) },
		{ value: 'full', label: __( 'Full Width', 'wp-plugin-info-card' ) },
	];
	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'WP Plugin Info Card', 'wp-plugin-info-card' ) }
			>
				<SelectControl
					label={ __( 'Scheme', 'wp-plugin-info-card' ) }
					options={ schemeOptions }
					value={ scheme }
					onChange={ ( value ) => {
						setAttributes( { scheme: value } );
						attributes.scheme = value;
						this.setState( { scheme: value } );
						this.pluginOnClick( value );
					} }
				/>
				<SelectControl
					label={ __( 'Layout', 'wp-plugin-info-card' ) }
					options={ layoutOptions }
					value={ layout }
					onChange={ ( value ) => {
						if ( 'flex' === value ) {
							setAttributes( { layout: value, align: 'full' } );
							attributes.layout = value;
							attributes.align = 'full';
							pluginOnClick( value );
						} else {
							setAttributes( { layout: value, align: 'center' } );
							attributes.layout = value;
							attributes.align = 'center';
							pluginOnClick( value );
						}
					} }
				/>
				<SelectControl
					label={ __( 'Width', 'wp-plugin-info-card' ) }
					options={ widthOptions }
					value={ width }
					onChange={ ( value ) => {
						setAttributes( { width: value } );
						attributes.width = value;
					} }
				/>
				<MediaUpload
					onSelect={ ( imageObject ) => {
						setAttributes( { image: imageObject.url } );
						attributes.image = imageObject.url;
						pluginOnClick( imageObject );
					} }
					type="image"
					value={ image }
					render={ ( { open } ) => (
						<Fragment>
							<button
								className="components-button is-button"
								onClick={ open }
							>
								{ __( 'Upload Image!', 'wp-plugin-info-card' ) }
							</button>
							{ image && (
								<Fragment>
									<div>
										<img
											src={ image }
											alt={ __(
												'Plugin Card Image',
												'wp-plugin-info-card'
											) }
											width="250"
											height="250"
										/>
									</div>
									<div>
										<button
											className="components-button is-button"
											onClick={ ( event ) => {
												setAttributes( { image: '' } );
												attributes.image = '';
												pluginOnClick( event );
											} }
										>
											{ __(
												'Reset Image',
												'wp-plugin-info-card'
											) }
										</button>
									</div>
								</Fragment>
							) }
						</Fragment>
					) }
				/>
				<TextControl
					label={ __( 'Container ID', 'wp-plugin-info-card' ) }
					type="text"
					value={ containerid }
					onChange={ ( value ) => {
						setAttributes( { containerid: value } );
						attributes.containerid = value;
						setTimeout( () => {
							pluginOnClick( value );
						}, 5000 );
					} }
				/>
				<TextControl
					label={ __( 'Margin', 'wp-plugin-info-card' ) }
					type="text"
					value={ margin }
					onChange={ ( value ) => {
						setAttributes( { margin: value } );
						attributes.margin = value;
						setTimeout( () => {
							pluginOnClick( value );
						}, 5000 );
					} }
				/>
				<SelectControl
					label={ __( 'Clear', 'wp-plugin-info-card' ) }
					options={ clearOptions }
					value={ clear }
					onChange={ ( value ) => {
						setAttributes( { clear: value } );
						attributes.clear = value;
						pluginOnClick( value );
					} }
				/>
				<TextControl
					label={ __(
						'Expiration in minutes',
						'wp-plugin-info-card'
					) }
					type="number"
					value={ expiration }
					onChange={ ( value ) => {
						setAttributes( { expiration: value } );
						attributes.expiration = value;
						setTimeout( () => {
							pluginOnClick( value );
						}, 5000 );
					} }
				/>
				<SelectControl
					label={ __( 'Load card via Ajax?', 'wp-plugin-info-card' ) }
					options={ ajaxOptions }
					value={ ajax }
					onChange={ ( value ) => {
						setAttributes( { ajax: value } );
						attributes.ajax = value;
						pluginOnClick( value );
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);
	if ( props.attributes.preview ) {
		return (
			<Fragment>
				<img src={ wppic.wppic_preview } alt="WPPIC Preview" />
			</Fragment>
		);
	}
	return (
		<Fragment>
			<Fragment>
				{ loading && (
					<Placeholder>
						<div className="wppic-query-block">
							<div>
								<svg
									version="1.1"
									id="Calque_1"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="150px"
									height="150px"
									viewBox="0 0 850.39 850.39"
									enableBackground="new 0 0 850.39 850.39"
								>
									<path
										fill="#DB3939"
										d="M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39
								c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451
								l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07
								h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887
								l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"
									/>
								</svg>
							</div>
							<div>
								<h3>
									<label htmlFor="wppic-type-select">
										{ __(
											'Select a Type',
											'wp-plugin-info-card'
										) }
									</label>
								</h3>
								<SelectControl
									options={ assetType }
									value={ type }
									onChange={ ( value ) => {
										setAttributes( {
											type: value,
										} );
									} }
									label={ __( 'Select a Type', 'wp-plugin-info-card' ) }
								/>
							</div>
							<div>
								<TextControl
									id="wppic-input-slug"
									value={ slug }
									onChange={ ( event ) => {
										setAttributes( {
											slug: event.target.value,
										} );
									} }
									label={ __( 'Enter a slug', 'wp-plugin-info-card' ) }
								/>
							</div>
							<div>
								<SelectControl
									options={ layoutOptions }
									value={ layout }
									onChange={ ( value ) => {
										if ( 'flex' === value ) {
											setAttributes( {
												layout: value,
												align: 'full',
											} );
											attributes.layout = value;
											attributes.align = 'full';
										} else {
											setAttributes( {
												layout: value,
												align: 'center',
											} );
											attributes.layout = value;
											attributes.align = 'center';
										}
									} }
									label={ __( 'Select a Layout', 'wp-plugin-info-card' ) }
								/>
							</div>
							<div>
								<CheckboxControl
									checked={ multi }
									onChange={ ( value ) => {
										attributes.multi = value;
									} }
									label={ __(
										'Enable multiple output?',
										'wp-plugin-info-card'
									) }
									help={ __(
										'Separate slugs by commas to show multiple items',
										'wp-plugin-info-card'
									) }
								/>
								<p className="description">
									{ __(
										'Comma-separated slugs are outputted using multiple cards instead of shuffling by default.'
									) }
								</p>
							</div>
							<div>
								<input
									className="button button-primary"
									type="submit"
									id="wppic-input-submit"
									value={ __( 'Go', 'wp-plugin-info-card' ) }
									onClick={ ( event ) => {
										setAttributes( { loading: false } );
										pluginOnClick( event );
									} }
								/>
							</div>
						</div>
					</Placeholder>
				) }
				{ cardLoading && (
					<Fragment>
						<Placeholder className="wppic-loading-placeholder">
							<div className="wppic-loading">
								<svg
									version="1.1"
									id="Calque_1"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="40px"
									height="40px"
									viewBox="0 0 850.39 850.39"
									enableBackground="new 0 0 850.39 850.39"
								>
									<path
										fill="#DB3939"
										d="M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39
							c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451
							l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07
							h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887
							l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"
									/>
								</svg>
								<br />
								<div className="wppic-spinner">
									<Spinner />
								</div>
							</div>
						</Placeholder>
					</Fragment>
				) }
				{ ! loading && ! cardLoading && (
					<Fragment>
						{ inspectorControls }
						<BlockControls>
							<Toolbar controls={ resetSelect } />
							{ 'flex' == layout && (
								<BlockAlignmentToolbar
									value={ attributes.align }
									onChange={ ( value ) => {
										setAttributes( { align: value } );
										attributes.align = value;
										pluginOnClick( value );
									} }
								></BlockAlignmentToolbar>
							) }
							{ 'card' == layout && (
								<AlignmentToolbar
									value={ attributes.align }
									onChange={ ( value ) => {
										setAttributes( { align: value } );
										attributes.align = value;
										pluginOnClick( value );
									} }
								></AlignmentToolbar>
							) }
						</BlockControls>
						<div
							className={ '' != width ? 'wp-pic-full-width' : '' }
						>
							{ htmlToReactParser.parse( html ) }
						</div>
					</Fragment>
				) }
			</Fragment>
		</Fragment>
	);
};

export default PluginInfoCard;
