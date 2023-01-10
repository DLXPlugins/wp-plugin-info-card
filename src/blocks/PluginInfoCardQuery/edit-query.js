// @ts-nocheck
/**
 * External dependencies
 */
import axios from 'axios';
import classnames from 'classnames';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { __ } = wp.i18n;

const { useState, useEffect, Fragment } = wp.element;

const {
	PanelBody,
	SelectControl,
	Spinner,
	TextControl,
	Button,
	Toolbar,
	Notice,
} = wp.components;

const {
	InspectorControls,
	BlockControls,
	MediaUpload,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	useBlockProps,
} = wp.blockEditor;

import PluginFlex from '../templates/PluginFlex';
import PluginCard from '../templates/PluginCard';
import PluginLarge from '../templates/PluginLarge';
import PluginWordPress from '../templates/PluginWordPress';
import ThemeFlex from '../templates/ThemeFlex';
import ThemeWordPress from '../templates/ThemeWordPress';
import ThemeLarge from '../templates/ThemeLarge';
import ThemeCard from '../templates/ThemeCard';
import Logo from '../Logo';

const WP_Plugin_Card_Query = ( props ) => {
	const { attributes, setAttributes } = props;

	const [ loading, setLoading ] = useState( false );
	const [ cardLoading, setCardLoading ] = useState( false );
	const [ noData, setNoData ] = useState( false );

	const {
		assetData,
		type,
		slug,
		html,
		align,
		image,
		containerid,
		margin,
		clear,
		expiration,
		ajax,
		scheme,
		layout,
		width,
		search,
		tag,
		author,
		user,
		browse,
		per_page,
		preview,
		cols,
		sortby,
		sort,
	} = attributes;

	useEffect( () => {
		// If we have HTML, then we don't need to load it.
		if ( ! html ) {
			setLoading( true );
		} else {
			setLoading( false );
		}

		// Apply defaults.
		if ( ! attributes.defaultsApplied && 'default' === attributes.scheme ) {
			setAttributes( {
				defaultsApplied: true,
				scheme: wppic.default_scheme,
				layout: wppic.default_layout,
			} );
		}
	}, [] );

	const pluginOnClick = ( event ) => {
		if ( '' !== type ) {
			setCardLoading( true );
			const rest_url = wppic.rest_url + 'wppic/v1/get_query/';
			axios
				.get(
					rest_url +
						`?type=${ attributes.type }&slug=${ attributes.slug }&align=${ attributes.align }&image=${ attributes.image }&containerid=${ attributes.containerid }&margin=${ attributes.margin }&clear=${ attributes.clear }&expiration=${ attributes.expiration }&ajax=${ attributes.ajax }&scheme=${ attributes.scheme }&layout=${ attributes.layout }&search=${ attributes.search }&tag=${ attributes.tag }&author=${ attributes.author }&user=${ attributes.user }&browse=${ attributes.browse }&per_page=${ attributes.per_page }&cols=${ attributes.cols }}&sortby=${ attributes.sortby }&sort=${ attributes.sort }`
				)
				.then( ( response ) => {
					// Now Set State
					setLoading( false );
					setCardLoading( false );
					if ( response.data.success ) {
						setAttributes( {
							assetData: response.data.data.api_response,
							html: response.data.data.html,
						} );
					} else {
						setAttributes( {
							assetData: [],
							html: '',
						} );
						setNoData( true );
						setLoading( true );
					}
				} );
		}
	};

	const outputInfoCards = () => {
		return assetData.map( ( cardData, key ) => {
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

	const htmlToReactParser = new HtmlToReactParser();

	const resetSelect = [
		{
			icon: 'edit',
			title: __( 'Reset', 'wp-plugin-info-card' ),
			onClick: () => setLoading( true ),
		},
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
	const customThemeOptions = [
		{ value: '', label: __( 'None', 'wp-plugin-info-card' ) },
		{ value: 'url', label: __( 'URL', 'wp-plugin-info-card' ) },
		{ value: 'name', label: __( 'Name', 'wp-plugin-info-card' ) },
		{ value: 'version', label: __( 'Version', 'wp-plugin-info-card' ) },
		{ value: 'author', label: __( 'Author', 'wp-plugin-info-card' ) },
		{
			value: 'screenshot_url',
			label: __( 'Screenshot URL', 'wp-plugin-info-card' ),
		},
		{ value: 'rating', label: __( 'Ratings', 'wp-plugin-info-card' ) },
		{
			value: 'num_ratings',
			label: __( 'Number of Ratings', 'wp-plugin-info-card' ),
		},
		{
			value: 'active_installs',
			label: __( 'Active Installs', 'wp-plugin-info-card' ),
		},
		{
			value: 'last_updated',
			label: __( 'Last Updated', 'wp-plugin-info-card' ),
		},
		{ value: 'homepage', label: __( 'Homepage', 'wp-plugin-info-card' ) },
		{
			value: 'download_link',
			label: __( 'Download Link', 'wp-plugin-info-card' ),
		},
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
					} }
				/>
				<SelectControl
					label={ __( 'Layout', 'wp-plugin-info-card' ) }
					options={ layoutOptions }
					value={ layout }
					onChange={ ( value ) => {
						setAttributes( { layout: value } );
					} }
				/>
				<SelectControl
					label={ __( 'Width', 'wp-plugin-info-card' ) }
					options={ widthOptions }
					value={ width }
					onChange={ ( value ) => {
						setAttributes( { width: value } );
					} }
				/>
				<MediaUpload
					onSelect={ ( imageObject ) => {
						setAttributes( {
							image: imageObject.url,
						} );
						attributes.image = imageObject.url;
						pluginOnClick();
					} }
					type="image"
					value={ image }
					render={ ( { open } ) => (
						<>
							<button
								className="components-button is-button"
								onClick={ open }
							>
								{ __( 'Upload Image!', 'wp-plugin-info-card' ) }
							</button>
							{ image && (
								<>
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
												attributes.image = '';
												pluginOnClick();
											} }
										>
											{ __(
												'Reset Image',
												'wp-plugin-info-card'
											) }
										</button>
									</div>
								</>
							) }
						</>
					) }
				/>
				<TextControl
					label={ __( 'Container ID', 'wp-plugin-info-card' ) }
					type="text"
					value={ containerid }
					onChange={ ( value ) => {
						setAttributes( { containerid: value } );
						attributes.containerId = value;
						setTimeout( function() {
							pluginOnClick();
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
						setTimeout( function() {
							pluginOnClick();
						}, 5000 );
					} }
				/>
				<SelectControl
					label={ __( 'Clear', 'wp-plugin-info-card' ) }
					options={ clearOptions }
					value={ clear }
					onChange={ ( value ) => {
						setAttributes( { clear: value } );
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
					} }
				/>
				<SelectControl
					label={ __( 'Load card via Ajax?', 'wp-plugin-info-card' ) }
					options={ ajaxOptions }
					value={ ajax }
					onChange={ ( value ) => {
						setAttributes( { ajax: value } );
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);

	const block = (
		<>
			<>
				{ loading && (
					<div className="wppic-query-block wppic-query-block-panel">
						<div className="wppic-block-svg">
							<Logo size="75" />
						</div>
						<div className="wp-pic-tab-panel">
							{ noData && (
								<div className="wppic-no-data">
									<Notice
										status="error"
										isDismissible={ false }
									>
										{ __(
											'No data found. Please check your query.',
											'wp-plugin-info-card'
										) }
									</Notice>
								</div>
							) }
							<SelectControl
								label={ __(
									'Select a Type',
									'wp-plugin-info-card'
								) }
								options={ [
									{
										label: __(
											'Plugin',
											'wp-plugin-info-card'
										),
										value: 'plugin',
									},
									{
										label: __(
											'Theme',
											'wp-plugin-info-card'
										),
										value: 'theme',
									},
								] }
								value={ type }
								onChange={ ( value ) => {
									setAttributes( {
										type: value,
									} );
								} }
							/>
							<TextControl
								label={ __(
									'Search',
									'wp-plugin-info-card'
								) }
								value={ search }
								onChange={ ( value ) => {
									setAttributes( {
										search: value,
									} );
								} }
							/>
							<TextControl
								label={ __(
									'Tags',
									'wp-plugin-info-card'
								) }
								value={ tag }
								onChange={ ( value ) => {
									setAttributes( {
										tag: value,
									} );
								} }
								help={ __( 'Comma separated', 'wp-plugin-info-card' ) }
							/>
							<TextControl
								label={ __(
									'Author',
									'wp-plugin-info-card'
								) }
								value={ author }
								onChange={ ( value ) => {
									setAttributes( {
										author: value,
									} );
								} }
							/>
							<TextControl
								label={ __(
									'User (Username)',
									'wp-plugin-info-card'
								) }
								value={ user }
								onChange={ ( value ) => {
									setAttributes( {
										user: value,
									} );
								} }
								help={ __( 'See the favorites from this username', 'wp-plugin-info-card' ) }
							/>
							<SelectControl
								label={ __(
									'Browse',
									'wp-plugin-info-card'
								) }
								options={ [
									{
										label: __(
											'None',
											'wp-plugin-info-card'
										),
										value: '',
									},
									{
										label: __(
											'Featured',
											'wp-plugin-info-card'
										),
										value: 'featured',
									},
									{
										label: __(
											'Updated',
											'wp-plugin-info-card'
										),
										value: 'updated',
									},
									{
										label: __(
											'Favorites',
											'wp-plugin-info-card'
										),
										value: 'favorites',
									},
									{
										label: __(
											'Popular',
											'wp-plugin-info-card'
										),
										value: 'popular',
									},
								] }
								value={ browse }
								onChange={ ( value ) => {
									setAttributes( {
										browse: value,
									} );
								} }
							/>
							<TextControl
								type="number"
								label={ __(
									'Per Page',
									'wp-plugin-info-card'
								) }
								value={ per_page }
								onChange={ ( value ) => {
									setAttributes( {
										per_page: value,
									} );
								} }
								help={ __( 'Set how many cards to return.', 'wp-plugin-info-card' ) }
							/>
							<SelectControl
								label={ __(
									'Columns',
									'wp-plugin-info-card'
								) }
								options={ [
									{
										label: __(
											'1',
											'wp-plugin-info-card'
										),
										value: '1',
									},
									{
										label: __(
											'2',
											'wp-plugin-info-card'
										),
										value: '2',
									},
									{
										label: __(
											'3',
											'wp-plugin-info-card'
										),
										value: '3',
									},
								] }
								value={ cols }
								onChange={ ( value ) => {
									setAttributes( {
										cols: value,
									} );
								} }
							/>
							<SelectControl
								label={ __(
									'Sort results by:',
									'wp-plugin-info-card'
								) }
								options={ [
									{
										label: __(
											'None',
											'wp-plugin-info-card'
										),
										value: 'none',
									},
									{
										label: __(
											'Active Installs (Plugins only)',
											'wp-plugin-info-card'
										),
										value: 'active_installs',
									},
									{
										label: __(
											'Downloads',
											'wp-plugin-info-card'
										),
										value: 'downloaded',
									},
									{
										label: __(
											'Last Updated',
											'wp-plugin-info-card'
										),
										value: 'last_updated',
									},
								] }
								value={ sortby }
								onChange={ ( value ) => {
									setAttributes( {
										sortby: value,
									} );
								} }
							/>
							<SelectControl
								label={ __(
									'Sort Order:',
									'wp-plugin-info-card'
								) }
								options={ [
									{
										label: __(
											'ASC',
											'wp-plugin-info-card'
										),
										value: 'ASC',
									},
									{
										label: __(
											'DESC',
											'wp-plugin-info-card'
										),
										value: 'DESC',
									},
								] }
								value={ sort }
								onChange={ ( value ) => {
									setAttributes( {
										sort: value,
									} );
								} }
							/>
						</div>
						<div className="wp-pic-gutenberg-button">
							<Button
								iconSize={ 20 }
								icon={ <Logo size="25" /> }
								isSecondary
								id="wppic-input-submit"
								onClick={ ( event ) => {
									event.preventDefault();
									setLoading( false );
									setNoData( false );
									pluginOnClick( event );
								} }
							>
								{ __(
									'Query and Configure',
									'wp-plugin-info-card'
								) }
							</Button>
						</div>
					</div>
				) }
				{ cardLoading && (
					<>
						<div className="wppic-loading-placeholder">
							<div className="wppic-loading">
								<Logo size="45" />
								<br />
								<div className="wppic-spinner">
									<Spinner />
								</div>
							</div>
						</div>
					</>
				) }
				{ ! loading && ! cardLoading && (
					<>
						{ inspectorControls }
						<BlockControls>
							<Toolbar controls={ resetSelect } />
							{ 'flex' === layout && (
								<BlockAlignmentToolbar
									value={ align }
									onChange={ ( value ) => {
										setAttributes( {
											align: value,
										} );
										pluginOnClick( value );
									} }
								></BlockAlignmentToolbar>
							) }
							{ 'card' === layout && (
								<AlignmentToolbar
									value={ align }
									onChange={ ( value ) => {
										setAttributes( {
											align: value,
										} );
										pluginOnClick( value );
									} }
								></AlignmentToolbar>
							) }
						</BlockControls>
						<div
							className={
								'' !== width ? 'wp-pic-full-width' : ''
							}
						>
							<div className={ `wp-pic-1-${ cols }` }>
								<div className={ `wp-pic-grid cols-${ cols }` }>
									{ outputInfoCards() }
								</div>
							</div>
						</div>
					</>
				) }
			</>
		</>
	);

	const blockProps = useBlockProps( {
		className: classnames( `wp-plugin-info-card-query align${ align }` ),
	} );
	if ( preview ) {
		return (
			<>
				<img
					src={ wppic.query_preview }
					style={ { width: '100%', height: 'auto' } }
				/>
			</>
		);
	}
	return <div { ...blockProps }>{ block }</div>;
};

export default WP_Plugin_Card_Query;
