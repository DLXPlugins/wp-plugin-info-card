/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/**
 * External dependencies
 */
import axios from 'axios';
import classnames from 'classnames';
import { escapeAttribute } from '@wordpress/escape-html';
import { decodeEntities } from '@wordpress/html-entities';
import PluginFlex from '../templates/PluginFlex';
import PluginCard from '../templates/PluginCard';
import PluginLarge from '../templates/PluginLarge';
import PluginWordPress from '../templates/PluginWordPress';
import PluginRatingsCard from '../templates/PluginRatingsCard';
import ThemeFlex from '../templates/ThemeFlex';
import ThemeWordPress from '../templates/ThemeWordPress';
import ThemeLarge from '../templates/ThemeLarge';
import ThemeCard from '../templates/ThemeCard';
import ThemesRatingCard from '../templates/ThemeRatingsCard';
import Logo from '../Logo';
import NumbersComponent from '../components/Numbers';
import { isURL } from '@wordpress/url';
import { useCallback } from 'react';
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

const GitHubInfoCard = ( props ) => {
	const { attributes, setAttributes } = props;
	const generatedUniqueId = useInstanceId( GitHubInfoCard, 'wp-plugin-info-card-id' );

	const {
		assetData,
		username,
		preview,
		repo,
		align,
	} = attributes;

	const [ data, setData ] = useState( assetData );
	const [ noData, setNoData ] = useState( false );
	const [ cardLoading, setCardLoading ] = useState( false );
	const [ loading, setLoading ] = useState( attributes.loading );
	const [ mainInputField, setMainInputField ] = useState( null );

	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	const loadData = () => {
		setLoading( false );
		setCardLoading( true );
		setNoData( false );
		const restUrl = wppic.rest_url + 'wppic/v2/get_github_data';
		axios
			.get(
				restUrl + `?username=${ username }&repo=${ repo }`,
			)
			.then( ( response ) => {
				console.log( response );
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
		if ( loading ) {
			return;
		}
		if ( ! data || 0 === data.length ) {
			loadData();
		}
	}, [] );

	/**
	 * Select the search input field.
	 */
	useEffect( () => {
		if ( mainInputField ) {
			mainInputField.focus();

			// Select the text in the input field.
			mainInputField.select();
		}
	}, [ mainInputField ] );

	const outputInfoCards = ( cardDataArray ) => {
		return cardDataArray.map( ( cardData, key ) => {
			let textValue = '';

			// Check to see if slug is in the itemSlugs array.
			if ( cardData.slug in itemSlugs ) {
				if ( '' !== itemSlugs[ cardData.slug ] ) {
					textValue = itemSlugs[ cardData.slug ];
					// Merge with card data.
					cardData = { ...cardData, name: textValue };
				}
			}
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
					{ 'ratings' === layout && 'plugin' === type && (
						<PluginRatingsCard
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
					{ 'ratings' === layout && 'theme' === type && (
						<ThemesRatingCard
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
	const inspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Layout', 'wp-plugin-info-card' ) }>
				hi
			</PanelBody>
		</InspectorControls>
	);

	const blockProps = useBlockProps( {
		className: classnames( `wppic-github-info-card align${ align }` ),
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
						<TextControl
							label={ __(
								'GitHub Username or GitHub Repo URL',
								'wp-plugin-info-card',
							) }
							id="search-github-username"
							value={ username }
							onChange={ ( value ) => {
								// Check for URL so we don't paste in the slug AND url.
								if ( isURL( value ) ) {
									return;
								}
								setAttributes( {
									username: value,
								} );
							} }
							help={ __(
								'Enter a GitHub username or GitHub repo URL.',
								'wp-plugin-info-card',
							) }
							onPaste={ ( event ) => {
								// Get contents from clipboard.
								const clipboardData = event.clipboardData
									.getData( 'text/plain' )
									.trim();

								if ( isURL( clipboardData ) ) {
									// Extract out the slug from the URL.
									const gitHubUrlRegex = /https:\/\/github\.com\/([^/]*)\/([^/]*)/;
									if ( ! gitHubUrlRegex.test( clipboardData ) ) {
										return;
									}
									const newUsername = gitHubUrlRegex.exec(
										clipboardData,
									)[ 1 ];
									const newRepo = gitHubUrlRegex.exec(
										clipboardData,
									)[ 2 ];
									setAttributes( {
										username: newUsername,
										repo: newRepo,
									} );
								}
							} }
							onBlur={ () => {
								// If the username is a URL, extract out the username.
								if ( isURL( username ) ) {
									// Extract out the username from the URL.
									const gitHubUrlRegex = /https:\/\/github\.com\/([^/]*)\/([^/]*)/;
									if ( ! gitHubUrlRegex.test( clipboardData ) ) {
										return;
									}
									const newUsername = gitHubUrlRegex.exec(
										clipboardData,
									)[ 1 ];
									const newRepo = gitHubUrlRegex.exec(
										clipboardData,
									)[ 2 ];
									setAttributes( {
										username: newUsername,
										repo: newRepo,
									} );
								}
							} }
							ref={ setMainInputField }
						/>
						<TextControl
							label={ __(
								'GitHub Repo',
								'wp-plugin-info-card',
							) }
							id="search-github-repo"
							value={ repo }
							onChange={ ( value ) => {
								setAttributes( {
									repo: value,
								} );
								setRepo( value );
							} }
						/>
						{ noData && (
							<Notice
								status="error"
								isDismissible={ false }
							>
								{ __(
									'No data found for the given slug.',
									'wp-plugin-info-card',
								) }
							</Notice>
						) }
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
								'wp-plugin-info-card',
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
									'wp-plugin-info-card',
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
						id={ attributes.uniqueId }
						className={ classnames(
							'is-placeholder',
							'wp-block-github-info-card',
							`align${ align }`,
						) }
					>
						here is a github card
					</div>
				</Fragment>
			) }
		</Fragment>
	);

	return <div { ...blockProps }>{ block }</div>;
};

export default GitHubInfoCard;
