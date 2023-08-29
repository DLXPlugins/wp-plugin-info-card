/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/**
 * External dependencies
 */
import axios from 'axios';
import classnames from 'classnames';
import { isURL } from '@wordpress/url';

import PluginScreenshotsCard from '../templates/PluginScreenshots';
import Logo from '../Logo';
import { useState, useEffect } from 'react';

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

import SlugEntryScreen from './screens/ScreenSlugEntry';
import ScreenImageLoader from './screens/ScreenImageLoader';
import ScreenNoImages from './screens/ScreenNoImages';

const PluginScreenshotsInfoCard = ( props ) => {
	const { attributes, setAttributes } = props;

	const [ type, setType ] = useState( attributes.type );
	const [ slug, setSlug ] = useState( attributes.slug );
	const [ loading, setLoading ] = useState( true );
	const [ cardLoading, setCardLoading ] = useState( false );
	const [ image, setImage ] = useState( attributes.image );
	const [ containerid, setContainerid ] = useState( attributes.containerid );
	const [ scheme, setScheme ] = useState( attributes.scheme );
	const [ layout, setLayout ] = useState( attributes.layout );
	const [ multi, setMulti ] = useState( true );
	const [ preview, setPreview ] = useState( attributes.preview );
	const [ data, setData ] = useState( attributes.assetData );
	const [ align, setAlign ] = useState( attributes.align );
	const [ hasScreenshots, setHasScreenshots ] = useState( false );
	const [ screen, setScreen ] = useState( attributes.screen );

	const loadData = () => {
		setLoading( false );
		setCardLoading( true );
		const restUrl = wppic.rest_url + 'wppic/v2/get_data';
		axios
			.get(
				restUrl + `?type=${ type }&slug=${ encodeURIComponent( slug ) }`
			)
			.then( ( response ) => {
				// Now Set State
				setAttributes( { assetData: response.data.data } );
				setData( response.data.data );
				setHasScreenshots( response.data.data.hasOwnProperty( 'screenshots') );
				setCardLoading( false );
			} );
	};
	const pluginOnClick = ( assetSlug, assetType ) => {
		loadData();
	};

	const outputInfoCards = ( cardDataArray ) => {
		if ( data.length <= 0 ) {
			return null;
		}
		const dataSet = data[0];
		return (
			<>
				{ <PluginScreenshotsCard { ...dataSet } /> }
			</>
		);
	};

	useEffect( () => {
		if ( data.length <= 0 ) {
			return;
		}
		setCardLoading( false );
	}, [ data ] );

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
							<>
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
													setImage( '' );
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

	const blockProps = useBlockProps( {
		className: classnames( `wp-plugin-info-card align${ align }` ),
	} );

	/**
	 * Get the screen to display.
	 *
	 * @return {Element} The screen to display.
	 */
	const getCurrentScreen = () => {
		return <ScreenNoImages attributes={ attributes } setAttributes={ setAttributes } />;

		// Otherwise get the screen based on the current screen.
		switch ( attributes.screen ) {
			case 'slug-entry':
				return <SlugEntryScreen attributes={ attributes } setAttributes={ setAttributes } />;
			case 'image-loader':
				return <ScreenImageLoader attributes={ attributes } setAttributes={ setAttributes } />;
			case 'no-images-found':
				return <ScreenNoImages attributes={ attributes } setAttributes={ setAttributes } />;
		}
		return null;
	};

	

	if ( preview ) {
		return (
			<>
				<img
					src={ wppic.wppic_preview }
					alt=""
					style={ { width: '100%', height: 'auto' } }
				/>
			</>
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
		<>
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
					<ToolbarGroup>
						<ToolbarButton
							icon="edit"
							title={ __(
								'Edit and Configure',
								'wp-plugin-info-card'
							) }
							onClick={ () => {
								setLoading( true )
								setCardLoading( false )
							} }
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
										<>
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
										</>
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
										<>
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
										</>
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
					{ outputInfoCards( data ) }
				</div>
			</>
		) }
		</>
	);

	return <div { ...blockProps }>{block}{ getCurrentScreen() }</div>;
};

export default PluginScreenshotsInfoCard;
