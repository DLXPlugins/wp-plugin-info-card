/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/**
 * External dependencies
 */
import axios from 'axios';
import classnames from 'classnames';
import PluginFlex from '../templates/PluginFlex';
import PluginCard from '../templates/PluginCard';
import PluginLarge from '../templates/PluginLarge';
import PluginWordPress from '../templates/PluginWordPress';
import ThemeFlex from '../templates/ThemeFlex';
import ThemeWordPress from '../templates/ThemeWordPress';
import ThemeLarge from '../templates/ThemeLarge';
import ThemeCard from '../templates/ThemeCard';
import Logo from '../Logo';
import NumbersComponent from '../components/Numbers';
import { isURL } from '@wordpress/url';
const { Fragment, useEffect, useState } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	SelectControl,
	Spinner,
	TextControl,
	ToolbarGroup,
	ToolbarButton,
	ToolbarItem,
	DropdownMenu,
	TabPanel,
	Button,
	MenuItemsChoice,
	BaseControl,
	ButtonGroup,
	Notice,
} = wp.components;

const {
	InspectorControls,
	BlockAlignmentToolbar,
	MediaUpload,
	BlockControls,
	useBlockProps,
} = wp.blockEditor;

const { useInstanceId } = wp.compose;

const WPPluginInfoCard = ( props ) => {
	const { attributes, setAttributes } = props;

	const { cols, colGap, rowGap } = attributes;

	const generatedUniqueId = useInstanceId( WPPluginInfoCard, 'wp-plugin-info-card-id' );

	const [ type, setType ] = useState( attributes.type );
	const [ slug, setSlug ] = useState( attributes.slug );
	const [ loading, setLoading ] = useState( false );
	const [ cardLoading, setCardLoading ] = useState( attributes.loading );
	const [ image, setImage ] = useState( attributes.image );
	const [ containerid, setContainerid ] = useState( attributes.containerid );
	const [ scheme, setScheme ] = useState( attributes.scheme );
	const [ layout, setLayout ] = useState( attributes.layout );
	const [ multi, setMulti ] = useState( true );
	const [ hasMultipleAssets, setHasMultipleAssets ] = useState( false );
	const [ preview, setPreview ] = useState( attributes.preview );
	const [ data, setData ] = useState( attributes.assetData );
	const [ align, setAlign ] = useState( attributes.align );
	const [ noData, setNoData ] = useState( false );

	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	useEffect( () => {
		if ( Object.values( attributes.assetData ).length > 1 ) {
			setHasMultipleAssets( true );
		} else {
			setHasMultipleAssets( false );
		}
	}, [ attributes.assetData ] );

	const loadData = () => {
		setLoading( false );
		setCardLoading( true );
		setNoData( false );
		const restUrl = wppic.rest_url + 'wppic/v2/get_data';
		axios
			.get(
				restUrl + `?type=${ type }&slug=${ encodeURIComponent( slug ) }`
			)
			.then( ( response ) => {
				if ( response.data.success ) {
					// Now Set State
					setData( response.data.data );
					setAttributes( { assetData: response.data.data } );
					setCardLoading( false );
				} else {
					setNoData( true );
					setCardLoading( false );
					setLoading( true );
				}
			} );
	};
	const pluginOnClick = ( assetSlug, assetType ) => {
		loadData();
	};
	useEffect( () => {
		if ( ! data || 0 === data.length ) {
			loadData();
		}
		setImage( attributes.image );
		setLayout( attributes.layout );
		setLoading( attributes.loading );
		setType( attributes.type );
		setSlug( attributes.slug );

		if ( ! attributes.defaultsApplied && 'default' === attributes.scheme ) {
			setAttributes( {
				defaultsApplied: true,
				scheme: wppic.default_scheme,
				layout: wppic.default_layout,
			} );
			setScheme( wppic.default_scheme );
			setLayout( wppic.default_layout );
		}
	}, [] );

	const outputInfoCards = ( cardDataArray ) => {
		return cardDataArray.map( ( cardData, key ) => {
			return (
				<Fragment key={ key }>
					{ 'flex' === layout && 'plugin' === type && (
						<PluginFlex
							scheme={ scheme }
							image={ image }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'card' === layout && 'plugin' === type && (
						<PluginCard
							scheme={ scheme }
							image={ image }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'large' === layout && 'plugin' === type && (
						<PluginLarge
							scheme={ scheme }
							image={ image }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'wordpress' === layout && 'plugin' === type && (
						<PluginWordPress
							scheme={ scheme }
							image={ image }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'flex' === layout && 'theme' === type && (
						<ThemeFlex
							scheme={ scheme }
							image={ image }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'wordpress' === layout && 'theme' === type && (
						<ThemeWordPress
							scheme={ scheme }
							image={ image }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'large' === layout && 'theme' === type && (
						<ThemeLarge
							scheme={ scheme }
							image={ image }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'card' === layout && 'theme' === type && (
						<ThemeCard
							scheme={ scheme }
							image={ image }
							data={ cardData }
							align={ align }
						/>
					) }
				</Fragment>
			);
		} );
	};

	/**
	 * Retrieve colums interface for sidebar options.
	 *
	 * @return {Element} The columns interface.
	 */
	const getCols = () => {
		return (
			<BaseControl id="col-count" label={ __( 'Select How Many Columns', 'wp-plugin-info-card' ) }>
				<ButtonGroup>
					<Button
						isPrimary={ cols === 1 }
						isSecondary={ cols !== 1 }
						onClick={ () => {
							setAttributes( {
								cols: 1,
							} );
						} }
					>
						{ __( 'One', 'wp-plugin-info-card' ) }
					</Button>
					<Button
						isPrimary={ cols === 2 }
						isSecondary={ cols !== 2 }
						onClick={ () => {
							setAttributes( {
								cols: 2,
							} );
						} }
					>
						{ __( 'Two', 'wp-plugin-info-card' ) }
					</Button>
					<Button
						isPrimary={ cols === 3 }
						isSecondary={ cols !== 3 }
						onClick={ () => {
							setAttributes( {
								cols: 3,
							} );
						} }
					>
						{ __( 'Three', 'wp-plugin-info-card' ) }
					</Button>
				</ButtonGroup>
			</BaseControl>
		);
	};

	const resetSelect = [
		{
			icon: 'edit',
			title: __( 'Edit and Configure', 'wp-plugin-info-card' ),
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

	const layoutClass = 'card' === layout ? 'wp-pic-card' : layout;
	const previewLoadingClass = cardLoading ? 'wp-pic-spin' : '';

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
				</PanelRow>
				{ hasMultipleAssets && (
					<>
						<PanelRow className="wppic-panel-rows-cols">
							{ getCols() }
						</PanelRow>
						<PanelRow className="wppic-panel-rows-numbers">
							<NumbersComponent
								value={ colGap }
								label={ __( 'Column Gap (in px)', 'wp-plugin-info-card' ) }
								numbers={ [ 20, 40, 60, 80 ] }
								onClick={ ( value ) => {
									setAttributes( { colGap: parseInt( value ) } );
								} }
								id="wppic-col-gap"
							/>
						</PanelRow>
						<PanelRow className="wppic-panel-rows-numbers">
							<NumbersComponent
								value={ rowGap }
								label={ __( 'Row Gap (in px)', 'wp-plugin-info-card' ) }
								numbers={ [ 20, 40, 60, 80 ] }
								onClick={ ( value ) => {
									setAttributes( { rowGap: parseInt( value ) } );
								} }
								id="wppic-row-gap"
							/>
						</PanelRow>
					</>
				) }
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
						} }
						type="image"
						value={ image }
						render={ ( { open } ) => (
							<Fragment>
								<button
									className="components-button is-button"
									onClick={ open }
								>
									{ __(
										'Upload Image!',
										'wp-plugin-info-card'
									) }
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
													setAttributes( {
														image: '',
													} );
													setImage( '' );
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

	const styles = `
		#${ attributes.uniqueId } {
			display: grid;
			column-gap: ${ colGap }px;
			row-gap: ${ rowGap }px;
		}
	`;

	const blockProps = useBlockProps( {
		className: classnames( `wp-plugin-info-card align${ align }` ),
	} );

	if ( preview ) {
		return (
			<div style={ { textAlign: 'center' } }>
				<img
					src={ wppic.wppic_preview }
					alt=""
					style={ { width: '100%', height: 'auto' } }
				/>
			</div>
		);
	}
	if ( cardLoading ) {
		return (
			<div { ...blockProps }>
				<div className="wppic-loading-placeholder">
					<div className="wppic-loading">
						<Logo size="45" />
						<br />
						<div className="wppic-spinner">
							<Spinner />
						</div>
					</div>
				</div>
			</div>
		);
	}

	const block = (
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
										<>
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
													// Check for URL so we don't paste in the slug AND url.
													if ( isURL( value ) ) {
														return;
													}
													setAttributes( {
														slug: value,
													} );
													setSlug( value );
												} }
												help={ __(
													'Comma separated slugs are supported.',
													'wp-plugin-info-card'
												) }
												onPaste={ ( event ) => {
													// Get contents from clipboard.
													const clipboardData = event.clipboardData
														.getData( 'text/plain' )
														.trim();

													if ( isURL( clipboardData ) ) {
														// Extract out the slug from the URL.
														const urlRegex = /([^\/]*)\/$/;
														const newSlug = urlRegex.exec(
															clipboardData,
														)[ 1 ];
														setAttributes( {
															slug: newSlug,
														} );
														setSlug( newSlug );
													}
												} }
												onBlur={ () => {
													// If the slug is a URL, extract out the slug.
													if ( isURL( slug ) ) {
														// Extract out the slug from the URL.
														const urlRegex = /([^\/]*)\/$/;
														const newSlug = urlRegex.exec(
															slug,
														)[ 1 ];
														setAttributes( {
															slug: newSlug,
														} );
														setSlug( newSlug );
														return;
													}
													const slugSlashesRemoved = slug.replace( /\//g, '' );
													if ( slugSlashesRemoved !== slug ) {
														setAttributes( {
															slug: slugSlashesRemoved,
														} );
														setSlug( slugSlashesRemoved );
													}
												} }
											/>
											{ noData && (
												<Notice
													status="error"
													isDismissible={ false }
												>
													{ __(
														'No data found for the given slug.',
														'wp-plugin-info-card'
													) }
												</Notice>
											) }
										</>
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
														if (
															'flex' === value
														) {
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
						<ToolbarGroup>
							<ToolbarButton
								icon="edit"
								title={ __(
									'Edit and Configure',
									'wp-plugin-info-card'
								) }
								onClick={ () => setLoading( true ) }
							/>
						</ToolbarGroup>
						<ToolbarGroup>
							<ToolbarItem as="button">
								{ ( toolbarItemHTMLProps ) => (
									<DropdownMenu
										toggleProps={ toolbarItemHTMLProps }
										label={ __(
											'Select Color Scheme',
											'wp-plugin-info-card'
										) }
										icon="admin-customizer"
									>
										{ ( { onClose } ) => (
											<Fragment>
												<MenuItemsChoice
													choices={ schemeOptions }
													onSelect={ ( value ) => {
														setAttributes( {
															scheme: value,
														} );
														setScheme( value );
														onClose();
													} }
													value={ scheme }
												/>
											</Fragment>
										) }
									</DropdownMenu>
								) }
							</ToolbarItem>
						</ToolbarGroup>
						<ToolbarGroup>
							<ToolbarItem as="button">
								{ ( toolbarItemHTMLProps ) => (
									<DropdownMenu
										toggleProps={ toolbarItemHTMLProps }
										label={ __(
											'Select a Layout',
											'wp-plugin-info-card'
										) }
										icon="layout"
									>
										{ ( { onClose } ) => (
											<Fragment>
												<MenuItemsChoice
													choices={ layoutOptions }
													onSelect={ ( value ) => {
														setAttributes( {
															layout: value,
														} );
														setLayout( value );
														onClose();
													} }
													value={ layout }
												/>
											</Fragment>
										) }
									</DropdownMenu>
								) }
							</ToolbarItem>
						</ToolbarGroup>
					</BlockControls>
					{ hasMultipleAssets && (
						<style>
							{ styles }
						</style>
					) }
					<div
						id={ attributes.uniqueId }
						className={ classnames(
							'is-placeholder',
							layoutClass,
							'wp-block-plugin-info-card',
							`align${ align }`,
							`cols-${ cols }`,
							{
								'has-grid': hasMultipleAssets,
							}
						) }
					>
						{ outputInfoCards( data ) }
					</div>
				</Fragment>
			) }
		</Fragment>
	);

	return <div { ...blockProps }>{ block }</div>;
};

export default WPPluginInfoCard;
