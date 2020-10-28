/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/**
 * External dependencies
 */
import axios from 'axios';
import classnames from 'classnames';
import Logo from './Logo';
const HtmlToReactParser = require( 'html-to-react' ).Parser;
const { Component, Fragment, useEffect, useState } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	SelectControl,
	Spinner,
	TextControl,
	Toolbar,
	CheckboxControl,
	TabPanel,
	Button,
} = wp.components;

const {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	AlignmentToolbar,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalUseInnerBlocksProps,
} = wp.blockEditor;






const WPPluginInfoCard = ( props ) => {

	const htmlToReactParser = new HtmlToReactParser();
	const [ type, setType ] = useState(false);
	const [ slug, setSlug ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ cardLoading, setCardLoading ] = useState(false);
	const [ html, setHtml ] = useState(false);
	const [ image, setImage ] = useState(false);
	const [ containerid, setContainerid ] = useState(false);
	const [ margin, setMargin ] = useState(false );
	const [ clear, setClear ] = useState( false );
	const [ expiration, setExpiration ] = useState(false);
	const [ ajax, setAjax ] = useState( false);
	const [ scheme, setScheme ] = useState( false );
	const [ layout, setLayout ] = useState( false );
	const [ width, setWidth ] = useState( false );
	const [ multi, setMulti ] = useState( false );
	const [ align, setAlign ] = useState( false );
	const [ preview, setPreview ] = useState( false );

	const { attributes, setAttributes } = props;

	const blockProps = useBlockProps();

	useEffect( () => {
		setAlign( attributes.align );
		setAjax( attributes.ajax );
		setCardLoading( attributes.cardLoading );
		setClear( attributes.clear );
		setContainerid( attributes.containerid );
		setHtml( attributes.html );
		setImage( attributes.image );
		setLayout( attributes.layout );
		setExpiration( attributes.expiration );
		setLoading( attributes.loading );
		setType( attributes.type );
		setSlug( attributes.slug );
	}, [] );

	const pluginOnClick = (event) => {
		if ( '' !== type && '' !== slug ) {
			setLoading( false );
			setCardLoading( true );
			const restUrl = wppic.rest_url + 'wppic/v1/get_html/';
			axios
				.get(
					restUrl +
						`?type=${ type }&slug=${ slug }&align=full&image=${ image }&containerid=${ containerid }&margin=${ margin }&clear=${ clear }&expiration=${ expiration }&ajax=${ ajax }&scheme=${ scheme }&layout=${ layout }&multi=${ multi }`
				)
				.then( ( response ) => {
					// Now Set State
					setCardLoading( false );
					setHtml( response.data );
					setAttributes( { html: response.data } );
				} );
		}
	};


	const resetSelect = [
		{
			icon: 'edit',
			title: __( 'Edit', 'wp-plugin-info-card' ),
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

	const inspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Layout', 'wp-plugin-info-card' ) }>
				<PanelRow>
					<SelectControl
						label={ __( 'Scheme', 'wp-plugin-info-card' ) }
						options={ schemeOptions }
						value={ scheme }
						onChange={ ( value ) => {
							setAttributes( { scheme: value } );
							setScheme( value );
						} }
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label={ __( 'Layout', 'wp-plugin-info-card' ) }
						options={ layoutOptions }
						value={ layout }
						onChange={ ( value ) => {
							if ( 'flex' === value ) {
								setAttributes( { layout: value, align: 'full' } );
								setLayout( value );
								setAlign( 'full' );
							} else {
								setAttributes( { layout: value, align: 'center' } );
								setLayout( value );
								setAlign( 'center' );
								pluginOnClick( value );
							}
						} }
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody
				title={ __( 'Options', 'wp-plugin-info-card' ) }
				initialOpen={ false }
			>
				<PanelRow>
					<MediaUpload
						onSelect={ ( imageObject ) => {
							setAttributes( { image: imageObject.url } );
							setImage( imageObject.url );
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
												alt={ __( 'Plugin Card Image', 'wp-plugin-info-card' ) }
												width="250"
												height="250"
											/>
										</div>
										<div>
											<button
												className="components-button is-button"
												onClick={ ( event ) => {
													setAttributes( { image: '' } );
													setImage( '' );
													pluginOnClick( event );
												} }
											>
												{ __( 'Reset Image', 'wp-plugin-info-card' ) }
											</button>
										</div>
									</Fragment>
								) }
							</Fragment>
						) }
					/>
				</PanelRow>
				<PanelRow>
					<TextControl
						label={ __( 'Container ID', 'wp-plugin-info-card' ) }
						type="text"
						value={ containerid }
						onChange={ ( value ) => {
							setAttributes( { containerid: value } );
							setContainerid( value );
						} }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);

	if ( preview ) {
		return (
			<Fragment>
				<img src={ wppic.wppic_preview } />
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
									title: __( 'Appearance', 'wp-plugin-info-card' ),
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
											<CheckboxControl
												label={ __(
													'Enable Multi Output',
													'wp-plugin-info-card'
												) }
												help="Comma-separated slugs are outputted into multiple cards instead of shuffling between cards."
												checked={ multi }
												onChange={ ( value ) => {
													attributes.multi = value;
													setMulti( value );
												} }
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
															setAlign( 'center' );
														}
													} }
												/>

												<SelectControl
													label={ __( 'Scheme', 'wp-plugin-info-card' ) }
													options={ schemeOptions }
													value={ scheme }
													onChange={ ( value ) => {
														setAttributes( { scheme: value } );
														setScheme( value );
													} }
												/>
											</div>
										</Fragment>
									);
								} else {
									tabContent = <Fragment>no data found</Fragment>;
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
							{ __( 'Preview and Configure', 'wp-plugin-info-card' ) }
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
						<BlockAlignmentToolbar
							value={ align }
							onChange={ ( value ) => {
								setAttributes( { align: value } );
								setAlign( value );
							} }
						></BlockAlignmentToolbar>
					</BlockControls>
					<div
						{ ...blockProps }
						className={ classnames(
							'is-placeholder',
							blockProps.className
						) }
					>
						{ htmlToReactParser.parse( html ) }
					</div>
				</Fragment>
			) }
		</Fragment>
	);
};

export default WPPluginInfoCard;
