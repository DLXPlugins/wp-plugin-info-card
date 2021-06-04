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

	if ( cardLoading ) {
		return (
			<Fragment>
				<div className="wppic-loading-placeholder">
					<div className="wppic-loading">
						<Logo size="45" />
						<br />
						<div className="wppic-spinner">
							<Spinner />
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
	return (
		<Fragment>
			{ loading && (
				<div className="wppic-query-block wppic-query-block-panel">
					<div className="wppic-block-svg">
						<Logo size="75" />
					</div>
					<div className="wp-pic-tab-panel">
						<TabPanel
							activeClass="active-tab"
							initialTabName="slug"
							tabs={ [
								{
									title: __( 'Type', 'wp-plugin-info-card' ),
									name: 'slug',
									className: 'wppic-tab-slug',
								},
								{
									title: __(
										'Appearance',
										'wp-plugin-info-card'
									),
									name: 'layout',
									className: 'wppic-tab-layout',
								},
							] }
						>
							{ ( tab ) => {
								let tabContent;
								if ( 'slug' === tab.name ) {
									tabContent = (
										<Fragment>
											<SelectControl
												label={ __(
													'Select a Plugin or Theme',
													'wp-plugin-info-card'
												) }
												options={ assetType }
												value={ type }
												onChange={ ( value ) => {
													setAttributes( {
														type: value,
													} );
													setType( value );
												} }
											/>
											<TextControl
												label={ __(
													'Plugin or Theme Slug',
													'wp-plugin-info-card'
												) }
												value={ slug }
												onChange={ ( value ) => {
													setAttributes( {
														slug: value,
													} );
													setSlug( value );
												} }
												help={ __(
													'Comma separated slugs are supported.',
													'wp-plugin-info-card'
												) }
											/>
										</Fragment>
									);
								} else if ( 'layout' === tab.name ) {
									tabContent = (
										<Fragment>
											<div>
												<SelectControl
													label={ __(
														'Select an initial layout',
														'wp-plugin-info-card'
													) }
													options={ layoutOptions }
													value={ layout }
													onChange={ ( value ) => {
														if ( 'flex' == value ) {
															setAttributes( {
																layout: value,
																align: 'full',
															} );
															setLayout( value );
															setAlign( 'full' );
														} else {
															setAttributes( {
																layout: value,
																align: 'center',
															} );
															setLayout( value );
															setAlign(
																'center'
															);
														}
													} }
												/>

												<SelectControl
													label={ __(
														'Scheme',
														'wp-plugin-info-card'
													) }
													options={ schemeOptions }
													value={ scheme }
													onChange={ ( value ) => {
														setAttributes( {
															scheme: value,
														} );
														setScheme( value );
													} }
												/>
											</div>
										</Fragment>
									);
								} else {
									tabContent = (
										<Fragment>no data found</Fragment>
									);
								}
								return <div>{ tabContent }</div>;
							} }
						</TabPanel>
					</div>
					<div className="wp-pic-gutenberg-button">
						<Button
							iconSize={ 20 }
							icon={ <Logo size="25" /> }
							isSecondary
							id="wppic-input-submit"
							onClick={ ( event ) => {
								event.preventDefault();
								setAttributes( { loading: false } );
								pluginOnClick( event );
							} }
						>
							{ __(
								'Preview and Configure',
								'wp-plugin-info-card'
							) }
						</Button>
					</div>
				</div>
			) }
			{ cardLoading && (
				<Fragment>
					<div className="wppic-loading-placeholder">
						<div className="wppic-loading">
							<Logo size="45" />
							<br />
							<div className="wppic-spinner">
								<Spinner />
							</div>
						</div>
					</div>
				</Fragment>
			) }
			{ ! loading && ! cardLoading && (
				<Fragment>
					{ inspectorControls }
					<BlockControls>
						<Toolbar controls={ resetSelect } />
					</BlockControls>
					<div
						className={ classnames(
							'is-placeholder',
							layoutClass,
							'wp-block-plugin-info-card',
							`align${ align }`
						) }
					>
						{ outputInfoCards( data ) }
					</div>
				</Fragment>
			) }
		</Fragment>
	);
};

export default PluginInfoCard;
