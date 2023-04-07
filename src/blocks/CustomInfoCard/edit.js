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
import { uniqueId } from 'lodash';
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

const CustomInfoCard = ( props ) => {
	const { attributes, setAttributes } = props;

	const { bannerImage } = attributes;

	const generatedUniqueId = useInstanceId( CustomInfoCard, 'wp-plugin-info-card-id' );

	const [ loading, setLoading ] = useState( false );
	const [ cardLoading, setCardLoading ] = useState( false );
	const [ image, setImage ] = useState( attributes.image );
	const [ scheme, setScheme ] = useState( attributes.scheme );
	const [ hasMultipleAssets, setHasMultipleAssets ] = useState( false );
	const [ preview, setPreview ] = useState( attributes.preview );
	const [ align, setAlign ] = useState( attributes.align );

	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

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
			</PanelBody>
		</InspectorControls>
	);

	const blockProps = useBlockProps( {
		className: classnames( `custom-info-card align${ align }` ),
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

	const block = (
		<>
			<div className="wppic-query-block wppic-query-block-panel">
				<div className="wppic-block-svg">
					<Logo size="75" />
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
				</BlockControls>
				<div
					id={ attributes.uniqueId }
					className={ classnames(
						'is-placeholder',
						'wp-block-custom-info-card',
						`align${ align }`,
						{
							'has-grid': hasMultipleAssets,
						}
					) }
				>
				</div>
			</>
		</>
	);

	return <div { ...blockProps }>{ block }</div>;
};

export default CustomInfoCard;
