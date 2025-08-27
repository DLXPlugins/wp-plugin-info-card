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
import { ForkIcon, HomeIcon, GitHubIcon, HeartIcon, StarIcon, EyeIcon, CodeIcon } from '../components/GitHubIcons';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { dateI18n } from '@wordpress/date';
import { blockStore } from '../store';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

import {
	PanelBody,
	PanelRow,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	ToolbarItem,
	DropdownMenu,
	MenuItemsChoice,
	BaseControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';

import {
	InspectorControls,
	BlockAlignmentToolbar,
	MediaUpload,
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useInstanceId } from '@wordpress/compose';
import NumbersComponent from '../components/Numbers';

const GitHubInfoCardGrid = ( props ) => {
	const { attributes, setAttributes, clientId } = props;
	const blockUniqueId = useInstanceId( GitHubInfoCardGrid, 'wp-plugin-info-card-id' );

	const {
		preview,
		align,
		className,
		layout,
		showTopBar,
		showAuthorBar,
		showStatsBar,
		showLastUpdated,
		buttonType,
		numChildren,
		colGap,
		rowGap,
		cols,
		marginSpacing,
		marginSpacingTarget,
	} = attributes;

	const {
		getShowTopBar,
		getShowStatsBar,
		getShowAuthorBar,
		getShowLastUpdated,
		getButtonType,
	} = useSelect( ( select ) => {
		return {
			getShowTopBar: select( blockStore( blockUniqueId ) ).getShowTopBar,
			getShowStatsBar: select( blockStore( blockUniqueId ) ).getShowStatsBar,
			getShowAuthorBar: select( blockStore( blockUniqueId ) ).getShowAuthorBar,
			getShowLastUpdated: select( blockStore( blockUniqueId ) ).getShowLastUpdated,
			getButtonType: select( blockStore( blockUniqueId ) ).getButtonType,
		};
	} );

	const {
		setShowTopBar,
		setShowStatsBar,
		setShowLastUpdated,
		setButtonType,
		setShowAuthorBar,
	} = useDispatch( blockStore( blockUniqueId ) );

	const innerBlocksCount = useSelect( ( select ) => {
		const blockOrder = select( 'core/block-editor' ).getBlockOrder( clientId );
		return blockOrder.length;
	} );

	// Set defaults.
	useEffect( () => {
		setShowTopBar( attributes.showTopBar );
		setShowStatsBar( attributes.showStatsBar );
		setShowLastUpdated( attributes.showLastUpdated );
		setButtonType( attributes.buttonType );
	}, [] );

	useEffect( () => {
		if ( numChildren !== innerBlocksCount ) {
			setAttributes( { numChildren: innerBlocksCount } );
		}
	}, [ innerBlocksCount ] );

	const innerBlocksProps = useInnerBlocksProps( {
		className: 'wppic-github-info-card-grid',
	}, {
		allowedBlocks: [ 'wp-plugin-info-card/github-info-card' ],
		template: [
			[ 'wp-plugin-info-card/github-info-card' ],
		],
		templateInsertUpdatesSelection: true,
	} );

	useEffect( () => {
		setAttributes( { uniqueId: blockUniqueId } );
	}, [] );

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
						variant={ cols === 1 ? 'primary' : 'secondary' }
						onClick={ () => {
							setAttributes( {
								cols: 1,
							} );
						} }
					>
						{ __( 'One', 'wp-plugin-info-card' ) }
					</Button>
					<Button
						variant={ cols === 2 ? 'primary' : 'secondary' }
						onClick={ () => {
							setAttributes( {
								cols: 2,
							} );
						} }
					>
						{ __( 'Two', 'wp-plugin-info-card' ) }
					</Button>
					<Button
						variant={ cols === 3 ? 'primary' : 'secondary' }
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

	const marginSpacingOptions = [
		{ value: 'none', label: __( 'None', 'wp-plugin-info-card' ) },
		{ value: 'compact', label: __( 'Compact', 'wp-plugin-info-card' ) },
		{ value: 'comfortable', label: __( 'Comfortable', 'wp-plugin-info-card' ) },
		{ value: 'spacious', label: __( 'Spacious', 'wp-plugin-info-card' ) },
		{ value: 'extreme', label: __( 'Extreme', 'wp-plugin-info-card' ) },
	];

	const marginSpacingTargetOptions = [
		{ value: 'both', label: __( 'Both', 'wp-plugin-info-card' ) },
		{ value: 'top', label: __( 'Top', 'wp-plugin-info-card' ) },
		{ value: 'bottom', label: __( 'Bottom', 'wp-plugin-info-card' ) },
	];

	const inspectorControls = (
		<InspectorControls>
			{
				numChildren > 1 && (
					<PanelBody title={ __( 'Layout', 'wp-plugin-info-card' ) }>
						<SelectControl
							label={ __( 'Margin Spacing', 'wp-plugin-info-card' ) }
							options={ marginSpacingOptions }
							value={ marginSpacing }
							onChange={ ( value ) => {
								setAttributes( { marginSpacing: value } );
							} }
						/>
						<SelectControl
							label={ __( 'Margin Target', 'wp-plugin-info-card' ) }
							options={ marginSpacingTargetOptions }
							value={ marginSpacingTarget }
							onChange={ ( value ) => {
								setAttributes( { marginSpacingTarget: value } );
							} }
						/>
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
				)
			}
			<PanelBody title={ __( 'Visibility Controls', 'wp-plugin-info-card' ) }>
				<ToggleControl
					label={ __( 'Show Top Bar', 'wp-plugin-info-card' ) }
					checked={ showTopBar }
					onChange={ ( value ) => {
						setShowTopBar( value );
						setAttributes( { showTopBar: value } );
					} }
					help={ __( 'Show the top bar with the icons.', 'wp-plugin-info-card' ) }
				/>
				<ToggleControl
					label={ __( 'Show Stats Bar', 'wp-plugin-info-card' ) }
					checked={ showStatsBar }
					onChange={ ( value ) => {
						setShowStatsBar( value );
						setAttributes( { showStatsBar: value } );
					} }
					help={ __( 'Show the stats bar with the plugin stats.', 'wp-plugin-info-card' ) }
				/>
				<ToggleControl
					label={ __( 'Show Author Bar', 'wp-plugin-info-card' ) }
					checked={ showAuthorBar }
					onChange={ ( value ) => {
						setShowAuthorBar( value );
						setAttributes( { showAuthorBar: value } );
					} }
					help={ __( 'Show the author bar with the Organization Name and login.', 'wp-plugin-info-card' ) }
				/>
				<ToggleControl
					label={ __( 'Show Last Updated', 'wp-plugin-info-card' ) }
					checked={ showLastUpdated }
					onChange={ ( value ) => {
						setShowLastUpdated( value );
						setAttributes( { showLastUpdated: value } );
					} }
					help={ __( 'Show the last updated date.', 'wp-plugin-info-card' ) }
				/>
				<SelectControl
					label={ __( 'Button Type', 'wp-plugin-info-card' ) }
					value={ buttonType }
					onChange={ ( value ) => {
						setButtonType( value );
						setAttributes( { buttonType: value } );
					} }
					options={ [
						{ label: __( 'View on GitHub', 'wp-plugin-info-card' ), value: 'github' },
						{ label: __( 'View Website', 'wp-plugin-info-card' ), value: 'website' },
						{ label: __( 'Sponsor', 'wp-plugin-info-card' ), value: 'sponsor' },
					] }
					help={ __( 'Select the type of button to display and where it will link to.', 'wp-plugin-info-card' ) }
				/>
			</PanelBody>
		</InspectorControls>
	);

	const blockProps = useBlockProps( {
		className: classnames(
			`wppic-github-info-card align${ align } layout-${ layout } cols-${ numChildren > 1 ? cols : 1 } wppic-margin-spacing-${ marginSpacing } wppic-margin-spacing-target-${ marginSpacingTarget }`,
			{
				'is-grid': numChildren > 1,
			},
		),
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

	const themes = [
		{
			label: 'GitHub Light',
			value: 'is-style-wppic-github-light',
		},
		{
			label: 'GitHub Dark',
			value: 'is-style-wppic-github-dark',
		},

		{
			label: 'GitHub Colorful',
			value: 'is-style-wppic-github-colorful',
		},

		{
			label: 'GitHub Black & White',
			value: 'is-style-wppic-github-bw',
		},

		{
			label: 'GitHub Custom',
			value: 'is-style-wppic-github-custom',
		},
	];

	const layouts = [
		{
			label: __( 'Large', 'wp-plugin-info-card' ),
			value: 'large',
		},
		{
			label: __( 'Card', 'wp-plugin-info-card' ),
			value: 'card',
		},
	];

	const getBlockControls = () => (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarItem as="button">
					{ ( toolbarItemHTMLProps ) => (
						<DropdownMenu
							toggleProps={ toolbarItemHTMLProps }
							label={ __(
								'Select Theme',
								'wp-plugin-info-card',
							) }
							icon="admin-customizer"
						>
							{ ( { onClose } ) => (
								<Fragment>
									<MenuItemsChoice
										choices={ themes }
										onSelect={ ( value ) => {
											setAttributes( {
												className: value,
											} );
											onClose();
										} }
										value={ attributes.className }
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
										choices={ layouts }
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
	);

	const gridStyles = `
		#${ attributes.uniqueId } .wppic-github-info-card-grid {
			display: grid;
			column-gap: ${ colGap }px;
			row-gap: ${ rowGap }px;
		}
	`;

	return (
		<div { ...blockProps } id={ attributes.uniqueId }>
			{ numChildren > 1 && (
				<style>{ gridStyles }</style>
			) }
			{ inspectorControls }
			{ getBlockControls() }
			<div { ...innerBlocksProps } />
		</div>
	);
};

export default GitHubInfoCardGrid;
