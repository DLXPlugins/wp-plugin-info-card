
import React, { useState } from 'react';

import {
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {
	BlockControls,
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
		preview,
		authorName,
		authorWebsite,
		showAvatar,
		showName,
		showWebsite,
	} = attributes;

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
			{ toolbar }
			<div className="wppic-author-avatar">
				<img
					src={ avatarUrl }
					alt={ authorName }
				/>
			</div>
		</>
	)
};
export default Preview;