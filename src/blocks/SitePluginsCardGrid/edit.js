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
import ProgressBar from '../components/ProgressBar';
import { forEach } from 'lodash';
const { Fragment, useEffect, useState } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	SelectControl,
	Spinner,
	TextControl,
	Toolbar,
	ToolbarGroup,
	ToolbarButton,
	ToolbarItem,
	ToolbarDropdownMenu,
	DropdownMenu,
	CheckboxControl,
	TabPanel,
	Button,
	Notice,
	MenuGroup,
	MenuItemsChoice,
	MenuItem,
} = wp.components;

const {
	InspectorControls,
	BlockAlignmentToolbar,
	MediaUpload,
	BlockControls,
	useBlockProps,
} = wp.blockEditor;

const SitePluginsCardGrid = ( props ) => {
	const { attributes, setAttributes } = props;

	const {
		assetData,
		scheme,
		layout,
		preview,
		defaultsApplied,
		sortby,
		sort,
		cols,
		colGap,
		rowGap,
		align,
	} = attributes;

	const [ loading, setLoading ] = useState( attributes.loading );
	const [ loadingPlugins, setLoadingPlugins ] = useState( false );
	const [ statusMessage, setStatusMessage ] = useState( '' );
	const [ progress, setProgress ] = useState( 0 );
	const [ plugins, setPlugins ] = useState( [] );

	/**
	 * Load plugins recursively until all plugins are processed.
	 *
	 * @param {number} page The page to retrieve.
	 */
	const loadPlugins = ( page = 1 ) => {
		setLoadingPlugins( true );
		setLoading( true );
		const restUrl = wppic.rest_url + 'wppic/v2/get_site_plugins';
		axios
			.get(
				restUrl,
				{
					params: {
						page,
					},
					headers: {
						'X-WP-Nonce': wppic.rest_nonce,
					},
				}
			)
			.then( ( response ) => {
				if ( response.data.success ) {
					// todo - process plugins.
					const pluginResponseData = response.data.data;

					// Calculate percentage.
					const percentageComplete = pluginResponseData.percentage_complete;
					const morePlugins = pluginResponseData.more_results;
					const nextPage = pluginResponseData.page;
					const pluginData = pluginResponseData.plugins;

					setProgress( percentageComplete );

					// Merge arrays assetData and pluginData.
					const pluginAssetData = plugins;
					forEach( Object.values( pluginData ), ( plugin ) => {
						pluginAssetData.push( plugin );
					} );
					setPlugins( pluginAssetData );

					// todo - append to assetData.
					if ( morePlugins ) {
						loadPlugins( nextPage );
					} else {
						// Set plugins and update status.
						setLoading( false );
						setAttributes( {
							loading: false,
						} );
						setLoadingPlugins( false );
						setAttributes( {
							assetData: plugins,
						} );
					}
				}
			} );
	};
	const pluginOnClick = ( assetSlug, assetType ) => {
		setPlugins( [] );
		setLoading( false );
		setAttributes( {
			loading: false,
		} );
		setLoadingPlugins( true );

		// Do ajax request to get activeplugins.
		loadPlugins();
	};
	useEffect( () => {
		if ( ! defaultsApplied && 'default' === scheme ) {
			setAttributes( {
				defaultsApplied: true,
				scheme: wppic.default_scheme,
				layout: wppic.default_layout,
			} );
		}
	}, [] );

	const outputInfoCards = ( cardDataArray ) => {
		return Object.values( cardDataArray ).map( ( cardData, key ) => {
			return (
				<Fragment key={ key }>
					{ 'flex' === layout && (
						<PluginFlex
							scheme={ scheme }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'card' === layout && (
						<PluginCard
							scheme={ scheme }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'large' === layout && (
						<PluginLarge
							scheme={ scheme }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'wordpress' === layout && (
						<PluginWordPress
							scheme={ scheme }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'flex' === layout && (
						<ThemeFlex
							scheme={ scheme }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'wordpress' === layout && (
						<ThemeWordPress
							scheme={ scheme }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'large' === layout && (
						<ThemeLarge
							scheme={ scheme }
							data={ cardData }
							align={ align }
						/>
					) }
					{ 'card' === layout && (
						<ThemeCard
							scheme={ scheme }
							data={ cardData }
							align={ align }
						/>
					) }
				</Fragment>
			);
		} );
	};

	const resetSelect = [
		{
			icon: 'edit',
			title: __( 'Edit and Configure', 'wp-plugin-info-card' ),
			onClick: () => setLoading( true ),
		},
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
							} else {
								setAttributes( {
									layout: value,
									align: 'center',
								} );
							}
						} }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);

	const blockProps = useBlockProps( {
		className: classnames( `site-plugins-card-grid align${ align }` ),
	} );

	if ( preview ) {
		return (
			<div style={ { textAlign: 'center' } }>
				<img
					src={ wppic.wppic_preview }
					alt=""
					style={ { height: '415px', width: 'auto', textAlign: 'center' } }
				/>
			</div>
		);
	}
	// if ( cardLoading ) {
	// 	return (
	// 		<div { ...blockProps }>
	// 			<div className="wppic-loading-placeholder">
	// 				<div className="wppic-loading">
	// 					<Logo size="45" />
	// 					<br />
	// 					<div className="wppic-spinner">
	// 						<Spinner />
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	const getPluginsQueryButton = (
		<>
			<div className="wp-pic-gutenberg-button">
				<Button
					iconSize={ 20 }
					icon={ ! loadingPlugins ? <Logo size="25" /> : <Spinner /> }
					isSecondary
					disabled={ loadingPlugins }
					id="wppic-input-submit"
					onClick={ ( event ) => {
						setProgress( 0 );
						pluginOnClick( event );
					} }
				>
					{ ! loadingPlugins ? __(
						'Load Plugins',
						'wp-plugin-info-card'
					) : __( 'Loading…', 'wp-plugin-info-card' ) }
				</Button>
			</div>
			{ loadingPlugins && (
				<>
					<ProgressBar percentage={ progress } />
				</>
			) }
		</>
	);

	console.log( assetData );

	const block = (
		<>
			{ loading && (
				<>
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								icon="welcome-view-site"
								title={ __(
									'View Preview',
									'wp-plugin-info-card'
								) }
								onClick={ () => setLoading( false ) }
							/>
						</ToolbarGroup>
					</BlockControls>
					<div className="wppic-site-plugins-block wppic-site-plugins-panel">
						<div className="wppic-block-svg">
							<Logo size="75" />
						</div>
						<div className="wppic-site-plugins-description">
							<p>
								{ __( 'Click "Load Plugins" to load your active plugins. Please note that plugins not hosted on the WordPress Plugin Directory will not be displayed.', 'wp-plugin-info-card' ) }
							</p>
						</div>
						{ getPluginsQueryButton }
					</div>
				</>
			) }
			{ ( ! loading && Object.keys( assetData ).length <= 0 && ! loadingPlugins ) && (
				<div className="wppic-site-plugins-block wppic-site-plugins-panel">
					<div className="wppic-block-svg">
						<Logo size="75" />
					</div>
					<div className="wppic-site-plugins-description">
						<Notice
							status="warning"
							isDismissible={ false }
						>
							{ __( 'No plugins have been loaded or found. Please try again.', 'wp-plugin-info-card' ) }
						</Notice>
					</div>
					{ getPluginsQueryButton }
				</div>
			) }
			{ ( ! loading && Object.keys( assetData ).length > 0 && ! loadingPlugins ) && (
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
					<div
						className={ classnames(
							'is-placeholder',
							layoutClass,
							'wp-block-plugin-info-card',
							`align${ align }`
						) }
					>
						{ outputInfoCards( assetData ) }
					</div>
				</Fragment>
			) }
		</>
	);

	return <div { ...blockProps }>{ block }</div>;
};

export default SitePluginsCardGrid;
