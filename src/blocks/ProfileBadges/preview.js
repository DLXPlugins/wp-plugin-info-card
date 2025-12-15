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
import NumbersComponent from '../components/Numbers';

const Preview = ( props ) => {
	const {
		attributes,
		setAttributes,
		onEdit,
		onRefresh,
	} = props;

	const [ showCustomizeBadges, setShowCustomizeBadges ] = useState( false );
	const [ loading, setLoading ] = useState( true );

	const {
		badges,
		colGap,
		rowGap,
		cols,
		marginSpacing,
		marginSpacingTarget,
		layout,
	} = attributes;

	useEffect( () => {
		// Reorder badges by alphabetical order and then show the interface(label).
		badges.sort( ( a, b ) => a.label.localeCompare( b.label ) );

		// Recursively update the badge order. This is needed for the future if I introduce drag and drop reordering.
		badges.forEach( ( badge, index ) => {
			badge.order = index + 1;
		} );
		if ( loading ) {
			// This makes sure reordering is only done initially.
			if ( badges !== attributes.badges ) {
				setAttributes( { badges: [ ...badges ] } );
			}
			setLoading( false );
		}
	}, [ badges ] );

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
			{
				<PanelBody title={ __( 'Layout', 'wp-plugin-info-card' ) }>
					<SelectControl
						label={ __( 'Badge Layout', 'wp-plugin-info-card' ) }
						options={ [
							{ value: 'horizontal', label: __( 'Horizontal', 'wp-plugin-info-card' ) },
							{ value: 'centered', label: __( 'Centered', 'wp-plugin-info-card' ) },
						] }
						value={ layout }
						onChange={ ( value ) => {
							setAttributes( { layout: value } );
						} }
					/>
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
			}
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

	if ( loading ) {
		return null;
	}

	return (
		<>
			{ inspectorControls }
			{ toolbar }
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
