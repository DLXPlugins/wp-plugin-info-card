import React, { useState, useEffect } from 'react';

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
import { badges as badgeMap } from '../components/Badges';
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

	return (
		<>
			{ inspectorControls }
			{ toolbar }
			<div className="wppic-profile-badges">
				<>
					{
						badges && badges.length > 0 && (
							badges.map( ( badge ) => {
								let image = null;
								const badgeData = badgeMap.find( ( b ) => b.class === badge.class );
								if ( 'image' === badgeData.iconType ) {
									image = <img src={ badgeData.icon } alt={ badgeData.name } />;
								} else {
									image = <span className={ `dashicons ${ badgeData.class } ${ badgeData.icon }` }></span>;
								}
								return (
									<div key={ badge.class + badge.order } className="wppic-profile-badge">
										<h3 className="wppic-profile-badge-title">
											{
												badgeData.label
											}
										</h3>
										<div className={ `badge ${ badgeData.class } ` }>
											{
												image
											}
										</div>
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
