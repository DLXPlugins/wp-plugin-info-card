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

// Media uploader script.
import wpInfoCardImageCrop from './media-uploader-helper';

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
//import PluginLargeCustom from '../templates/PluginLargeCustom';

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
	const [ screen, setScreen ] = useState( attributes.currentScreen );

	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	const getWizardStartButton = (
		<>
			<div className="wp-pic-gutenberg-button">
				<Button
					iconSize={ 20 }
					icon={ <Logo size="25" />}
					isSecondary
					id="wppic-input-submit"
					onClick={ ( event ) => {
						setScreen( 'screenOneImages')
					} }
				>
					{ __( 'Start Wizard', 'wp-plugin-info-card' ) }
				</Button>
			</div>
		</>
	);

	const getScreenOneImages = () => {
		return (
			<>
				<Button
					variant="primary"
					onClick={ ( event ) => {
						const buttonElement = event.target;
						wpInfoCardImageCrop( event, {
							suggestedWidth: 512,
							suggestedHeight: 512,
							title: __( 'Plugin Icon', 'wp-plugin-info-card' ),
							buttonLabel: __( 'Add Plugin Icon', 'wp-plugin-info-card' ),
						})
					} }
				>
					{ __( 'Upload a Square Plugin Icon' ) }
				</Button>
			</>
		);
	}

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

	const getInspectorControls = () => {
		return (
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
			</>
		)
	};

	const screeenWizardStart = () => {
		return (
			<>
				<div className="wppic-query-block wppic-query-block-panel">
					<div className="wppic-site-plugins-block wppic-site-plugins-panel">
						<div className="wppic-block-svg">
							<Logo size="75" />
						</div>
						<div className="wppic-site-plugins-description">
							<p>
								{ __( 'A wizard will walk you through all the steps and data the plugin needs to display an info card.', 'wp-plugin-info-card' ) }
							</p>
						</div>
						{ getWizardStartButton }
					</div>
				</div>
				
			</>
		);
	}

	const wizardScreenOneImageSelect = () => {
		return null;
	}

	console.log( screen );
	const getScreenComponents = () => {
		switch ( screen ) {
			case 'wizardStart':
				return screeenWizardStart();
				break;
			case 'screenOneImages':
				return getScreenOneImages();
				break;
			default:
				return null;
		}
	}

	
		

	return <div { ...blockProps }>{ getScreenComponents() }</div>;
};

export default CustomInfoCard;
