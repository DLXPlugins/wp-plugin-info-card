
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
} from '@wordpress/components';

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
		authorWebsite,
		showAvatar,
		showName,
		showWebsite,
		layout,
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
				<RangeControl
					label={ __( 'Avatar Size', 'wp-plugin-info-card' ) }
					value={ avatarSize }
					onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
					min={ 1 }
					max={ 96 }
				/>
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
				<ToggleControl
					label={ __( 'Show Website', 'wp-plugin-info-card' ) }
					checked={ showWebsite }
					onChange={ ( value ) => setAttributes( { showWebsite: value } ) }
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

	return (
		<>
			{ inspectorControls }
			{ toolbar }
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
		</>
	)
};
export default Preview;
 