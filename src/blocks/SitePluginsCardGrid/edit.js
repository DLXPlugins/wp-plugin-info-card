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
import PluginRatingsCard from '../templates/PluginRatingsCard';
import Logo from '../Logo';
import ProgressBar from '../components/ProgressBar';
import NumbersComponent from '../components/Numbers';
import { forEach } from 'lodash';
const { Fragment, useEffect, useState } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	SelectControl,
	Spinner,
	ToolbarGroup,
	ToolbarButton,
	ToolbarItem,
	DropdownMenu,
	ButtonGroup,
	Button,
	Notice,
	MenuItemsChoice,
	BaseControl,
	ToggleControl,
	TextControl,
} = wp.components;

const {
	InspectorControls,
	BlockAlignmentToolbar,
	MediaUpload,
	BlockControls,
	useBlockProps,
} = wp.blockEditor;

const { useInstanceId } = wp.compose;

const SitePluginsCardGrid = ( props ) => {
	const { attributes, setAttributes } = props;
	const generatedUniqueId = useInstanceId( SitePluginsCardGrid, 'wp-plugin-info-card-id' );

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
		uniqueId,
	} = attributes;

	const [ loading, setLoading ] = useState( false );
	const [ loadingPlugins, setLoadingPlugins ] = useState( false );
	const [ statusMessage, setStatusMessage ] = useState( '' );
	const [ progress, setProgress ] = useState( 0 );
	const [ plugins, setPlugins ] = useState( [] );
	const [ itemSlugs, setItemSlugs ] = useState( attributes.itemSlugs );

	// Load plugins if no asset data.
	useEffect( () => {
		if ( Object.keys( assetData ).length <= 0 ) {
			loadPlugins();
		}
	}, [] );

	/**
	 * Load plugins recursively until all plugins are processed.
	 *
	 * @param {number} page       The page to retrieve.
	 * @param {Array}  pluginList The list of plugins.
	 */
	const loadPlugins = ( page = 1, pluginList = [] ) => {
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
				},
			)
			.then( ( response ) => {
				if ( response.data.success ) {
					const pluginResponseData = response.data.data;

					// Calculate percentage.
					const percentageComplete = pluginResponseData.percentage_complete;
					const morePlugins = pluginResponseData.more_results;
					const nextPage = pluginResponseData.page;
					const pluginData = pluginResponseData.plugins;
					setProgress( percentageComplete );

					// Merge arrays assetData and pluginData.
					const pluginAssetData = pluginList;
					Object.values( pluginData ).forEach( ( plugin ) => {
						pluginAssetData.push( plugin );
					} );

					if ( morePlugins ) {
						loadPlugins( nextPage, pluginAssetData );
					} else {
						// Set plugins and update status.
						setLoading( false );
						setAttributes( {
							loading: false,
						} );
						setLoadingPlugins( false );
						setAttributes( {
							assetData: pluginAssetData,
						} );
						setPlugins( pluginAssetData );
					}
				}
			} );
	};
	const pluginOnClick = () => {
		setPlugins( [] );
		setLoading( false );
		setAttributes( {
			loading: false,
			assetData: [],
		} );
		setLoadingPlugins( true );

		// Do ajax request to get activeplugins.
		loadPlugins( 1, [] );
	};
	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
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
			let textValue = '';

			// Check to see if slug is in the itemSlugs array.
			if ( cardData.slug in itemSlugs ) {
				if ( '' !== itemSlugs[ cardData.slug ] && false !== itemSlugs[ cardData.slug ] ) {
					textValue = itemSlugs[ cardData.slug ];
					// Merge with card data.
					cardData = { ...cardData, name: textValue };
				} else if ( false === itemSlugs[ cardData.slug ] ) {
					return null;
				}
			}

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
					{ 'ratings' === layout && (
						<PluginRatingsCard
							scheme={ scheme }
							data={ cardData }
							align={ align }
						/>
					) }
				</Fragment>
			);
		} );
	};

	/**
	 * Output slug options for overriding the plugin title per plugin.
	 *
	 * @param {Array} cardDataArray The card data array.
	 * @param {Array} oldItemSlugs  The old item slugs.
	 */
	const outputSlugs = ( cardDataArray, oldItemSlugs ) => {
		return cardDataArray.map( ( cardData, key ) => {
			let textValue = '';
			// Check to see if slug is in the itemSlugs array.
			if ( cardData.slug in oldItemSlugs ) {
				textValue = oldItemSlugs[ cardData.slug ];
			}

			// Determine if plugin is displaying or not.
			let displayPlugin = true;
			if ( cardData.slug in oldItemSlugs ) {
				if ( false === oldItemSlugs[ cardData.slug ] ) {
					displayPlugin = false;
				}
			}

			const panelBodyTitle = cardData.name + ' (' + ( displayPlugin ? __( 'Enabled', 'wp-plugin-info-card' ) : __( 'Disabled', 'wp-plugin-info-card' ) ) + ')';
			return (
				<PanelBody
					title={ panelBodyTitle }
					key={ key }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Display Plugin', 'wp-plugin-info-card' ) }
						checked={ displayPlugin }
						onChange={ ( value ) => {
							let newTextValue = '';
							if ( false === value ) {
								newTextValue = false;
							}
							const itemSlugsTemp = itemSlugs;
							itemSlugsTemp[ cardData.slug ] = newTextValue; // Slug can be false, or have a title override.
							setItemSlugs( { ...itemSlugsTemp } );
							setAttributes( { itemSlugs: { ...itemSlugsTemp } } );
						} }
					/>
					{ displayPlugin && (
						<>
							<TextControl
								label={ __( 'Override Title', 'wp-plugin-info-card' ) }
								value={ itemSlugs[ cardData.slug ] || textValue }
								onChange={ ( value ) => {
									const itemSlugsTemp = itemSlugs;
									itemSlugsTemp[ cardData.slug ] = value;
									setItemSlugs( { ...itemSlugsTemp } );
									setAttributes( { itemSlugs: { ...itemSlugsTemp } } );
								} }
							/>
						</>
					) }
				</PanelBody>
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
		{ value: 'ratings', label: __( 'Ratings', 'wp-plugin-info-card' ) },
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
			</PanelBody>
			{ outputSlugs( assetData, itemSlugs ) }
		</InspectorControls>
	);

	const styles = `
		#${ uniqueId } {
			display: grid;
			column-gap: ${ colGap }px;
			row-gap: ${ rowGap }px;
		}
	`;

	const blockProps = useBlockProps( {
		className: classnames( `site-plugins-card-grid align${ align }` ),
	} );

	if ( preview ) {
		return (
			<div style={ { textAlign: 'center' } }>
				<img
					src={ wppic.site_plugins_preview }
					alt=""
					style={ { height: '415px', width: 'auto', textAlign: 'center' } }
				/>
			</div>
		);
	}

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
						'wp-plugin-info-card',
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
									'wp-plugin-info-card',
								) }
								onClick={ () => setLoading( false ) }
							>
								{ __( 'View Preview', 'wp-plugin-info-card' ) }
							</ToolbarButton>
						</ToolbarGroup>
					</BlockControls>
					<div className="wppic-site-plugins-block wppic-site-plugins-panel">
						<div className="wppic-block-svg">
							<Logo size="75" />
						</div>
						<div className="wppic-site-plugins-description">
							<p>
								{ __( 'Plugins are loading in the background.', 'wp-plugin-info-card' ) }
							</p>
						</div>
						{ loadingPlugins && (
							<>
								<ProgressBar percentage={ progress } />
							</>
						) }
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
								icon="image-rotate"
								title={ __(
									'Refresh Plugins',
									'wp-plugin-info-card',
								) }
								onClick={ () => pluginOnClick() }
							>
								{ __( 'Refresh', 'wp-plugin-info-card' ) }
							</ToolbarButton>
						</ToolbarGroup>
						<ToolbarGroup>
							<ToolbarItem as="button">
								{ ( toolbarItemHTMLProps ) => (
									<DropdownMenu
										toggleProps={ toolbarItemHTMLProps }
										label={ __(
											'Select Color Scheme',
											'wp-plugin-info-card',
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
											'wp-plugin-info-card',
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
					<style>{ styles }</style>
					<div
						id={ uniqueId }
						className={ classnames(
							'is-placeholder',
							layoutClass,
							'wp-block-plugin-info-card',
							'wp-site-plugin-info-card',
							`align${ align }`,
							`cols-${ cols }`,
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
