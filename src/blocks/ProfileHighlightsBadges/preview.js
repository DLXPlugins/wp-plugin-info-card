import React, { useState } from 'react';

import {
	ToolbarButton,
	ToolbarGroup,
	PanelBody,
	PanelRow,
	ButtonGroup,
	BaseControl,
	ToggleControl,
	RangeControl,
	Button,
	SelectControl,
} from '@wordpress/components';
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';

const Preview = ( props ) => {

	const {
		attributes,
		setAttributes,
		onEdit,
		onRefresh,
	} = props;

	const {
		authorSlug,
		avatarUrl,
		avatarSize,
		preview,
		authorName,
		showAvatar,
		showName,
		layout,
		headlineSize,
	} = attributes;

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Block Options', 'wp-plugin-info-card' ) }
			>
				<PanelRow className="wppic-panel-rows-cols">
					<BaseControl id="col-count" label={ __( 'Layout', 'wp-plugin-info-card' ) }>
						<ButtonGroup>
							<Button
								isPrimary={ 'justified' === layout }
								isSecondary={'justified' !== layout }
								onClick={ () => {
									setAttributes( {
										layout: 'justified',
									} );
								} }
							>
								{ __( 'Justified', 'wp-plugin-info-card' ) }
							</Button>
							<Button
								isPrimary={ 'centered' === layout }
								isSecondary={ 'centered' !== layout }
								onClick={ () => {
									setAttributes( {
										layout: 'centered',
									} );
								} }
							>
								{ __( 'Centered', 'wp-plugin-info-card' ) }
							</Button>
						</ButtonGroup>
					</BaseControl>
				</PanelRow>
				<div className="wppic-panel-row">
					<RangeControl
						label={ __( 'Avatar Size', 'wp-plugin-info-card' ) }
						value={ avatarSize }
						onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
						min={ 1 }
						max={ 96 }
					/>
				</div>
				<div className="wppic-panel-row">
					<SelectControl
						label={ __( 'Headline Size', 'wp-plugin-info-card' ) }
						value={ headlineSize }
						onChange={ ( value ) => setAttributes( { headlineSize: value } ) }
						options={ [
							{ value: 'inherit', label: __( 'Inherit', 'wp-plugin-info-card' ) },
							{ value: '--wppic-headline-size-xs', label: __( 'Extra Small', 'wp-plugin-info-card' ) },
							{ value: '--wppic-headline-size-sm', label: __( 'Small', 'wp-plugin-info-card' ) },
							{ value: '--wppic-headline-size-md', label: __( 'Medium', 'wp-plugin-info-card' ) },
							{ value: '--wppic-headline-size-lg', label: __( 'Large', 'wp-plugin-info-card' ) },
							{ value: '--wppic-headline-size-xl', label: __( 'Extra Large', 'wp-plugin-info-card' ) },
						] }
					/>
				</div>
				<ToggleControl
					label={ __( 'Show Avatar', 'wp-plugin-info-card' ) }
					checked={ showAvatar }
					onChange={ ( value ) => setAttributes( { showAvatar: value } ) }
				/>
				<ToggleControl
					label={ __( 'Show Name', 'wp-plugin-info-card' ) }
					checked={ showName }
					onChange={ ( value ) => setAttributes( { showName: value } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);

	const toolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="edit"
					title={ __(
						'Edit and Configure',
						'wp-plugin-info-card',
					) }
					onClick={ () => onEdit() }
				/>
				<ToolbarButton
					icon="update"
					title={ __(
						'Refresh',
						'wp-plugin-info-card',
					) }
					onClick={ () => onRefresh() }
				/>
			</ToolbarGroup>
		</BlockControls>
	);

	// Define the wrapper styles.
	const wrapperStyles = classnames(
		'wppic-author-avatar-container',
		{
			'wppic-author-avatar-container-justified': 'justified' === layout,
			'wppic-author-avatar-container-centered': 'centered' === layout,
		},
	);

	// Define the headline styles.
	const headlineStyles = {
		fontSize: headlineSize !== 'inherit' ? `var(${ headlineSize })` : null,
	};

	return (
		<>
			{ inspectorControls }
			{ toolbar }
			<div className={ wrapperStyles }>
				<div className="wppic-author-avatar">
					<img
						src={ avatarUrl }
						alt={ authorName }
						style={ {
							width: avatarSize + 'px',
							height: avatarSize + 'px',
						} }
					/>
				</div>
				<div className="wppic-author-name">
					<h2 className="wppic-author-name-text" style={ headlineStyles }>
						{ authorName }
					</h2>
				</div>
			</div>
		</>
	)
};
export default Preview;
 