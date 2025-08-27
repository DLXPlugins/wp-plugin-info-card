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
import { isURL } from '@wordpress/url';
import { ForkIcon, HomeIcon, GitHubIcon, HeartIcon, StarIcon, EyeIcon, CodeIcon } from '../components/GitHubIcons';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { dateI18n } from '@wordpress/date';

import { __ } from '@wordpress/i18n';

import {
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
} from '@wordpress/components';

import {
	InspectorControls,
	BlockAlignmentToolbar,
	MediaUpload,
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const { useInstanceId } = wp.compose;

const GitHubInfoCardGrid = ( props ) => {
	const { attributes, setAttributes } = props;
	const generatedUniqueId = useInstanceId( GitHubInfoCardGrid, 'wp-plugin-info-card-id' );

	const {
		preview,
		align,
		className,
		layout,
	} = attributes;

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
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	const inspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Layout', 'wp-plugin-info-card' ) }>
				hi
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
	)

	return (
		<div { ...blockProps }>
			{ inspectorControls }
			{ getBlockControls() }
			<div { ...innerBlocksProps } />
		</div>
	);
};

export default GitHubInfoCardGrid;
