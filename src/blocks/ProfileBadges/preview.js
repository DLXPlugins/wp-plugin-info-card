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
	Modal,
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

	const [ showCustomizeBadges, setShowCustomizeBadges ] = useState( false );

	const {
		badges,
	} = attributes;

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Block Options', 'wp-plugin-info-card' ) }
			>
				<Button
					variant="secondary"
					onClick={ () => {
						setShowCustomizeBadges( true );
					} }
				>
					{ __( 'Customize Badges', 'wp-plugin-info-card' ) }
				</Button>
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

	console.log( badges );

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
								if ( ! badgeData ) {
									return null;
								}
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
			{ showCustomizeBadges && (
				<Modal
					title={ __( 'Select Badges', 'wp-plugin-info-card' ) }
					onRequestClose={ () => setShowCustomizeBadges( false ) }
				>
					<p>{ __( 'Select the badges you want to display in your profile.', 'wp-plugin-info-card' ) }</p>
					<div className="wppic-profile-badges-modal wppic-profile-badges">
						{ badgeMap.map( ( badge ) => (
							<div key={ badge.class } className="wppic-profile-badge-modal-item wppic-profile-badge">
								<ToggleControl
									label={ __( 'Enabled', 'wp-plugin-info-card' ) }
									checked={ badges.find( ( b ) => b.class === badge.class && b.enabled ) ? true : false }
									onChange={ ( value ) => {
										if ( ! value ) {
											badges.splice( badges.findIndex( ( b ) => b.class === badge.class ), 1 );
										} else {
											badges.push( {
												class: badge.class,
												label: badge.label,
												enabled: true,
												order: badges.length + 1,
											} );
										}
										setAttributes( { badges: [ ...badges ] } );
									} }
								/>
								{ 'image' === badge.iconType ? (
									<img src={ badge.icon } alt={ badge.label } />
								) : (
									<span className={ `dashicons ${ badge.class } ${ badge.icon }` }></span>
								) }
								<p>{ badge.label }</p>
							</div>
						) ) }
					</div>
				</Modal>
			) }
		</>
	);
};
export default Preview;
