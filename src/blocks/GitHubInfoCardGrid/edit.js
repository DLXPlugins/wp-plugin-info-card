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

const GitHubInfoCardGrid = ( props ) => {
	const { attributes, setAttributes } = props;
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

	// Set defaults.
	useEffect( () => {
		setShowTopBar( attributes.showTopBar );
		setShowStatsBar( attributes.showStatsBar );
		setShowLastUpdated( attributes.showLastUpdated );
		setButtonType( attributes.buttonType );
	}, [] );

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

	const inspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Layout', 'wp-plugin-info-card' ) }>
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
		className: classnames( `wppic-github-info-card align${ align } layout-${ layout }` ),
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

	return (
		<div { ...blockProps }>
			{ inspectorControls }
			{ getBlockControls() }
			<div { ...innerBlocksProps } />
		</div>
	);
};

export default GitHubInfoCardGrid;
