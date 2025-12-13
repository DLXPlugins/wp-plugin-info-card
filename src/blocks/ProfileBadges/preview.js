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
		badges,
	} = attributes;

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Block Options', 'wp-plugin-info-card' ) }
			>
				test
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

	const badgeMap = {
		'badge-code': 'dashicons-editor-code',
		'badge-design': 'dashicons-art',
		'badge-design-contributor': 'dashicons-art',
		'badge-plugins': 'dashicons-admin-plugins',
		'badge-themes': 'dashicons-admin-appearance',
		'badge-organizer': 'dashicons-tickets',
		'badge-speaker': 'dashicons-megaphone',
		'badge-meta-contributor': 'dashicons-networking',
		'badge-translation-contributor': 'dashicons-translation',
		'badge-translation-editor': 'dashicons-translation',
		'badge-marketing': 'dashicons-format-status',
		'badge-marketing-contributor': 'dashicons-format-status',
		'badge-support-contributor': 'dashicons-format-chat',
		'badge-community-contributor': 'dashicons-groups',
		'badge-plugins-reviewer': 'dashicons-admin-plugins',
		'badge-themes-reviewer': 'dashicons-admin-appearance',
		'badge-wordpress-tv-contributor': 'dashicons-video-alt2',
		'badge-wordcamp-volunteer': 'dashicons-hammer',
		'badge-documentation': 'dashicons-admin-page',
		'badge-documentation-contributor': 'dashicons-admin-page',
		'badge-accessibility-contributor': 'dashicons-universal-access',
		'badge-accessibility': 'dashicons-universal-access',
		'badge-mobile': 'dashicons-smartphone',
		'badge-training': 'dashicons-welcome-learn-more',
		'badge-training-contributor': 'dashicons-welcome-learn-more',
		'badge-media-corps-team': 'dashicons-format-status',
		'badge-media-corps-team-contributor': 'dashicons-format-status',
		'badge-wp-cli': 'dashicons-arrow-right-alt2',
		'badge-wp-cli-contributor': 'dashicons-arrow-right-alt2',
		'badge-hosting': 'dashicons-cloud',
		'badge-hosting-contributor': 'dashicons-cloud',
		'badge-tide': 'dashicons-tide',
		'badge-tide-contributor': 'dashicons-tide',
		'badge-security-team': 'dashicons-lock',
		'badge-security-contributor': 'dashicons-lock',
		'badge-bbpress': 'dashicons-buddicons-bbpress-logo',
		'badge-bbpress-contributor': 'dashicons-buddicons-bbpress-logo',
		'badge-test': 'dashicons-welcome-view-site',
		'badge-test-contributor': 'dashicons-welcome-view-site',
		'badge-patterns-team': 'dashicons-layout',
		'badge-pattern-author': 'dashicons-layout',
		'badge-photos-team': 'dashicons-camera',
		'badge-photo-contributor': 'dashicons-camera',
		'badge-sustainability-team': 'dashicons-admin-site-alt3',
		'badge-sustainability-contributor': 'dashicons-admin-site-alt3',
		'badge-playground': 'img',
		'badge-playground-contributor': 'img',
		'badge-core-ai-team': 'img',
		'badge-core-ai-contributor': 'img',
		'badge-buddypress': 'dashicons-buddicons-buddypress-logo',
		'badge-buddypress-contributor': 'dashicons-buddicons-buddypress-logo',
		'badge-openverse': 'img',
		'badge-openverse-contributor': 'img',
		'badge-performance-team': 'img',
		'badge-performance-contributor': 'img',
		'badge-credits-graduate': 'img',
		'badge-credits-mentor': 'img',
		'badge-campus-connect-participant': 'img',
	};

	return (
		<>
			{ inspectorControls }
			{ toolbar }
			<div className="wppic-profile-badges">
				<>
					{
						badges && badges.length > 0 && (
							badges.map( ( badge ) => {
								if ( 'img' === badgeMap[ badge ] ) {
									return null;
								}
								return (
									<div key={ badge } className="wppic-profile-badge">
										<span className={ `dashicons ${ badge } ${ badgeMap[ badge ] }` }></span>
									</div>
								);
							} )
						)
					}
				</>
			</div>
		</>
	);
};
export default Preview;
